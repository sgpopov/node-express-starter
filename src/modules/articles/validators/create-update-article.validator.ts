import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUpdateArticleRequest {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @IsString()
  @MinLength(1)
  body: string;
}
