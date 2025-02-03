import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  Logger,
  HttpException,
} from '@nestjs/common';
import { GqlContextType, GqlExceptionFilter } from '@nestjs/graphql';
import { Response } from 'express';
import { GraphQLError } from 'graphql';

@Catch()
export class GlobalExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const gqlContext = host.getType<GqlContextType>() === 'graphql';

    if (gqlContext) {
      return this.handleGraphQLException(exception);
    } else {
      return this.handleHttpException(exception, host);
    }
  }

  /**
   * Handles GraphQL Exceptions without crashing the application.
   */
  private handleGraphQLException(exception: unknown) {
    console.log('entro al handel');
    let errorMessage =
      exception instanceof Error ? exception.message : 'Unknown error';
    let extensions = {
      code: 'INTERNAL_SERVER_ERROR',
      statusCode: 500,
    };

    // ✅ Log the error
    this.logger.warn(`🚨 GraphQL Exception: ${errorMessage}`);

    if (exception instanceof GraphQLError) {
      return exception; // ✅ Already formatted, return as is.
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const responseData = exception.getResponse();

      extensions = {
        code: 'BAD_REQUEST',
        statusCode: status,
        ...(typeof responseData === 'object'
          ? responseData
          : { message: responseData }),
      };

      errorMessage = responseData as string;
    }

    // ✅ Return formatted GraphQL error
    return new GraphQLError(errorMessage, {
      extensions,
    });
  }

  /**
   *Handles REST API Exceptions (Express)
   */
  private handleHttpException(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const responseData = exception.getResponse();

      this.logger.error(`🚨 HTTP Exception: ${JSON.stringify(responseData)}`);

      response.status(status).json({
        statusCode: status,
        message: responseData,
        timestamp: new Date().toISOString(),
        path: request?.url,
      });
    } else {
      // Handle unexpected errors (non-HttpException)
      const errorMessage =
        exception instanceof Error ? exception.message : 'Unknown error';
      this.logger.error(`Unexpected Exception: ${errorMessage}`);

      response.status(500).json({
        statusCode: 500,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        path: request?.url,
      });
    }
  }
}
