import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';

// This interface defines the structure of the payload that will be included in the JWT token. It contains the user's ID, username, and email, which can be used to identify the user and authorize access to protected routes.
interface JwtPayload {
    userId: number;
    username: string;
    email: string;
}

// This controller manages the CRUD operations for books. It includes endpoints for creating, retrieving, updating, and deleting books. All endpoints are protected by JWT authentication, ensuring that only authenticated users can access them. The controller uses the BooksService to perform the actual operations on the book data.
@ApiTags('Books')
@ApiBearerAuth() // This decorator indicates that the endpoints in this controller require authentication using a bearer token (JWT)    
@UseGuards(JwtAuthGuard) // This guard will be applied to all routes in this controller, ensuring that only authenticated users can access them 
@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    // This method handles the creation of a new book. It accepts a CreateBookDto object in the request body, which contains the details of the book to be created. The method also retrieves the authenticated user's information using the GetUser decorator and passes the user ID to the BooksService to associate the book with the user.
    @Post()
    @ApiOperation({ summary: 'Create a new book' })
    @ApiResponse({ status: 201, description: 'Book created successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    create(@Body() createBookDto: CreateBookDto,
    @GetUser() user: JwtPayload) {
        console.log('📖 CONTROLLER - Raw request body:', JSON.stringify(createBookDto, null, 2));
        console.log('📖 CONTROLLER - User ID:', user.userId);
        return this.booksService.create(createBookDto, user.userId);
    }

    // This method retrieves all books for the authenticated user.
    @Get()
    @ApiOperation({ summary: 'Get all books for the authenticated user' })
    @ApiResponse({ status: 200, description: 'Books retrieved successfully' })
    findAll(
        @GetUser() user: JwtPayload) { 
        return this.booksService.findAll(user.userId);
    }
    
    // This method retrieves a single book by its ID. It checks if the book exists and if it belongs to the authenticated user. If the book is not found or does not belong to the user, it throws an appropriate exception.
    @Get(':id')
    @ApiOperation({ summary: 'Get a book by ID' })
    @ApiResponse({ status: 200, description: 'Book details' })
    @ApiResponse({ status: 404, description: 'Book not found' })
    findOne(@Param('id') id: string, @GetUser() user: JwtPayload) {
        return this.booksService.findOne(+id, user.userId);
    }

    // This method updates a book by its ID. It checks if the book exists and if it belongs to the authenticated user. If the book is not found or does not belong to the user, it throws an appropriate exception.
    @Patch(':id')
    @ApiOperation({ summary: 'Update a book by ID' })
    @ApiResponse({ status: 200, description: 'Book updated successfully' })
    @ApiResponse({ status: 404, description: 'Book not found' })
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto, @GetUser() user: JwtPayload) {
        return this.booksService.update(+id, updateBookDto, user.userId);
    }
    
    // This method deletes a book by its ID. It checks if the book exists and if it belongs to the authenticated user. If the book is not found or does not belong to the user, it throws an appropriate exception.
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a book by ID' })
    @ApiResponse({ status: 200, description: 'Book deleted successfully' })
    @ApiResponse({ status: 404, description: 'Book not found' })
    remove(@Param('id') id: string, @GetUser() user: JwtPayload) {
        return this.booksService.remove(+id, user.userId);
    }
}



