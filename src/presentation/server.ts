import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { EmailService } from "./email/email-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";

/**
 * Configuración e inicialización de dependencias
 * 
 * Se utiliza el patrón de Composición de Objetos para ensamblar
 * las dependencias necesarias:
 * - FileSystemDataSource: Para persistencia en archivos
 * - LogRepositoryImpl: Para abstracción del dominio
 */
const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

/**
 * Clase principal del servidor que orquesta todos los servicios de la aplicación
 * 
 * Responsabilidades:
 * - Inicializar servicios de monitoreo
 * - Configurar tareas programadas (cron jobs)
 * - Gestionar el ciclo de vida del servidor
 */
export class server {

    /**
     * Método estático que inicia todos los servicios del servidor
     * 
     * Configura:
     * - Tareas de monitoreo programadas
     * - Servicios de verificación de conectividad
     * - Logging de eventos del sistema
     */
    public static start(): void {
        console.log("🚀 Server started");

        // Configurar servicio de email
        new SendEmailLogs(
            new EmailService(),
            fileSystemRepository
        ).execute('vvillalobos585@gmail.com');

        // URL objetivo para monitoreo de conectividad
        // const url = 'https://localhost:3000';
        
        // /**
        //  * Configuración de tarea cron que se ejecuta cada 5 segundos
        //  * 
        //  * Patrón cron: cada 5 segundos en todos los minutos, horas y días
        //  */
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         /**
        //          * Crear instancia del servicio de verificación
        //          *
        //          * Parámetros:
        //          * - fileSystemRepository: Para logging de resultados
        //          * - successCallback: Función ejecutada en verificaciones exitosas
        //          * - errorCallback: Función ejecutada cuando hay errores
        //          */
        //         new CheckService(
        //             fileSystemRepository,
        //             () => console.log(`✅ Conectividad exitosa: ${url}`),
        //             (error) => console.log(`❌ Error de conectividad: ${error}`)
        //         ).execute(url);
        //     }
        // );
    }
}

