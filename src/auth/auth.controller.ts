import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredenditalsDTO } from './auth.interface';
import {AuthGuard} from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor (private readonly _AuthService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login (@Body() credentialsDTO: CredenditalsDTO, @Request() req) {
        return this._AuthService.login(req.user);
    }
}
