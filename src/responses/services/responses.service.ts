import { HttpException, Inject, Injectable } from '@nestjs/common';
import { DatabaseAdapter } from 'src/database/adapters/database.adapter';
import { Form } from 'src/form/contracts/form.contract';
import { MailService } from 'src/mail/services/mail.service';
import { Response, Responses } from '../contract/response.contract';

@Injectable()
export class ResponsesService {
  constructor(
    @Inject('FormDatabaseAdapter')
    private readonly formDatabaseAdapter: DatabaseAdapter,
    @Inject('ResponsesDatabaseAdapter')
    private readonly responsesDatabaseAdapter: DatabaseAdapter,
    private readonly mailService: MailService,
  ) {}

  async save(formId: string, responses: Response[]) {
    try {
      const responseData: Partial<Responses> = {
        form_id: formId,
        responses,
      };

      await this.responsesDatabaseAdapter.create(responseData);
    } catch {
      throw new HttpException('Erro ao salvar respostas', 500);
    }
  }

  async sendByEmail(formId: string, responses: Response[]) {
    const formData = await this.formDatabaseAdapter.findById<Form>(formId);
    await this.mailService.send('miedson.fernandes@hotmail.com', 'responses', {
      name: formData?.name ?? '',
      description: formData?.description ?? '',
      responses,
    });
  }
}
