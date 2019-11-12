import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/user.schema';
import {PassportModule} from '@nestjs/passport';
import {UsersModule} from '../users/users.module';
import {LocalStrategy} from './local.strategy';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';

@Module({
    imports: [
        PassportModule,
        UsersModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '7d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
