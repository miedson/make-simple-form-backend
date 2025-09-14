import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { FormModule } from './form/form.module';
import { ResponsesModule } from './responses/responses.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrganizationModule } from './organization/organization.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    FormModule,
    DatabaseModule,
    ResponsesModule,
    AuthModule,
    UsersModule,
    OrganizationModule,
  ],
})
export class AppModule {}
