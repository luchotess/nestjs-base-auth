import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CredenditalsDTO } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private readonly _UserService: UsersService,
                 private readonly jwtService: JwtService) {}

    async validateUser ({username = '', password = ''}: CredenditalsDTO): Promise<any> {
        const user = await this._UserService.findOne({username});

        if (!user) {
            throw new HttpException({error: 'Username not found.'}, HttpStatus.FORBIDDEN);
        }

        if (!await user.validatePassword(password)) {
            throw new HttpException({error: 'Incorrect password.'}, HttpStatus.FORBIDDEN);
        }

        return user.serialize();
    }

    async login (user: any) {
        const payload = { ...user, sub: user._id };
        return {
            success: true,
            access_token: this.jwtService.sign(payload),
        };
    }
}
