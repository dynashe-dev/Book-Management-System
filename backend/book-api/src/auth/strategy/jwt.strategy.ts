import { Injectable } from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";

// This strategy will be used to validate the JWT token sent by the client in the Authorization header
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret_key',
        });
    }

    // This method will be called by Passport to validate the JWT token and extract the user information from it
    async validate(payload: any) {
        return { userId: payload.userId, email: payload.email };
    };
}
