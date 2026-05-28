import { IsISBN, IsNumber, IsObject, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

// The CreateBookDto class defines the data structure and validation rules for creating a new book record. 
// It includes fields for title, author, ISBN, published year,
//  and an optional description, with appropriate validation decorators to ensure data integrity before it is processed by the service layer.
export class CreateBookDto {
    @IsString()
    title!: string;

    @IsString()
    author!: string;

    @IsString()
    @IsISBN()
    isbn!: string;

    @IsNumber()
    publishedYear!: number;

    @IsString()
    @IsOptional()
    description!: string;

}