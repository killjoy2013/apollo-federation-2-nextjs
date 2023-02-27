
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UpdateRestaurantInput {
    id: number;
    name?: Nullable<string>;
    cityId: number;
}

export abstract class IQuery {
    abstract hello(): Nullable<string> | Promise<Nullable<string>>;
}

export abstract class IMutation {
    abstract restaurantUpdatedEvent(input?: Nullable<UpdateRestaurantInput>): Nullable<number> | Promise<Nullable<number>>;
}

type Nullable<T> = T | null;
