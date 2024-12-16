import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './gurads/api-key/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
  imports: [ConfigModule],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    // consumer.apply(LoggingMiddleware).forRoutes('coffees');
    // consumer
    //   .apply(LoggingMiddleware)
    //   .forRoutes({ path: 'coffees', method: RequestMethod.GET });
  }
}
