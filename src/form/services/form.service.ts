import { HttpException, Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DatabaseAdapter } from 'src/database/adapters/database.adapter';
import { CreateFormDto } from '../dto/request/create-form.dto';
import { ResponseFindFormDto } from '../dto/response/response-find-form.dto';
import { Form } from '../contracts/form.contract';

@Injectable()
export class FormService {
  constructor(
    @Inject('FormDatabaseAdapter')
    private readonly database: DatabaseAdapter,
  ) {}

  async createOrUpdate(formData: CreateFormDto) {
    await this.database.upsert<Form>(formData.id, formData, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async getById(id: string) {
    const form = await this.database.findById<Form>(id);
    if (!form) {
      throw new HttpException('Formulário não encontrado ou não existe', 404);
    }
    if (form && !form.published) {
      throw new HttpException(
        'Formulário não publicado ou não encontrado',
        404,
      );
    }

    return plainToInstance(ResponseFindFormDto, form, {
      excludeExtraneousValues: true,
    });
  }

  async publish(id: string) {
    const form = await this.database.findById<Form>(id);
    if (!form) {
      throw new HttpException(
        'Formulário não existe ou não foi encontrado',
        404,
      );
    }
    form.set('published', true);
    await form.save();
    return id;
  }
}
