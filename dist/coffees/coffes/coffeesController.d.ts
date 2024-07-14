import { CreateCoffeeDto } from '../dto/create-coffee.dto/create-coffee.dto';
export declare class CoffeesController {
    findAll(pagination: any): string;
    findOne(id: string): string;
    create(createCoffeeDto: CreateCoffeeDto): CreateCoffeeDto;
    update(id: string, updateCoffeeDto: any): any;
}
