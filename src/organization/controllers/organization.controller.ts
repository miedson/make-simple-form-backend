import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { OrganizationEntity } from '../entities/organization.entity';
import { OrganizationService } from '../services/organization.service';

@ApiTags('Organizações')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @HttpCode(201)
  @ApiBearerAuth()
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<void> {
    await this.organizationService.create(createOrganizationDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrganizationEntity | null> {
    return await this.organizationService.findOne(id);
  }
}
