import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/base-entity';
import { UserEntity } from './user.entity';

@Entity('companyUser')
export class CompanyUserEntity extends BaseEntity {

    @Column({
        type: 'varchar'
    })
    city: string

    @Column({
        type: 'varchar'
    })
    street: string

    @Column({
        type: 'varchar'
    })
    cep: string

    @Column({
        type: 'int'
    })
    number: number

    @Column({
        type: 'varchar'
    })
    cnpj: string

    @OneToOne(
        type => UserEntity,
        user => user.companyUser,
        {
            onDelete: 'CASCADE'
        }
    )
    user: UserEntity

}
