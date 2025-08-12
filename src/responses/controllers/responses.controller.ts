import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ResponsesService } from '../services/responses.service';
import { Response } from '../contract/response.contract';
@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post(':id/save')
  async save(@Param('id') formId: string, @Body() data: Response[]) {
    await this.responsesService.save(formId, data);
  }

  @Post(':id/send')
  @HttpCode(200)
  async send(@Param('id') formId: string, @Body() data: Response[]) {
    await this.responsesService.sendByEmail(formId, data);
  }
}
