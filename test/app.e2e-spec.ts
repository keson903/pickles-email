import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EmailModule } from '../src/email/email.module';
import { ConfigModule } from '@nestjs/config';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.local',
        }),
        EmailModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        receivers: ['receiver@test.com'],
        subject: 'test subject',
        text: 'test text',
      })
      .expect(201)
      .then((response) => {
        expect(response.body.previewUrl).toBe(
          'https://previewurl.com/test@test.com',
        );
      });
  });
});
