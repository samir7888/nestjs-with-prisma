import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreatePostDto {

    @IsNumber()
    @IsNotEmpty()
    userId : number;
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    title: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;
}