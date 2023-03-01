/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  join__FieldSet: any;
  link__Import: any;
};

export type Address = {
  __typename?: 'Address';
  city: City;
  detail: Scalars['String'];
  id: Scalars['Int'];
  personId: Scalars['Int'];
};

export type City = {
  __typename?: 'City';
  id: Scalars['Int'];
  name: Scalars['String'];
  persons?: Maybe<Array<Person>>;
  population?: Maybe<Scalars['Int']>;
  restaurants?: Maybe<Array<Restaurant>>;
  touristic?: Maybe<Scalars['Boolean']>;
};

export enum Continent {
  Africa = 'Africa',
  America = 'America',
  Asia = 'Asia',
  Europe = 'Europe'
}

export type Country = {
  __typename?: 'Country';
  capital: City;
  cities?: Maybe<Array<City>>;
  continent?: Maybe<Continent>;
  id: Scalars['Int'];
  name: Scalars['String'];
  population?: Maybe<Scalars['Int']>;
  treaties?: Maybe<Array<Treaty>>;
};

export type CreateAddressInput = {
  cityId: Scalars['Int'];
  detail: Scalars['String'];
};

export type CreateCityInput = {
  countryId: Scalars['Int'];
  name: Scalars['String'];
  population?: InputMaybe<Scalars['Int']>;
};

export type CreateCountryInput = {
  continent?: InputMaybe<Continent>;
  name: Scalars['String'];
  population?: InputMaybe<Scalars['Int']>;
};

export type CreateHobbyInput = {
  cityId: Scalars['Int'];
  difficulty: Difficulty;
  name: Scalars['String'];
};

export type CreateMealInput = {
  name: Scalars['String'];
};

export type CreatePersonInput = {
  address: CreateAddressInput;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  occupation: Scalars['String'];
};

export type CreateRestaurantInput = {
  cityId: Scalars['Int'];
  name: Scalars['String'];
  priceRange: PriceRange;
};

export type CreateRightInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateTreatyInput = {
  name: Scalars['String'];
};

export type CreateUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  userName: Scalars['String'];
};

export enum Difficulty {
  Difficult = 'Difficult',
  Easy = 'Easy',
  Moderate = 'Moderate'
}

export type Hobby = {
  __typename?: 'Hobby';
  difficulty?: Maybe<Difficulty>;
  id: Scalars['Int'];
  name: Scalars['String'];
  persons?: Maybe<Array<Person>>;
};

export type Meal = {
  __typename?: 'Meal';
  id: Scalars['Int'];
  name: Scalars['String'];
  restaurants?: Maybe<Array<Restaurant>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCountryToTreaty: Country;
  assignRightToRole: Scalars['String'];
  assignRoleToUser: Scalars['String'];
  createCity: City;
  createCountry: Country;
  createHobby: Hobby;
  createMeal: Meal;
  createPerson: Person;
  createRestaurant: Restaurant;
  createRight: Right;
  createRole: Role;
  createTreaty: Treaty;
  createUser: User;
  removeCity?: Maybe<Scalars['Int']>;
  removeCountry?: Maybe<Scalars['Int']>;
  removeCountryFromTreaty: Country;
  removeHobby?: Maybe<Scalars['Int']>;
  removeMeal?: Maybe<Scalars['Int']>;
  removePerson?: Maybe<Scalars['Int']>;
  removeRestaurant?: Maybe<Scalars['Int']>;
  removeRight: Scalars['Int'];
  removeRole: Scalars['Int'];
  removeTreaty: Treaty;
  removeUser: Scalars['Int'];
  restaurantUpdatedEvent?: Maybe<Scalars['Int']>;
  revokeAllRolesFromUser: Scalars['String'];
  revokeRightFromRole: Scalars['String'];
  revokeRoleFromUser: Scalars['String'];
  updateCity: City;
  updateCountry: Country;
  updateMeal: Meal;
  updateRestaurant: Restaurant;
  updateRight: Right;
  updateRole: Role;
  updateTreaty: Treaty;
  updateUser: User;
};


export type MutationAddCountryToTreatyArgs = {
  countryId: Scalars['Int'];
  treatyId: Scalars['Int'];
};


export type MutationAssignRightToRoleArgs = {
  rightName: Scalars['String'];
  roleName: Scalars['String'];
};


export type MutationCreateCityArgs = {
  input: CreateCityInput;
};


export type MutationCreateCountryArgs = {
  input: CreateCountryInput;
};


export type MutationCreateHobbyArgs = {
  input: CreateHobbyInput;
};


export type MutationCreateMealArgs = {
  input: CreateMealInput;
};


export type MutationCreatePersonArgs = {
  input: CreatePersonInput;
};


export type MutationCreateRestaurantArgs = {
  input: CreateRestaurantInput;
};


export type MutationCreateRightArgs = {
  createRightInput: CreateRightInput;
};


export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};


