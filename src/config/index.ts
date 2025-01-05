import { plainToInstance } from "class-transformer";
import { IsNumber, IsString, Max, Min, validateSync } from "class-validator";
import { defaultEnvValues } from "./default-env-values";

class EnvironmentVariables {
  @IsString()
  MONGODB_URI: string = defaultEnvValues.MONGODB_URI;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  CLOUDINARY_CLOUD_NAME: string;

  @IsString()
  CLOUDINARY_API_KEY: string;

  @IsString()
  CLOUDINARY_SECRET_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
