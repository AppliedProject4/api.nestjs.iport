import {
    Entity,
    Column
} from "typeorm";

import { BaseEntity } from "src/common/base-entity";

@Entity('users')
export class UserEntity extends BaseEntity{
    @Column({
        type: 'text'
    })
    profileImage: string

    @Column({
        length: 100,
        unique: true
    })
    email: string

    @Column({
        length: 100,
        unique: true
    })
    password: string
}
