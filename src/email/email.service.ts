import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';
import {
  EmailAuth,
  EmailModel,
  SendEmailReponse,
  SMTPSetting,
} from './email.model';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async sendEmail({
    receivers,
    subject,
    text,
    html,
  }: EmailModel): Promise<SendEmailReponse> {
    const { from, ...option } = await this.getSMTPSetting();

    const transporter =
      nodemailer.createTransport<SMTPTransport.SentMessageInfo>(option);

    const info = await transporter.sendMail({
      from,
      to: receivers.join(', '),
      subject,
      text,
      html,
    });

    return {
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
    };
  }

  private async getEmailAuth(): Promise<EmailAuth> {
    const env = this.configService.get<string>('ENV');
    if (env === 'local') {
      const { user, pass } = await nodemailer.createTestAccount();
      return { user, pass };
    }

    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASS');
    return { user, pass };
  }

  private async getSMTPSetting(): Promise<SMTPSetting> {
    const host = this.configService.get<string>('SMTP_HOST');
    const port = +this.configService.get<string>('SMTP_PORT');
    const secure = this.configService.get<string>('SMTP_SECURE') === 'true';
    const from = this.configService.get<string>('SMTP_FROM');
    const auth = await this.getEmailAuth();

    return {
      host,
      port,
      secure,
      auth,
      from,
    };
  }
}
