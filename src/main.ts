import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqService } from './rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // services
  const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);

  // connect microservices
  app.connectMicroservice(rmqService.getOptions('AUTH',true));

  app.startAllMicroservices();
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
