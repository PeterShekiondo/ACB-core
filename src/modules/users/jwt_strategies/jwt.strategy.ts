import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { jwtPayload } from "../interface/jwt-payload.interface";
import 'dotenv/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET
        })
    }

    async validate(payLoad: jwtPayload): Promise<User> {
        const { username } = payLoad;
        const user = await this.userRepository.findOne({username: username});

        if(!user) {
            throw new UnauthorizedException('User is Unauthorized');
        }

        return user;
    }
}