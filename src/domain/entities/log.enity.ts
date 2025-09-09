
/**
 * Enumeración que define los niveles de severidad disponibles para los logs del sistema
 * Utiliza valores string para facilitar la serialización y depuración
 */
export enum LogSeverity {
    low = "low",        // Logs informativos de baja prioridad
    medium = "medium",  // Logs de advertencia o eventos importantes
    high = "high"       // Logs críticos que requieren atención inmediata
}

export interface logEntityOptions {
    level: LogSeverity;
    message: string;
    createdAt?: Date;
    origin: string;
}

/**
 * Entidad que representa un log en el dominio del sistema
 * Encapsula toda la información necesaria de un evento de log
 */
export class logEntity {

    /** Nivel de severidad del log */
    public level: LogSeverity;
    
    /** Mensaje descriptivo del evento ocurrido */
    public message: string;
    
    /** Timestamp de cuando se creó el log */
    public createdAt: Date;

    public origin: string;

    /**
     * Constructor para crear una nueva instancia de log
     * @param level - Nivel de severidad del log
     * @param message - Descripción del evento a registrar
     */
    constructor(options: logEntityOptions) {
        const {message, level, createdAt, origin} = options;
        this.level = level;
        this.message = message;
        this.createdAt = createdAt || new Date(); // Marca de tiempo automática
        this.origin = origin;
    }

    /**
     * Método estático para reconstruir una instancia de logEntity desde JSON
     * Útil para deserializar logs almacenados en archivos o bases de datos
     * @param json - String JSON que contiene los datos del log
     * @returns Nueva instancia de logEntity reconstruida
     * @throws Error si el JSON es inválido o faltan propiedades requeridas
     */
    static fromJson = (json: string): logEntity => {
        // Parsear el JSON y extraer las propiedades
        const { message, level, createdAt, origin } = JSON.parse(json);

        // Validar que todas las propiedades requeridas estén presentes
        if (!message || !level || !createdAt || !origin) {
            throw new Error('Invalid log JSON');
        }

        // Crear nueva instancia con los datos deserializados
        const log = new logEntity({
            level,
            message,
            createdAt,
            origin
        });
        
        // Restaurar la fecha original del log
        log.createdAt = createdAt;

        return log;
    }
}