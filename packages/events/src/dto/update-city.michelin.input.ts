import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCityMichelinLevelInput {
  @Field({ nullable: false })
  cityId: number;
}
