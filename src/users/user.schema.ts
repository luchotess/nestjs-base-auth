import * as bcrypt from 'bcrypt';

import * as mongoose from 'mongoose';
import {HttpException, HttpStatus} from '@nestjs/common';

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
});

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.hashPassword = async function (password = null) {
    this.password = await bcrypt.hash(password ? password : this.password, 10);
};

UserSchema.pre('save', async function (next) {
    if (this.isNew) {
       await this.hashPassword();
    }
    next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
    const data = this.getUpdate();

    if (data.password) {
        throw new HttpException({
            error: 'Error updating user',
            message: `Can't change password on update process.`
        }, HttpStatus.BAD_REQUEST);
    }
    next();
});
