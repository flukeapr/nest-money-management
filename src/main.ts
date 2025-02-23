import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe ,BadRequestException} from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true},);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
    })
  )
  await app.listen(process.env.PORT ?? 3001);
}
// test push
bootstrap();
