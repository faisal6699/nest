import { Injectable } from '@nestjs/common';
import { Coffee } from './entity/coffee/coffee';

@Injectable()
export class CoffeesService {
  coffees: Coffee[] = [];

  create(createCoffeeDto: any) {
    createCoffeeDto.id = Math.random().toString(36).substr(2);
    this.coffees.push(createCoffeeDto);
  }
}
