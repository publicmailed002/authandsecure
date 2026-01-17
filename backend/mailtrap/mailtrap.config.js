import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config()

export const TOKEN =process.env.SENDING_ONBORADING_API_TOKEN;

export const MailTrapClientSaved = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "fastes email",
};
