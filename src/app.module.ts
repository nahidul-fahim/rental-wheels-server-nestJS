import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@/config';

@Module({
  imports: [
    CarModule,
    ConfigModule.forRoot({
      validate,
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
