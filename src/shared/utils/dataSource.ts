import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionSource: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: ['dist/**/entity/**/*.entity.js'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
};

const dataSource: DataSource = new DataSource(connectionSource);
export default dataSource;
