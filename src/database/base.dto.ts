import { Model } from 'mongoose';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserDto } from '../users/create-user.dto';

@Injectable()
export class BaseDto {
    constructor (private readonly model: Model<any>) {}

    async create (createDto: any): Promise<any> {
        const created = new this.model(createDto);
        return created.save();
    }

    async findAll (): Promise<any[]> {
        return await this.model.find().exec();
    }

    async findOne (condition): Promise<any> {
        return await this.model.findOne(condition).exec();
    }

    async update (_id: string, createUserDto: CreateUserDto): Promise<any> {
        return await this.model.findOneAndUpdate({_id}, createUserDto, {new: true}).exec();
    }

    async delete (_id: string): Promise<any> {
        const deleted = await this.model.findOneAndDelete({_id}).exec();

        if (deleted) {
            return {
                success: true,
                deleted: deleted._id
            };
        } else {
            throw new HttpException({error: 'Error deleting from the database.'}, HttpStatus.BAD_REQUEST);
        }
    }
}
