import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FormController } from './controllers/form.controller';
import { FormService } from './services/form.service';
import { Connection, Model } from 'mongoose';
import { formSchema } from './schemas/form.schema';
import { DatabaseAdapter } from 'src/database/adapters/database.adapter';
import { MongoAdapter } from 'src/database/adapters/mongo.adapter';
import { Form } from './contracts/form.contract';

@Module({
  imports: [DatabaseModule],
  controllers: [FormController],
  providers: [
    FormService,
    {
      provide: 'FORM_MODEL',
      useFactory: (connection: Connection) =>
        connection.model('Form', formSchema),
      inject: ['MONGO_CONNECTION'],
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
