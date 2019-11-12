import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { BaseDto } from '../database/base.dto';

@Injectable()
export class UsersService extends BaseDto {
    constructor (@InjectModel('User') private readonly userModel: Model<User>) {
        super (userModel);
    }

    async changePassword (_id: string, password: string) {
        const user = await this.userModel.findOne({_id});
        await user.hashPassword(password);
        const success = await user.save();

        if (success) {
            return {
                success: true,
                user
            };
        } else {
            throw new HttpException('Error changing the password', HttpStatus.BAD_REQUEST);
        }
    }
}
