import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  id: string;


  @IsString()
  @IsOptional()
  content?: string;

  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsArray()
  @IsOptional()
  imageUrls?: string[];



}