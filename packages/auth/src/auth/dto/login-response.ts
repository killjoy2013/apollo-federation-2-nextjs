import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entitites/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => [String], { nullable: true })
  rights: Array<string>;
}
