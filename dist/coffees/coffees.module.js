"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesModule = void 0;
const common_1 = require("@nestjs/common");
const coffeesController_1 = require("./coffes/coffeesController");
const coffees_service_1 = require("./coffees.service");
const typeorm_1 = require("@nestjs/typeorm");
const coffee_1 = require("./entity/coffee/coffee");
const flavor_1 = require("./entity/flavor/flavor");
const event_entity_1 = require("../events/entities/event.entity/event.entity");
const defaultValue_1 = require("../defaultValue");
const config_1 = require("@nestjs/config");
let CoffeesModule = class CoffeesModule {
};
exports.CoffeesModule = CoffeesModule;
exports.CoffeesModule = CoffeesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([coffee_1.Coffee, flavor_1.Flavor, event_entity_1.EventEntity])],
        controllers: [coffeesController_1.CoffeesController],
        providers: [
            coffees_service_1.CoffeesService,
            config_1.ConfigService,
            {
                provide: defaultValue_1.DEFAULT_VALUE,
                useValue: ['for'],
            },
        ],
    })
], CoffeesModule);
//# sourceMappingURL=coffees.module.js.map