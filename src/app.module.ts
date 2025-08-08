import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { FormModule } from './form/form.module';
import { ResponsesModule } from './responses/responses.module';

@Module({
  imports: [FormModule, DatabaseModule, ResponsesModule],
})
export class AppModule {}
