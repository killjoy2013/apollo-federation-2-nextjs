import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLClient } from 'graphql-request';

@Injectable()
export class GraphqlRequestService {
  client: GraphQLClient;
  constructor(private readonly config: ConfigService) {
    const internal_url = config.get<string>('schema.internal_url');

    this.client = new GraphQLClient(internal_url);
  }
}
