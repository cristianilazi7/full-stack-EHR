import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs/internal/Observable';
import { lastValueFrom } from 'rxjs';

// Definir una interfaz para el payload del usuario autenticado
export interface JwtUserPayload {
  id: number;
  email: string;
  role: 'ROLE_PATIENT' | 'ROLE_DOCTOR' | 'ROLE_ADMIN';
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = super.canActivate(context);
    console.log('result1::', result);

    if (result instanceof Promise) {
      console.log('result22::', result);
      return result;
    }

    if (result instanceof Observable) {
      console.log('result', result);
      console.log(lastValueFrom(result));
      return lastValueFrom(result);
    }

    return result;
  }

  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<{ req: Request }>();
    return gqlContext.req;
  }

  handleRequest<TUser extends JwtUserPayload>(
    err: unknown,
    user: TUser | null,
  ): TUser {
    if (err || !user) {
      throw new UnauthorizedException('You must be logged in');
    }
    return user;
  }
}
