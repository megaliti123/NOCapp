import path from "path";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { logEntity, LogSeverity } from "../../domain/entities/log.enity";
import fs from 'fs';

/**
 * Implementación concreta de LogDataSource que utiliza el sistema de archivos
 * como mecanismo de persistencia para los logs.
 * 
 * Esta implementación:
 * - Organiza los logs en archivos separados por nivel de severidad
 * - Utiliza formato JSON para la serialización
 * - Crea automáticamente la estructura de directorios necesaria
 */
export class FileSystemDataSource implements LogDataSource {

    // Configuración de rutas de archivos
    /** Directorio raíz donde se almacenarán todos los archivos de log */
    private readonly logPath = 'logs/';
    
    /** Archivo que contiene logs de baja prioridad (actualmente funciona como archivo general) */
    private readonly allLogsPath = 'logs/logs-low.log';
    
    /** Archivo dedicado para logs de severidad media */
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    
    /** Archivo dedicado para logs de severidad alta */
    private readonly highLogsPath = 'logs/logs-high.log';

    /**
     * Constructor que inicializa la estructura de archivos necesaria
     */
    constructor() {
        this.createLogsFiles();
    }

    /**
     * Método privado que se encarga de crear la estructura de directorios y archivos
     * necesarios para el almacenamiento de logs.
     * 
     * - Crea el directorio 'logs/' si no existe
     * - Inicializa archivos vacíos para cada nivel de severidad
     */
    private createLogsFiles = (): void => {
        // Crear directorio principal si no existe
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        // Crear archivos de log si no existen
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(filePath => {
            // Solo crear el archivo si no existe previamente
            if (fs.existsSync(filePath)) return;
            
            // Inicializar con archivo vacío
            fs.writeFileSync(filePath, '');
        });
    }

    /**
     * Implementación del método saveLog para persistir logs en archivos
     * 
     * Estrategia de almacenamiento:
     * - Todos los logs se guardan en 'allLogsPath' (actualmente logs-low.log)
     * - Los logs de severidad media y alta se duplican en sus archivos específicos
     * - Los logs de severidad baja solo se almacenan una vez
     * 
     * @param newLog - Log a persistir
     */
    async saveLog(newLog: logEntity): Promise<void> {
        // Serializar el log a formato JSON con salto de línea
        const logAsJson = `${JSON.stringify(newLog)} \n`;

        // Guardar en archivo principal (todos los logs)
        fs.appendFileSync(this.allLogsPath, logAsJson);

        // Si es log de baja prioridad, no duplicar en otros archivos
        if (newLog.level === LogSeverity.low) return;

        // Guardar logs de severidad media en su archivo específico
        if (newLog.level === LogSeverity.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        }

        // Guardar logs de severidad alta en su archivo específico
        if (newLog.level === LogSeverity.high) {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }
    }

    /**
     * Método privado para leer y deserializar logs desde un archivo específico
     * 
     * @param path - Ruta del archivo a leer
     * @returns Array de entidades logEntity deserializadas
     * @throws Error si el archivo no se puede leer o el JSON es inválido
     */
    private getLogsFromFile = (path: string): logEntity[] => {
        // Leer contenido completo del archivo
        const content = fs.readFileSync(path, 'utf-8');
        
        // Dividir por saltos de línea y deserializar cada línea como JSON
        const logs = content.split('\n').map(logLine => 
            logEntity.fromJson(logLine)
        );
        
        // TODO: Filtrar líneas vacías para evitar errores de parsing
        return logs;
    }

    /**
     * Implementación del método getLogs para recuperar logs filtrados por severidad
     * 
     * @param severityLevel - Nivel de severidad a filtrar
     * @returns Array de logs que coinciden con el criterio
     * @throws Error si el nivel de severidad no es reconocido
     */
    async getLogs(severityLevel: LogSeverity): Promise<logEntity[]> {
        // Mapear nivel de severidad al archivo correspondiente
        switch (severityLevel) {
            case LogSeverity.low:
                return this.getLogsFromFile(this.allLogsPath);

            case LogSeverity.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverity.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`Unknown severity level: ${severityLevel}`);
        }
    }
}
