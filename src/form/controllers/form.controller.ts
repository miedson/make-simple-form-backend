import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateFormDto } from '../dto/request/create-form.dto';
import { FormService } from '../services/form.service';
import { ResponseFindFormDto } from '../dto/response/response-find-form.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Formulários')
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @ApiBearerAuth()
  @HttpCode(201)
  async create(@Body() formData: CreateFormDto) {
    return this.formService.createOrUpdate(formData);
  }

  @Get(':id')
  @ApiBearerAuth()
  @HttpCode(200)
  async findById(@Param('id') id: string): Promise<ResponseFindFormDto> {
    return this.formService.getById(id);
  }

  @Put(':id/publish')
  @ApiBearerAuth()
  @HttpCode(200)
  async publish(@Param('id') id: string) {
    return this.formService.publish(id);
  }
}
