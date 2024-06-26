import { CreateRestaurantInput } from './create-restaurant.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { PriceRange } from '../enums';

@InputType()
export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field((type) => PriceRange, { nullable: true })
  priceRange: PriceRange;

  @Field((type) => Int, { nullable: true })
  cityId: number;
}
