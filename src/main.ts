import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser"

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api")
    app.use(cookieParser())
    const config = new DocumentBuilder()
      .setTitle("Skidkachi project")
      .setDescription("Skidkachi REST API")
      .setVersion("1.0")
      .addTag("NestJs,swagger,sendMail,bot,SMS,tokens,Validation,Sequileze")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });

    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:8000",
          "http://localhost:3000",
          "https://skidkachi.uz",
          "https://api.skidkachi.uz",
          "https://skidkachi.vercel.uz"
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        }else {
          callback(new BadRequestException("Not allowed by CORS"));
        }
      },
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credetials: true
    });
  } catch (error) {
    console.log(error);
  }
}

start();
