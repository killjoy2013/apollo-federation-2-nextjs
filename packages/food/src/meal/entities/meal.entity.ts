import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'food' })
@ObjectType()
@Directive('@key(fields: "id")')
export class Meal {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.meals)
  @Field(() => [Restaurant], { nullable: true })
  restaurants: Restaurant[];
}
