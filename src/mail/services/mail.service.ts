import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async send(
    to: string,
    template: string,
    context:
      | {
          [name: string]: any;
        }
      | undefined,
  ): Promise<any> {
    return await this.mailerService.sendMail({
      to,
      template,
      context,
    });
  }
}
