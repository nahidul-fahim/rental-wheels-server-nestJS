import { CarService } from './car.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('car')
export class CarController {

  constructor(private readonly carService: CarService) { }

  @Get()
  findAll() {
    const result = this.carService.findAll();
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const result = this.carService.findOne(id);
    return result;
  }
}
