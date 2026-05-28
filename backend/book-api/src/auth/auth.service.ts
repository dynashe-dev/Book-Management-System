import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ){}

    async register(register: RegisterDto) {
        //check if email already exists
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: register.email },
        });

        if (existingEmail) {
            throw new BadRequestException('User with this email already exists');
        }

        //check if username already exists
        const existingUsername = await this.prisma.user.findUnique({
            where: { username: register.username },
        });

        if (existingUsername) {
            throw new BadRequestException('User with this username already exists');
        }

        //hash password
        const hashedPassword = await bcrypt.hash(register.password, 10);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: register.email,
                    username: register.username,
                    password: hashedPassword,
                },
            });

            return {
                message: 'User registered successfully',
                userId: user.id,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                const target = (error.meta?.target as string[])?.join(', ') ?? 'field';
                throw new BadRequestException(`User with this ${target} already exists`);
            }
            throw error;
        }
    }

    async login(login: LoginDto) {
        //find user by email
        const user = await this.prisma.user.findUnique({
            where: { email: login.email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        //compare passwords
        const isMatch = await bcrypt.compare(login.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid email or password');
        }

        //generate jwt token
        const token = this.jwtService.sign({ userId: user.id, email: user.email, username: user.username });
        return {
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        };
    }
}
