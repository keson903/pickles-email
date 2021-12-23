import SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface EmailModel {
  receivers: string[];
  subject: string;
  text: string;
  html?: string;
}

export interface SendEmailReponse {
  messageId: string;
  previewUrl: string | false;
}

export interface EmailAuth {
  user: string;
  pass: string;
}

export interface SMTPSetting extends SMTPTransport.Options {
  from: string;
}
