// IMPORTANTE: dotenv debe importarse ANTES que cualquier otro módulo
import 'dotenv/config';
import { server } from './presentation/server';
import { envs } from './config/envx.plugins';

/**
 * Punto de entrada principal de la aplicación NOC (Network Operations Center)
 * 
 * Este archivo:
 * - Inicializa la aplicación de forma asíncrona
 * - Maneja el arranque del servidor
 * - Actúa como orquestador principal del sistema
 */

/**
 * Función principal que contiene la lógica de inicialización de la aplicación
 * 
 * Aquí se pueden agregar:
 * - Configuración de variables de entorno
 * - Inicialización de conexiones a base de datos
 * - Configuración de middleware
 * - Validación de dependencias del sistema
 */
function main(): void {
    console.log('🚀 Iniciando aplicación NOC...');
    
    // Verificar que las variables de entorno se carguen correctamente
    const mailerEmail = process.env.MAILER_EMAIL;
    
    if (!mailerEmail) {
        console.error('❌ Error: MAILER_EMAIL no está definido en el archivo .env');
        process.exit(1);
    }

    console.log(envs)
    
    console.log(`📧 Email configurado: ${mailerEmail}`);
    
    // Iniciar el servidor HTTP/Express
    server.start();
    
    console.log('✅ Aplicación NOC iniciada correctamente');
}

/**
 * IIFE (Immediately Invoked Function Expression) asíncrona
 * que ejecuta la función main y maneja errores globales
 */
(async () => {
    try {
        // Ejecutar la función principal de inicialización
        main();
    } catch (error) {
        // Manejo centralizado de errores durante el arranque
        console.error('❌ Error fatal durante la inicialización:', error);
        
        // Terminar el proceso con código de error
        process.exit(1);
    }
})();