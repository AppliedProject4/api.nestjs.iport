import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'

import { UserEntity } from 'src/typeorm/entities/user.entity';
import { RegisterPayload } from '../../auth/models/register.payload';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>
    ) { super(repository) }

    /**
     * Method that create new users
     * @param user stores the new user data
     */
    public async createUser(user: RegisterPayload) {
        try {
            const response = await this.repository.save(user)
            return response;
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