export type MutationCreateTreatyArgs = {
  input: CreateTreatyInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveCityArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCountryArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCountryFromTreatyArgs = {
  countryId: Scalars['Int'];
  treatyId: Scalars['Int'];
};


export type MutationRemoveHobbyArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveMealArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePersonArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveRestaurantArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveRightArgs = {
  id: Scalars['Float'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['Float'];
};


export type MutationRemoveTreatyArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Float'];
};


export type MutationRestaurantUpdatedEventArgs = {
  input?: InputMaybe<UpdateRestaurantInput>;
};


export type MutationRevokeRightFromRoleArgs = {
  rightName: Scalars['String'];
  roleName: Scalars['String'];
};


export type MutationUpdateCityArgs = {
  input: UpdateCityInput;
};


export type MutationUpdateCountryArgs = {
  input: UpdateCountryInput;
};


export type MutationUpdateMealArgs = {
  input: UpdateMealInput;
};


export type MutationUpdateRestaurantArgs = {
  input: UpdateRestaurantInput;
};


export type MutationUpdateRightArgs = {
  updateRightInput: UpdateRightInput;
};


export type MutationUpdateRoleArgs = {
  updateRoleInput: UpdateRoleInput;
};


export type MutationUpdateTreatyArgs = {
  input: UpdateTreatyInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Person = {
  __typename?: 'Person';
  addresses?: Maybe<Array<Address>>;
  firstName: Scalars['String'];
  hobbies?: Maybe<Array<Hobby>>;
  id: Scalars['Int'];
  lastName: Scalars['String'];
  occupation: Scalars['String'];
};

export enum PriceRange {
  Cheap = 'Cheap',
  Expensive = 'Expensive',
  Luxury = 'Luxury',
  Moderate = 'Moderate'
}

export type Query = {
  __typename?: 'Query';
  cities: Array<City>;
  city: City;
  countries: Array<Country>;
  findOne: Country;
  hello?: Maybe<Scalars['String']>;
  hobbies: Array<Hobby>;
  hobby: Hobby;
  meal: Meal;
  meals: Array<Meal>;
  person: Person;
  persons: Array<Person>;
  restaurant: Restaurant;
  restaurants: Array<Restaurant>;
  right: Right;
  rights: Array<Right>;
  role: Role;
  roles: Array<Role>;
  treaties: Array<Treaty>;
  treaty: Treaty;
  user: User;
  users: Array<User>;
};


export type QueryCitiesArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryCityArgs = {
  id: Scalars['Int'];
};


export type QueryFindOneArgs = {
  id: Scalars['Int'];
};


export type QueryHobbiesArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryHobbyArgs = {
  id: Scalars['Int'];
};


export type QueryMealArgs = {
  id: Scalars['Int'];
};


export type QueryMealsArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryPersonArgs = {
  id: Scalars['Int'];
};


export type QueryPersonsArgs = {
  firstName?: InputMaybe<Scalars['String']>;
};


export type QueryRestaurantArgs = {
  id: Scalars['Int'];
};


export type QueryRestaurantsArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryRightArgs = {
  id: Scalars['Float'];
};


export type QueryRightsArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryRoleArgs = {
  id: Scalars['Float'];
};


export type QueryRolesArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryTreatyArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUsersArgs = {
  userName?: InputMaybe<Scalars['String']>;
};

export type Restaurant = {
  __typename?: 'Restaurant';
  city: City;
  cityId: Scalars['Float'];
  id: Scalars['Int'];
  meals?: Maybe<Array<Meal>>;
  name: Scalars['String'];
  priceRange?: Maybe<PriceRange>;
};

export type Right = {
  __typename?: 'Right';
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  roles?: Maybe<Array<Role>>;
};

export type Role = {
  __typename?: 'Role';
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  rights?: Maybe<Array<Right>>;
  users?: Maybe<Array<User>>;
};

export type Treaty = {
  __typename?: 'Treaty';
  countries?: Maybe<Array<Country>>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UpdateCityInput = {
  countryId?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  population?: InputMaybe<Scalars['Int']>;
};

export type UpdateCountryInput = {
  continent?: InputMaybe<Continent>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  population?: InputMaybe<Scalars['Int']>;
};

export type UpdateMealInput = {
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateRestaurantInput = {
  cityId: Scalars['Int'];
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateRightInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateTreatyInput = {
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  refreshToken: Scalars['String'];
  roles?: Maybe<Array<Role>>;
  userName: Scalars['String'];
};

export enum Join__Graph {
  Auth = 'AUTH',
  Country = 'COUNTRY',
  Events = 'EVENTS',
  Food = 'FOOD',
  People = 'PEOPLE'
}

export enum Link__Purpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}

export type CityQueryVariables = Exact<{
  cityId: Scalars['Int'];
}>;


export type CityQuery = { __typename?: 'Query', city: { __typename?: 'City', id: number, name: string, population?: number | null } };


export const CityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"City"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cityId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"population"}}]}}]}}]} as unknown as DocumentNode<CityQuery, CityQueryVariables>;