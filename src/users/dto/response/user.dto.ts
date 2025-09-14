import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { OrganizationEntity } from 'src/organization/entities/organization.entity';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  @ApiProperty({ type: () => OrganizationEntity })
  organization: OrganizationEntity;
}
