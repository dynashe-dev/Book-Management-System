import { PartialType } from "@nestjs/swagger";
import { CreateBookDto } from "./create-book.dto";

// The UpdateBookDto extends the CreateBookDto and makes all fields optional using PartialType, allowing for partial updates of book records
export class UpdateBookDto extends PartialType(CreateBookDto) {}