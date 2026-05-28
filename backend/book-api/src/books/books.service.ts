import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) {}

    async create(createBookDto: CreateBookDto, userId: number) {
        console.log('📚 CREATE BOOK - Received DTO:', JSON.stringify(createBookDto, null, 2));
        const { isbn, ...rest } = createBookDto;
        console.log('📚 CREATE BOOK - Extracted ISBN:', isbn);
        console.log('📚 CREATE BOOK - Rest of data:', JSON.stringify(rest, null, 2));
        
        const bookData = {
            ...rest,
            Isbn: isbn,
            userId,
        };
        console.log('📚 CREATE BOOK - Final data to insert:', JSON.stringify(bookData, null, 2));
        
        const createdBook = await this.prisma.book.create({
            data: bookData,
        });
        console.log('📚 CREATE BOOK - Book created:', JSON.stringify(createdBook, null, 2));
        return createdBook;
    }
    // This method retrieves all books that belong to a specific user by filtering the books based on the userId. It also includes the user information in the response, but only selects the id, username, and email fields to avoid exposing sensitive data.
    async findAll(userId: number) {
        return await this.prisma.book.findMany({
            where: { userId },
            include: {
                user: {
                    select: { id: true, username: true, email: true },
                },  
            },
        });
    }   
    // This method retrieves a single book by its ID and checks if it belongs to the specified user. If the book is not found or does not belong to the user, it throws a NotFoundException.
    async findOne(id: number, userId: number) {
        const book = await this.prisma.book.findUnique({
            where: { id },
            include: { user: true },
        });
     // Check if the book exists and belongs to the user
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        // Check if the book belongs to the user
        if (book.userId !== userId) {
            throw new ForbiddenException('You do not have access to this book');
        }

        return book;
    }
        
        async update(id: number, updateBookDto: UpdateBookDto, userId: number) {
            //verify ownership of the book
            await this.findOne(id, userId);

            const { isbn, ...rest } = updateBookDto as any;
            const dataToUpdate: any = { ...rest };
            if (isbn !== undefined) {
                dataToUpdate.Isbn = isbn;
            }

            return await this.prisma.book.update({
                where: { id },
                data: dataToUpdate,
            });
        }   
        async remove(id: number, userId: number) {
            //verify ownership of the book
            await this.findOne(id, userId);

            return await this.prisma.book.delete({
                where: { id },
            });
        }
}
