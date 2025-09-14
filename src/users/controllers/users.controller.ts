import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/response/user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiBearerAuth()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  async findByUserId(@Param('id') id: number): Promise<UserResponseDto | null> {
    const user = await this.usersService.findByUserId(id);
    return user
      ? plainToInstance(UserResponseDto, {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          organization: user.organization,
        })
      : null;
  }
}
