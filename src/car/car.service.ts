import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from './entities/car.entity';
import { Model } from 'mongoose';

@Injectable()
export class CarService {

  constructor(@InjectModel(Car.name) private carModel: Model<Car>) { }

  // find all cars
  async findAll() {
    const allCars = await this.carModel.find();
    return allCars;
  };

  // find a single car
  async findOne(id: string) {
    const car = await this.carModel.findById(id);
    return car;
  };
}
