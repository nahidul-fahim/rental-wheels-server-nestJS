import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@/config';
import { MongoDbModule } from './mongo-db/mongo-db.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    CarModule,
    MongoDbModule,
    ConfigModule.forRoot({
      validate,
      isGlobal: true
    }),
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule { }
