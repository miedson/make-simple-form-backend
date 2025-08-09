import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { FormModule } from './form/form.module';
import { ResponsesModule } from './responses/responses.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    FormModule,
    DatabaseModule,
    ResponsesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
})
export class AppModule {}
