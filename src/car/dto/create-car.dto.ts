import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { CarStatus } from "../entities/car.entity";

export class CreateCarDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  color: string;

  @IsBoolean()
  isElectric: boolean;

  @IsString()
  image: string;

  @IsString()
  features: string[];

  @IsNumber()
  pricePerHour: number;

  @IsOptional()
  @IsEnum(CarStatus)
  status: CarStatus;
}
