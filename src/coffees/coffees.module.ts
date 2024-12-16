import { Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffes/coffeesController';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entity/coffee/coffee';
import { Flavor } from './entity/flavor/flavor';
import { EventEntity } from '../events/entities/event.entity/event.entity';
import { DEFAULT_VALUE } from '../defaultValue';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, EventEntity])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    ConfigService,
    {
      provide: DEFAULT_VALUE,
      useValue: ['for'],
    },
  ],
})
export class CoffeesModule {}
