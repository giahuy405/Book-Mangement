import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory(errors: ValidationError[]) {
        const convertedErrors = errors.map((error) => {
          const constraints = Object.keys(error.constraints).map(
            (key) => error.constraints[key],
          );
          return {
            field: error.property,
            errors: constraints,
          };
        });
        return new BadRequestException(convertedErrors);
      },
    }),
  );

  await app.listen(4200);
}
bootstrap();
