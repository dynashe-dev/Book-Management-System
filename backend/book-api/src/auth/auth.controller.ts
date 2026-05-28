import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


// This controller handles authentication-related routes such as user registration and login. It uses the AuthService to perform the actual logic of registering and logging in users, and it defines the API endpoints for these actions.
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
  // Endpoint for user registration. It accepts a RegisterDto object in the request body, which contains the user's email, username, and password. The endpoint returns a success message and the user ID if registration is successful, or an error message if the email is already in use.
    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 400, description: 'Email already in use' })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
   
    // Endpoint for user login. It accepts a LoginDto object in the request body, which contains the user's email and password. The endpoint returns a JWT token if login is successful, or an error message if the email or password is invalid.
    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    @ApiResponse({ status: 401, description: 'Invalid email or password' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
