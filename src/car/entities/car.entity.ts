import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";

export enum CarStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable'
}

export type CarDocument = Car & Document

@Schema({
  timestamps: true,
  collection: 'cars',
  versionKey: false
})
export class Car {
  @IsString()
  @Prop({
    required: [true, 'Car name is required'],
    type: String,
    trim: true
  })
  name: string;

  @IsString()
  @Prop({
    required: [true, 'Car description is required'],
    type: String,
    trim: true
  })
  description: string;

  @IsString()
  @Prop({
    required: [true, 'Color is required'],
    type: String,
    trim: true
  })
  color: string;

  @IsBoolean()
  @Prop({
    required: [true, 'Is available is required'],
    type: Boolean
  })
  isElectric: boolean

  @IsString()
  @Prop({
    required: [true, 'Car type is required'],
    type: String,
    trim: true
  })
  carType: string;

  @IsString()
  @Prop({
    required: [true, 'Image is required'],
    type: String
  })
  image: string;

  @IsArray()
  @Prop({
    required: [true, 'Features is required'],
    type: [String]
  })
  features: string[];

  @IsNumber()
  @Prop({
    required: [true, 'Price per hour is required'],
    type: Number
  })
  pricePerHour: number;

  @IsEnum(CarStatus)
  @Prop({
    required: [true, 'Status is required'],
    type: String,
    enum: CarStatus,
    default: CarStatus.AVAILABLE
  })
  status: CarStatus;

  @IsBoolean()
  @Prop({
    required: [true, 'Is deleted is required'],
    type: Boolean,
    default: false
  })
  isDeleted: boolean;
};

const CarSchema = SchemaFactory.createForClass(Car);

// query middleware
CarSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

CarSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export { CarSchema };