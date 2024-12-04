import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@/config';
import { MongoDbModule } from './mongo-db/mongo-db.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CarModule,
    MongoDbModule,
    ConfigModule.forRoot({
      validate,
      isGlobal: true
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
