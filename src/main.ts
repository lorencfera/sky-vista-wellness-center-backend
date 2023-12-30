import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors()

  app.use(json({ limit: '25mb' }));
  app.enableCors();

  // // Handle preflight requests
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  //   res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type');
  //   res.header('Access-Control-Allow-Credentials', 'true'); // Ensure this line
  //   if (req.method === 'OPTIONS') {
  //     res.sendStatus(200);
  //   } else {
  //     next();
  //   }
  // });
 await app.listen(3000);

}
bootstrap();
