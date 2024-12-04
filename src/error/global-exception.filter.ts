import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, ForbiddenException, HttpStatus, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) { }
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const nodeEnv = this.configService.get('NODE_ENV');

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let stack = nodeEnv === 'development' ? exception : undefined;
    let error = null;

    if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND || exception.getStatus();
      message = exception?.message || (exception.getResponse() as any)?.message;
      stack = exception.stack;
      error = exception.getResponse();
    }
    else if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST || exception.getStatus();
      message = exception?.message || (exception.getResponse() as any)?.message;
      stack = exception.stack;
      error = exception.getResponse();
    }
    else if (exception instanceof UnauthorizedException) {
      status = HttpStatus.UNAUTHORIZED || exception.getStatus();
      message = exception?.message || (exception.getResponse() as any)?.message;
      stack = exception.stack;
      error = exception.getResponse();
    }
    else if (exception instanceof ForbiddenException) {
      status = HttpStatus.FORBIDDEN || exception.getStatus();
      message = exception?.message || (exception.getResponse() as any)?.message;
      stack = exception.stack;
      error = exception.getResponse();
    }
    else if (exception instanceof Error) {
      message = exception?.message
      stack = exception.stack;
    }

    const errorResponse = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      stack,
      error
    };

    response.status(status).json(errorResponse);
  }
}