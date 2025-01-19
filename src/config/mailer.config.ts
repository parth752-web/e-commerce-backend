interface ISendgridConfig {
  apiKey: string;
  from: string;
}

interface INodemailerConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}

export interface IMailerConfig {
  sendgrid: ISendgridConfig;
  nodemailer: INodemailerConfig;
}

export const mailerConfig = (): IMailerConfig => ({
  sendgrid: {
    apiKey: process.env.MAILER_SENDGRID_API_KEY,
    from: process.env.MAILER_SENDGRID_FROM,
  },
  nodemailer: {
    host: process.env.MAILER_NODEMAILER_HOST,
    port: parseInt(process.env.MAILER_NODEMAILER_PORT, 10) || 587,
    user: process.env.MAILER_NODEMAILER_USER,
    pass: process.env.MAILER_NODEMAILER_PASS,
    from: process.env.MAILER_NODEMAILER_FROM,
  },
});
