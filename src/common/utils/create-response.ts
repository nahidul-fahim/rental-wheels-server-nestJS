import { ResponseDto } from "../dto/response.dto";

export function createResponse<T>(
  statusCode: number,
  success: boolean,
  message: string,
  data?: T
): ResponseDto<T> {
  return new ResponseDto<T>(statusCode, success, message, data);
}