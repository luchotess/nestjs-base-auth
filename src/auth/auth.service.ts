import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CredenditalsDTO } from './auth.interface';

@Injectable()
export class AuthService {
    constructor (private _UserService: UsersService) {}

    async login ({username = '', password = ''}: CredenditalsDTO): Promise<any> {
        const user = await this._UserService.findOne({username});

        if (!user) {
            throw new HttpException({error: 'Username not found.'}, HttpStatus.BAD_REQUEST);
        }

        if (!await user.validatePassword(password)) {
            throw new HttpException({error: 'Incorrect password.'}, HttpStatus.BAD_REQUEST);
        }

        return 'login';
    }
}
