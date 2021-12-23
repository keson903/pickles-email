/* eslint-disable @typescript-eslint/no-var-requires */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

jest.mock('nodemailer', () => require('../../test/__mocks__/nodemailer'));
const { mock } = require('nodemailer');

describe('EmailController', () => {
  let emailController: EmailController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.local',
        }),
      ],
      controllers: [EmailController],
      providers: [EmailService],
    }).compile();

    emailController = app.get<EmailController>(EmailController);

    mock.reset();
  });

  describe('root', () => {
    it('should return { previewUrl }', async () => {
      const { previewUrl } = await emailController.sendEmail({
        receivers: ['receiver@test.com'],
        subject: 'test subject',
        text: 'test text',
      });

      const sentEmails = mock.getSentMail();
      expect(sentEmails.length).toBe(1);
      expect(previewUrl).toBe('https://previewurl.com/test@test.com');
    });

    it('should `to` match multiple receivers', async () => {
      await emailController.sendEmail({
        receivers: ['receiver1@test.com', 'receiver2@test.com'],
        subject: 'test subject',
        text: 'test text',
      });

      const sentEmails = mock.getSentMail();
      expect(sentEmails.length).toBe(1);
      expect(sentEmails[0].to).toBe('receiver1@test.com, receiver2@test.com');
    });
  });
});
