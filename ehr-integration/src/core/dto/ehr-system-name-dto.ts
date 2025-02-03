import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class EHRSystemNameDTO {
  @Field()
  ehrSystem: string;
}
