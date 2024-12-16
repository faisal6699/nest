import { DynamicModule, Module } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({})
export class DatabaseModule {
  static register(option: DataSourceOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: TypeOrmModule.forRoot(option),
        },
      ],
    };
  }

  static update(entities: EntityClassOrSchema[]): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'UPDATE_CONNECTION',
          useValue: TypeOrmModule.forFeature([...entities]),
        },
      ],
    };
  }
}
