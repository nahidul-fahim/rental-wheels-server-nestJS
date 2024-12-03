import { plainToInstance } from "class-transformer";
import { IsNumber, IsString, Max, Min, validateSync } from "class-validator";
import { defaultEnvValues } from "./deafultEnvValues";

class EnvironmentVariables {
  @IsString()
  MONGODB_URI: string = defaultEnvValues.MONGODB_URI;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;
};


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
};