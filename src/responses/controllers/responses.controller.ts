import { Controller, Post, Param, Body } from '@nestjs/common';
import { ResponsesService } from '../services/responses.service';
import { Responses } from '../contract/response.contract';

export type ResponseDto = Responses;

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post(':id/save')
  async saveResponse(@Param('id') formId: string, @Body() data: ResponseDto) {
    await this.responsesService.save(formId, data);
  }
}
