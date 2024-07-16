import { CreateCoffeeDto } from '../dto/create-coffee.dto/create-coffee.dto';
import { CoffeesService } from '../coffees.service';
import { UpdateCoffeeDto } from '../dto/update-coffee.dto/update-coffee.dto';
import { PaginationDto } from '../../common/dto/pagination.dto/pagination.dto';
export declare class CoffeesController {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    findAll(paginationDto: PaginationDto): Promise<import("../entity/coffee/coffee").Coffee[]>;
    findOne(id: number): Promise<import("../entity/coffee/coffee").Coffee>;
    create(createCoffeeDto: CreateCoffeeDto): Promise<import("../entity/coffee/coffee").Coffee>;
    recommendCoffee(id: number): Promise<string>;
    update(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<import("../entity/coffee/coffee").Coffee>;
    delete(id: number): Promise<import("../entity/coffee/coffee").Coffee>;
}
