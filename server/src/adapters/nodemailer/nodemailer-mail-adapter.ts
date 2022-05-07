import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
    user: "ad8de0cc90a714",
    pass: "e821e5ed943d22"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
                
          
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Judson <tamar_judson@hotmail.com>',
            subject,
            html: body
        })
    }
}