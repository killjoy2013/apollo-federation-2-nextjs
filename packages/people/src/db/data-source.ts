import * as fs from 'fs';
import * as yaml from 'yaml';

import { DataSource, DataSourceOptions } from 'typeorm';
import { Entities } from './const';
import { MigrationsProvider } from './migrations.provider';

const file = fs.readFileSync('./config/config.yaml', 'utf8');
const config = yaml.parse(file);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  entities: Entities,
  migrations: MigrationsProvider,
  migrationsRun: true,
  url: config.db.url,
  schema: 'people',
};

export default new DataSource(dataSourceOptions);
