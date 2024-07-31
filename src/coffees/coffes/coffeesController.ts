import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCoffeeDto } from '../dto/create-coffee.dto/create-coffee.dto';
import { CoffeesService } from '../coffees.service';
import { UpdateCoffeeDto } from '../dto/update-coffee.dto/update-coffee.dto';
import { PaginationDto } from '../../common/dto/pagination.dto/pagination.dto';
import { Public } from '../../decorator/public.decorator';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Public()
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.coffeesService.findAll(paginationDto);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Post('recommendations/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  recommendCoffee(@Param('id', ParseIntPipe) id: number) {
    return this.coffeesService.recommendCoffee(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.coffeesService.remove(id);
  }
}
