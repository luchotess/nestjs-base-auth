import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredenditalsDTO } from './auth.interface';

@Controller('auth')
export class AuthController {
    constructor (private readonly _AuthService: AuthService) {}

    @Post('login')
    async login (@Body() credentialsDTO: CredenditalsDTO) {
        console.log(await this._AuthService.login(credentialsDTO));
    }
}
