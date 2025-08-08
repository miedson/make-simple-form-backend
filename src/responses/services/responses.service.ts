import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Response } from '../contract/response.contract';
import { ResponseDto } from '../controllers/responses.controller';

@Injectable()
export class ResponsesService {
  constructor(
    @Inject('RESPONSES_MODEL') private readonly responsesModel: Model<Response>,
  ) {}

  async save(formId: string, responses: ResponseDto) {
    try {
      const responseData: Partial<Response> = {
        form_id: formId,
        responses,
      };

      await this.responsesModel.create(responseData);
    } catch {
      throw new HttpException('Erro ao salvar respostas', 500);
    }
  }
}
