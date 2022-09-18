import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(5000);
}
bootstrap();
//    Going ahead we do share an assignment with our candidates where they are supposed to develop an application.

// Write the code in your language of choice. Please especially emphasize coding principles (code modularity, separation of concerns, and testability). [Javascript is preferred - Node JS]

// 1. Deploy your code to the Heroku/DigitalOcean/AWS/service of your choice and send us your app URL. [Optional]
// 2. Checkin your code to GitHub and send us your repo URL.

// Contact book:
// Develop a suite of CRUD APIs for a contact book app.
// Each contact should have a unique email address.
// APIs should support adding/editing/deleting contacts.
// Allow searching by name and email address.
// Search should support pagination and should return 10 items by default per invocation.
// Add unit tests and Integration tests for each functionality.
// Add basic authentication for the app. Use environment variables or basic auth(for rest APIs).

// Let's not waste time on the front end. See you in the next round after you submit this assignment. If you are stuck anywhere, just revert to this email. Let's not waste more time.