import { logEntity, LogSeverity } from "../entities/log.enity";

/**
 * Clase abstracta que define el contrato del Repository para el manejo de logs
 * 
 * Implementa el patrón Repository del Domain Driven Design (DDD)
 * que abstrae el acceso a datos y proporciona una interfaz más orientada a objetos
 * para acceder a los datos del dominio.
 * 
 * Esta abstracción permite:
 * - Separar la lógica de dominio de la infraestructura
 * - Facilitar testing mediante mocks
 * - Intercambiar implementaciones de persistencia
 */
export abstract class LogRepository {
    /**
     * Persiste un nuevo log en el sistema de almacenamiento
     * 
     * @param log - Entidad de log que se desea guardar
     * @returns Promise<void> - Se resuelve cuando el log se guarda exitosamente
     * @throws Error si ocurre algún problema durante el guardado
     */
    abstract saveLog(log: logEntity): Promise<void>;

    /**
     * Recupera logs filtrados por su nivel de severidad
     * 
     * @param severityLevel - Nivel de severidad por el cual filtrar los logs
     * @returns Promise<logEntity[]> - Array de logs que coinciden con el filtro
     * @throws Error si ocurre algún problema durante la recuperación
     */
    abstract getLogs(severityLevel: LogSeverity): Promise<logEntity[]>;
}
