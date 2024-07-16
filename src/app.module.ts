import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionSource } from './shared/utils/dataSource';

@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot(connectionSource)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
