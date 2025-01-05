import { Injectable, NestMiddleware } from "@nestjs/common";


@Injectable()
export class MulterMiddleware implements NestMiddleware {
  private readonly upload = multer
}