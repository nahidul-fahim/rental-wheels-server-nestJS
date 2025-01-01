import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from './entities/car.entity';
import { Model } from 'mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {

  constructor(@InjectModel(Car.name) private carModel: Model<Car>) { }

  // create car
  async create(createCarDto: CreateCarDto) {
    const newCar = await this.carModel.create(createCarDto);
    return newCar;
  };

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

  // update car
  async updateCar(id: string, updateCarDto: UpdateCarDto) {
    const existingCar = await this.carModel.findById(id)
    if (!existingCar) {
      throw new NotFoundException(`Car not found!`)
    }
    const updateCar = await this.carModel.findByIdAndUpdate(
      id,
      updateCarDto,
      { new: true }
    )
    return updateCar;
  }

  // delete car
  async deleteCar(id: string) {
    const existingCar = await this.carModel.findById(id);
    if (!existingCar) {
      throw new NotFoundException(`Car not found!`)
    }
    const deletedCar = await this.carModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    )
    return deletedCar;
  }
}
