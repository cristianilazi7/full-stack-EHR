import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class EHRMappingFieldDTO {
  @Field()
  ehrSystem: string;

  @Field()
  sourceField: string;

  @Field()
  targetField: string;
}
