import { logEntity, LogSeverity } from "../entities/log.enity";

/**
 * Clase abstracta que define el contrato para las fuentes de datos de logs
 * 
 * Implementa el patrón Data Access Object (DAO) que encapsula
 * el acceso a los datos y oculta los detalles de implementación
 * específicos de cada fuente de datos (archivos, base de datos, APIs, etc.)
 * 
 * Esta abstracción permite:
 * - Intercambiar fuentes de datos sin afectar la lógica de negocio
 * - Testear la aplicación con diferentes implementaciones
 * - Mantener la separación entre capas de dominio e infraestructura
 */
export abstract class LogDataSource {

    /**
     * Guarda un log en la fuente de datos específica
     * 
     * @param log - Entidad de log a persistir
     * @returns Promise<void> - Se resuelve cuando el log se almacena correctamente
     * @throws Error si hay problemas de conectividad o escritura
     */
    abstract saveLog(log: logEntity): Promise<void>;

    /**
     * Obtiene logs filtrados por nivel de severidad desde la fuente de datos
     * 
     * @param severityLevel - Criterio de filtrado por severidad
     * @returns Promise<logEntity[]> - Colección de logs que cumplen el criterio
     * @throws Error si hay problemas de conectividad o lectura
     */
    abstract getLogs(severityLevel: LogSeverity): Promise<logEntity[]>;
}