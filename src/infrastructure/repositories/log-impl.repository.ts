import { logEntity, LogSeverity } from '../../domain/entities/log.enity';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogDataSource } from '../../domain/datasources/log.datasource';

/**
 * Implementación concreta del LogRepository que actúa como un adaptador
 * entre la capa de dominio y la capa de infraestructura.
 * 
 * Esta clase:
 * - Implementa el contrato definido por LogRepository (dominio)
 * - Delega las operaciones reales al LogDataSource (infraestructura)
 * - Permite intercambiar diferentes fuentes de datos sin afectar el dominio
 * - Facilita testing al poder inyectar mocks del DataSource
 */
export class LogRepositoryImpl implements LogRepository {

    /**
     * Constructor que recibe la dependencia del DataSource mediante inyección
     * 
     * @param logDataSource - Implementación específica de acceso a datos
     *                       (puede ser FileSystem, Database, API, etc.)
     */
    constructor(private readonly logDataSource: LogDataSource) {
        // No se requiere inicialización adicional
    }
    
    /**
     * Implementación del método saveLog que delega al DataSource
     * 
     * Aquí se podría agregar lógica de negocio adicional como:
     * - Validaciones de dominio
     * - Transformaciones de datos
     * - Logging de auditoría
     * - Notificaciones
     * 
     * @param log - Entidad de log a persistir
     * @returns Promise que se resuelve cuando el log se guarda
     */
    async saveLog(log: logEntity): Promise<void> {
        // Delegar al DataSource para la persistencia real
        await this.logDataSource.saveLog(log);
    }

    /**
     * Implementación del método getLogs que delega al DataSource
     * 
     * Aquí se podría agregar lógica de negocio como:
     * - Filtros adicionales de dominio
     * - Ordenamiento específico
     * - Paginación
     * - Cache de resultados
     * 
     * @param severityLevel - Nivel de severidad para filtrar
     * @returns Promise con array de logs filtrados
     */
    async getLogs(severityLevel: LogSeverity): Promise<logEntity[]> {
        // Delegar al DataSource para la recuperación real
        return await this.logDataSource.getLogs(severityLevel);
    }
}