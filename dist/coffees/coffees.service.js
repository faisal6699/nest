"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = void 0;
const common_1 = require("@nestjs/common");
const coffee_1 = require("./entity/coffee/coffee");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const flavor_1 = require("./entity/flavor/flavor");
const event_entity_1 = require("../events/entities/event.entity/event.entity");
const defaultValue_1 = require("../defaultValue");
const config_1 = require("@nestjs/config");
let CoffeesService = class CoffeesService {
    constructor(coffeeRepository, flavorRepository, connection, value, configService) {
        this.coffeeRepository = coffeeRepository;
        this.flavorRepository = flavorRepository;
        this.connection = connection;
        this.configService = configService;
        const databaseHost = this.configService.get('database.host', 'localhost');
        console.log(databaseHost);
    }
    findAll(paginationDto) {
        const { offset, limit } = paginationDto;
        return this.coffeeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        });
    }
    async findOne(id) {
        const coffee = await this.coffeeRepository.findOne({
            where: { id: id },
            relations: ['flavors'],
        });
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee @${id} not found`);
        }
        return coffee;
    }
    async create(createCoffeeDto) {
        const flavors = await Promise.all(createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)));
        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors,
        });
        return this.coffeeRepository.save(coffee);
    }
    async update(id, updateCoffeeDto) {
        const flavors = await Promise.all(updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)));
        const coffee = await this.coffeeRepository.preload({
            id: id,
            ...updateCoffeeDto,
            flavors,
        });
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee @${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }
    async remove(id) {
        const coffee = await this.coffeeRepository.findOne({ where: { id } });
        return this.coffeeRepository.remove(coffee);
    }
    async preloadFlavorByName(name) {
        const exitingFlavor = await this.flavorRepository.findOne({
            where: { name },
        });
        if (exitingFlavor) {
            return exitingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
    async recommendCoffee(id) {
        const coffee = await this.coffeeRepository.findOne({ where: { id } });
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            coffee.recommendations++;
            const recommendEvent = new event_entity_1.EventEntity();
            recommendEvent.name = 'recommend_name';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.NotFoundException(err.message);
        }
        finally {
            await queryRunner.release();
            return 'successfully recommend';
        }
    }
};
exports.CoffeesService = CoffeesService;
exports.CoffeesService = CoffeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coffee_1.Coffee)),
    __param(1, (0, typeorm_1.InjectRepository)(flavor_1.Flavor)),
    __param(3, (0, common_1.Inject)(defaultValue_1.DEFAULT_VALUE)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection, Array, config_1.ConfigService])
], CoffeesService);
//# sourceMappingURL=coffees.service.js.map