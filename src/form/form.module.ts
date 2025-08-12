import { Module } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { DatabaseAdapter } from 'src/database/adapters/database.adapter';
import { MongoAdapter } from 'src/database/adapters/mongo.adapter';
import { DatabaseModule } from 'src/database/database.module';
import { Form } from './contracts/form.contract';
import { FormController } from './controllers/form.controller';
import { formSchema } from './schemas/form.schema';
import { FormService } from './services/form.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FormController],
  providers: [
    FormService,
    {
      provide: 'FORM_MODEL',
      useFactory: (connection: Connection) =>
        connection.model('Form', formSchema),
      inject: ['DATABASE_CONNECTION'],
    },
    {
      provide: 'FormDatabaseAdapter',
      useFactory: (formModel: Model<Form>): DatabaseAdapter =>
        new MongoAdapter<Form>(formModel),
      inject: ['FORM_MODEL'],
    },
  ],
})
export class FormModule {}
