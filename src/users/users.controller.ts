import {Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Post()
    async create (@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Get()
    async findAll (): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Put(':id')
    async update (@Param('id') id: string,
                  @Body() createUserDto: CreateUserDto): Promise<User>  {
        return await this.usersService.update(id, createUserDto);
    }

    @Put(':id/password')
    async changePassword (@Param('id') id: string,
                          @Body() {password}): Promise<any>  {
        return await this.usersService.changePassword(id, password);
    }

    @Delete(':id')
    async delete (@Param('id') id: string): Promise<any>  {
        return await this.usersService.delete(id);
    }
}
