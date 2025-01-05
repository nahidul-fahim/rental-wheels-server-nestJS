import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>("CLOUDINARY_CLOUD_NAME"),
      api_key: this.configService.get<string>("CLOUDINARY_API_KEY"),
      api_secret: this.configService.get<string>("CLOUDINARY_SECRET_KEY"),
    });
  }

  async uploadImage(
    dataURI: string,
    publicId: string,
  ): Promise<UploadApiResponse> {
    return await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      public_id: publicId,
      folder: "Rental Wheels",
    });
  }
}
