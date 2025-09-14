import { Controller, Post, Param, Body } from '@nestjs/common';
import { ResponsesService } from '../services/responses.service';
import { Responses } from '../contract/response.contract';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export type ResponseDto = Responses;

@ApiTags('Respostas')
@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post(':id/save')
  @ApiBearerAuth()
  async saveResponse(@Param('id') formId: string, @Body() data: ResponseDto) {
    await this.responsesService.save(formId, data);
  }
}
