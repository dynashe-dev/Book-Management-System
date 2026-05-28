import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport/dist/auth.guard";

// This guard will be used to protect routes that require authentication by validating the JWT token sent by the client in the Authorization header
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}