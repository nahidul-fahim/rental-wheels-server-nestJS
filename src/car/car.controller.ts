import { CarService } from './car.service';
import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { createResponse } from '@/common/utils/create-response';

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
};
