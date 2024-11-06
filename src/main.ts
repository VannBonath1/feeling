import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5174', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE', // Define allowed methods
    credentials: true, // Enable credentials (cookies, authorization headers)
  });

  app.useGlobalFilters(new HttpExceptionFilter()); // Apply the filter globally error
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
