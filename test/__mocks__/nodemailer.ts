/* eslint-disable @typescript-eslint/no-var-requires */
// load the real nodemailer
const nodemailer = require('nodemailer');
// pass it in when creating the mock using getMockFor()
const nodemailerMock = require('nodemailer-mock').getMockFor(nodemailer);

// export the mocked module
nodemailerMock.createTestAccount = () => ({
  user: 'sender@test.com',
  pass: 'test',
});

nodemailerMock.getTestMessageUrl = () => 'https://previewurl.com/test@test.com';

module.exports = nodemailerMock;
