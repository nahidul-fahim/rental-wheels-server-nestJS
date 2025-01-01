import { CarService } from './car.service';
import { Body, Controller, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { createResponse } from '@/common/utils/create-response';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('car')
export class CarController {

  constructor(private readonly carService: CarService) { }

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    const result = await this.carService.create(createCarDto);
    return createResponse(
      HttpStatus.CREATED,
      true,
      'Car created successfully',
      result
    );
  };

  @Get()
  async findAll() {
    const result = await this.carService.findAll();
    return createResponse(
      HttpStatus.OK,
      true,
      'Car fetched successfully',
      result
    );
  };

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.carService.findOne(id);
    return createResponse(
      HttpStatus.OK,
      true,
      'Car fetched successfully',
      result
    );
  }

  @Patch(':id')
  async updateCar(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    const result = await this.carService.updateCar(id, updateCarDto);
    return createResponse(
      HttpStatus.OK,
      true,
      'Car updated successfully',
      result
    )
  }
};
