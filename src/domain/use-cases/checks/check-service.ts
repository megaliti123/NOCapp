import { logEntity, LogSeverity } from "../../entities/log.enity";
import { LogRepository } from "../../repository/log.repository";

/**
 * Interfaz que define el contrato para casos de uso de verificación de servicios
 * 
 * Establece el comportamiento esperado para cualquier servicio que implemente
 * verificaciones de conectividad o disponibilidad de URLs/servicios externos.
 */
interface CheckServiceUseCase {
    /**
     * Ejecuta una verificación sobre una URL específica
     * @param url - URL del servicio a verificar
     * @returns Promise<boolean> - true si el servicio responde correctamente, false en caso contrario
     */
    execute(url: string): Promise<boolean>;
}

// Definición de tipos para callbacks - mejora la legibilidad y type safety
/** Tipo para función callback que se ejecuta cuando la verificación es exitosa */
type SuccessCallback = (() => void) | undefined;

/** Tipo para función callback que se ejecuta cuando la verificación falla */
type ErrorCallback = ((error: string) => void) | undefined;

/**
 * Caso de uso que implementa la lógica de verificación de servicios externos
 * 
 * Esta clase encapsula toda la lógica necesaria para:
 * - Realizar verificaciones HTTP a servicios externos
 * - Registrar logs de los resultados (éxito/fallo)
 * - Ejecutar callbacks apropiados según el resultado
 * - Manejar errores de conectividad de forma robusta
 * 
 * Sigue el patrón Use Case de Clean Architecture donde cada caso de uso
 * tiene una responsabilidad específica y bien definida.
 */
export class CheckService implements CheckServiceUseCase {

    /**
     * Constructor que inyecta dependencias necesarias para el caso de uso
     * 
     * @param logRepository - Repositorio para persistir logs de las verificaciones
     * @param onSuccess - Callback opcional ejecutado cuando la verificación es exitosa
     * @param onError - Callback opcional ejecutado cuando la verificación falla
     */
    constructor(
        private readonly logRepository: LogRepository,
        private readonly onSuccess: SuccessCallback,
        private readonly onError: ErrorCallback
    ) {
        // No se requiere inicialización adicional
    }

    /**
     * Ejecuta una verificación HTTP contra una URL específica
     * 
     * Flujo de ejecución:
     * 1. Realiza petición HTTP a la URL proporcionada
     * 2. Evalúa la respuesta HTTP
     * 3. Registra el resultado en logs
     * 4. Ejecuta callbacks correspondientes
     * 5. Retorna resultado booleano
     * 
     * @param url - URL del servicio a verificar (debe incluir protocolo)
     * @returns Promise<boolean> - true si verificación exitosa, false si falló
     */
    async execute(url: string): Promise<boolean> {
        try {
            // Realizar petición HTTP a la URL objetivo
            const req = await fetch(url);
            
            // Verificar si la respuesta HTTP indica éxito (status 200-299)
            if (!req.ok) {
                throw new Error(`HTTP Error: ${req.status} - ${req.statusText}`);
            }

            // Crear log de verificación exitosa con severidad baja
            const successLog = new logEntity(
                LogSeverity.low, 
                `✅ Service check SUCCESSFUL for ${url} - Status: ${req.status}`
            );

            // Persistir log de éxito
            await this.logRepository.saveLog(successLog);
            
            // Ejecutar callback de éxito si está definido
            if (this.onSuccess) {
                this.onSuccess();
            }
            
            return true;

        } catch (error) {
            // Construir mensaje de error detallado
            const errorMessage = `❌ Service check FAILED for ${url}: ${error}`;

            // Crear log de error con severidad alta para alertas
            const errorLog = new logEntity(LogSeverity.high, errorMessage);

            // Persistir log de error
            await this.logRepository.saveLog(errorLog);

            // Ejecutar callback de error si está definido
            if (this.onError) {
                this.onError(errorMessage);
            }
            
            return false;
        }
    }
}