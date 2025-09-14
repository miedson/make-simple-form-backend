import { OrganizationStatusEnum } from 'src/common/enums/organization-status.enum';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('organizations')
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  slug?: string;

  @Column({
    type: 'enum',
    enum: OrganizationStatusEnum,
    enumName: 'organization_status_enum',
    default: OrganizationStatusEnum.ACTIVE,
  })
  status: OrganizationStatusEnum;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_root_Id' })
  userRoot?: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.organization)
  users: UserEntity[];
}
