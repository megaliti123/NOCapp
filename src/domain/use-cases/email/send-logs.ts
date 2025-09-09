import { EmailService } from "../../../presentation/email/email-service";
import { logEntity, LogSeverity } from "../../entities/log.enity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogsEmailUseCase {
    /**
     * Envía un correo electrónico con los logs adjuntos
     * @param recipientEmail - Dirección de correo del destinatario
     * @returns Promise<void>
     */
  execute(to: string | string[]): Promise<boolean>
  
}



export class SendEmailLogs implements SendLogsEmailUseCase {



    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository


    ){}


    async execute(to: string | string[]): Promise<boolean> {



        try{

          const sent = await this.emailService.sendEmailWithAttachments(to);
          // If sendEmailWithAttachments returns void, just proceed
        }catch(error){
            console.error('Error sending email with logs:', error);
         

            const log = new logEntity({
                level: LogSeverity.high,
                message: `Failed to send logs email: ${error}`,
                createdAt: new Date(),
                origin: 'SendEmailLogsUseCase'
            });
            await this.logRepository.saveLog(log);
            return false;

        }


        // Lógica para enviar el correo electrónico con los logs adjuntos
        return true;
    }
}