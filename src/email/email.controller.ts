import { Body, Controller, Post } from '@nestjs/common';
import { EmailModel, SendEmailReponse } from './email.model';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  sendEmail(@Body() body: EmailModel): Promise<SendEmailReponse> {
    return this.emailService.sendEmail(body);
  }
}
