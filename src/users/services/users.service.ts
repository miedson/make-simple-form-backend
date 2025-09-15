import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { OrganizationService } from 'src/organization/services/organization.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly organizationService: OrganizationService,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
      relations: ['organization'],
    });

    return user;
  }

  async findByUserId(id: number): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: ['organization'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async create(userDto: CreateUserDto): Promise<void> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userDto.password, saltRounds);

    const userOrganization = await this.organizationService.findOne(
      userDto.organizationId,
    );

    const user = this.usersRepository.create({
      ...userDto,
      organization: userOrganization,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);
  }
}
