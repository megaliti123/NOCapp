import { CronJob } from "cron";

// Definición de tipos para mayor claridad y type safety
/** Tipo que define los formatos válidos para expresiones cron */
type CronTime = string | Date;

/** Tipo que define la función callback que se ejecuta en cada tick del cron */
type OnTick = () => void;

/**
 * Servicio utilitario para el manejo de tareas programadas (cron jobs)
 * 
 * Proporciona una interfaz simplificada para crear y gestionar
 * tareas que se ejecutan de forma periódica siguiendo patrones cron.
 * 
 * Funcionalidades:
 * - Creación de trabajos cron con sintaxis simplificada
 * - Inicio automático de trabajos
 * - Abstracción de la librería 'cron' subyacente
 */
export class CronService {
    
    /**
     * Crea y inicia un nuevo trabajo cron
     * 
     * @param cronTime - Expresión cron que define cuándo ejecutar la tarea
     * @param onTick - Función callback que se ejecutará cada vez que se active el cron
     * @returns CronJob - Instancia del trabajo cron creado y ya iniciado
     */
    static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
        // Crear nueva instancia de CronJob con los parámetros proporcionados
        const job = new CronJob(
            cronTime, // Patrón de tiempo de ejecución
            onTick    // Función a ejecutar en cada activación
        );

        // Iniciar el trabajo inmediatamente
        job.start();

        // Retornar la instancia para posible manipulación posterior
        return job;
    }
}