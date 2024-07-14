import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateCoffeeDto } from '../dto/create-coffee.dto/create-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() pagination: any) {
    const { limit, offset } = pagination;
    return `this is coffee list limit ${limit} and offset ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `this is coffee #${id}`;
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return createCoffeeDto;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: any) {
    return updateCoffeeDto;
  }
}
