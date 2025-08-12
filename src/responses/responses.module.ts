import { Module } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { ResponsesController } from './controllers/responses.controller';
import { responseSchema } from './schemas/response.schema';
import { ResponsesService } from './services/responses.service';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseAdapter } from 'src/database/adapters/database.adapter';
import { MongoAdapter } from 'src/database/adapters/mongo.adapter';
import { Form } from 'src/form/contracts/form.contract';
import { Responses } from './contract/response.contract';
import { MailModule } from 'src/mail/mail.module';
import { formSchema } from 'src/form/schemas/form.schema';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [ResponsesController],
  providers: [
    ResponsesService,
    {
      provide: 'FORM_MODEL',
      useFactory: (connection: Connection) =>
        connection.model('Form', formSchema),
      inject: ['DATABASE_CONNECTION'],
    },
    {
      provide: 'RESPONSES_MODEL',
      useFactory: (connection: Connection) =>
        connection.model('Responses', responseSchema),
      inject: ['DATABASE_CONNECTION'],
    },
    {
      provide: 'FormDatabaseAdapter',
      useFactory: (formModel: Model<Form>): DatabaseAdapter =>
        new MongoAdapter<Form>(formModel),
      inject: ['FORM_MODEL'],
    },
    {
      provide: 'ResponsesDatabaseAdapter',
      useFactory: (responsesModel: Model<Responses>): DatabaseAdapter =>
        new MongoAdapter<Responses>(responsesModel),
      inject: ['RESPONSES_MODEL'],
    },
  ],
})
export class ResponsesModule {}
