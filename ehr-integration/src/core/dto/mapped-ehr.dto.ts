import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class EHRMappingDTO {
  @Field()
  ehrSystem: string;

  @Field()
  mappedFields: string;
}
