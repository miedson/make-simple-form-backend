import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { ResponsesController } from './controllers/responses.controller';
import { responseSchema } from './schemas/response.schema';
import { ResponsesService } from './services/responses.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ResponsesController],
  providers: [
    ResponsesService,
    {
      provide: 'RESPONSES_MODEL',
      useFactory: (connection: Connection) =>
        connection.model('Responses', responseSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
})
export class ResponsesModule {}
