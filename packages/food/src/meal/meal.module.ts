import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { MealResolver } from './meal.resolver';
import { MealService } from './meal.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal])],

  providers: [MealResolver, MealService],
  exports: [],
  controllers: [],
})
export class MealModule {}
