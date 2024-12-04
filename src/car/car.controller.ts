import { CarService } from './car.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('car')
export class CarController {

  constructor(private readonly carService: CarService) { }

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    const result = this.carService.create(createCarDto);
    return result;
  }

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
