import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { OrganizationEntity } from '../entities/organization.entity';
import { OrganizationStatusEnum } from 'src/common/enums/organization-status.enum';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepository: Repository<OrganizationEntity>,
  ) {}

  async findOne(id: number): Promise<OrganizationEntity | null> {
    const organization: OrganizationEntity | null =
      await this.organizationRepository.findOne({
        where: { id },
      });

    if (!organization) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }

    return organization;
  }

  async create(
    createOrganizationDto: CreateOrganizationDto & { userRootId?: number },
  ): Promise<void> {
    const slug =
      !createOrganizationDto.slug || createOrganizationDto.slug.trim() === ''
        ? createOrganizationDto.name.replace(/\s+/g, '-').toLowerCase()
        : createOrganizationDto.slug;

    const organization = this.organizationRepository.create({
      ...createOrganizationDto,
      status: OrganizationStatusEnum.ACTIVE,
      slug,
    });
    await this.organizationRepository.save(organization);
  }
}
