import * as fs from 'fs';
import * as yaml from 'yaml';

import { DataSource, DataSourceOptions } from 'typeorm';
import { MigrationsProvider } from './migrations.provider';
import { Entities } from './const';

const file = fs.readFileSync('./config/config.yaml', 'utf8');
const config = yaml.parse(file);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  entities: Entities,
  migrations: MigrationsProvider,
  migrationsRun: true,
  url: config.db.url,
  schema: 'food',
};

export default new DataSource(dataSourceOptions);
