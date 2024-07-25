import nodemailer from 'nodemailer';
import env from '../utils/env.js';
import { SMTP } from '../constans/constans.js';

// const host = env('SMTP_HOST');
// const port = env('SMTP_PORT');
// const user = env('SMTP_USER');
// const password = env('SMTP_PASSWORD');
// const emailFrom = env('SMTP_FROM');

const nodemailerConfig = {
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

/*
const data = {
    to: "velate1125@bacaki.com",
    subject: "Test email",
    html: "<strong>Test email</strong>",
};
*/
// const sendEmail = async (data) => {
//   const email = { ...data, from: emailFrom };
//   return await transport.sendMail(email);
// };

export const sendEmail = async (data) => {
  return await transport.sendMail(data);
};
