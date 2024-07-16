import { Coffee } from './entity/coffee/coffee';
import { Connection, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Flavor } from './entity/flavor/flavor';
import { PaginationDto } from '../common/dto/pagination.dto/pagination.dto';
export declare class CoffeesService {
    private readonly coffeeRepository;
    private readonly flavorRepository;
    private readonly connection;
    constructor(coffeeRepository: Repository<Coffee>, flavorRepository: Repository<Flavor>, connection: Connection);
    findAll(paginationDto: PaginationDto): Promise<Coffee[]>;
    findOne(id: number): Promise<Coffee>;
    create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee>;
    update(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
    remove(id: number): Promise<Coffee>;
    private preloadFlavorByName;
    recommendCoffee(id: number): Promise<string>;
}
