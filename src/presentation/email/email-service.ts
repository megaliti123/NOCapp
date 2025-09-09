import nodemailer from 'nodemailer';
import {envs} from '../../config/envs.plugin/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { logEntity, LogSeverity } from '../../domain/entities/log.enity';

interface Attachment {
    filename: string;
    path: string;
}

interface SendEmailOptions {
    to: string| string[];
    subject: string;
    text: string;
    html?: string;
    attachments: Attachment[];
}

export class EmailService{

    private transporter= nodemailer.createTransport({
        service: envs.mailerService,
        auth: {
            user: envs.mailerEmail,
            pass: envs.mailerPassword
        }
    });

    constructor(

       

    ){
        // this.verifyConnection()
    }

    async sendEmail(options: SendEmailOptions): Promise<void> {
   const {to, subject, text, html, attachments = []} = options;


   try {
    const sentInformation = await this.transporter.sendMail({
        from: envs.mailerEmail,
        to: to,
        subject: subject,
        text: text,
        html: html,
        attachments: attachments
    });

    const log = new logEntity({
        level:  LogSeverity.low,
        message: `Email sent to ${to} with subject "${subject}"`,
        createdAt: new Date(),
        origin: 'EmailService'
    });

   

    // console.log(sentInformation)
    
   } catch (error) {
    const log = new logEntity({
        level:  LogSeverity.high,
        message: `Failed to send email to ${to} with subject "${subject}": ${error}`,
        createdAt: new Date(),
        origin: 'EmailService'
    });


       console.error('Error sending email:', error);
   }

    }


    sendEmailWithAttachments(to: string| string[]){
       const subject = "Logs del servidor"
       const text = "Adjunto los logs del servidor"
       const html = "<p>Adjunto los logs del servidor</p>"
    const attachments: Attachment[] = [
        {
          filename: 'logs-all.log',
          path: './logs/logs-all.log'
        }, {
          filename: 'logs-high.log',
          path: './logs/logs-high.log'
        }, {
          filename: 'logs-medium.log',
          path: './logs/logs-medium.log'
        }
    ];

       return this.sendEmail({ to, subject, text, html, attachments });
    }

}