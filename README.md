# 🚀 NOC Project - Network Operations Center

Sistema de monitoreo y logging diseñado para verificar la disponibilidad de servicios externos y registrar eventos del sistema.

## 📋 Descripción

Este proyecto implementa un sistema NOC (Network Operations Center) que:

- ✅ Monitorea servicios externos mediante verificaciones HTTP
- 📝 Registra logs con diferentes niveles de severidad
- ⏰ Ejecuta verificaciones programadas usando cron jobs
- 💾 Persiste logs en sistema de archivos
- 🏗️ Sigue arquitectura limpia y patrones de diseño

## 🏛️ Arquitectura

El proyecto sigue **Clean Architecture** con las siguientes capas:

### Domain Layer (Dominio)
- **Entities**: `logEntity` - Entidades del negocio
- **Repository**: `LogRepository` - Contratos de persistencia
- **DataSource**: `LogDataSource` - Contratos de acceso a datos
- **Use Cases**: `CheckService` - Casos de uso del negocio

### Infrastructure Layer (Infraestructura)
- **DataSources**: `FileSystemDataSource` - Implementación de persistencia en archivos
- **Repositories**: `LogRepositoryImpl` - Implementación de repositorios

### Presentation Layer (Presentación)
- **Server**: Orquestador principal de servicios
- **Cron**: Servicio de tareas programadas

## 🛠️ Tecnologías

- **TypeScript**: Lenguaje principal
- **Node.js**: Runtime de ejecución
- **Cron**: Librería para tareas programadas
- **JSON Server**: Mock de base de datos para desarrollo

## 📦 Instalación

```bash
# Clonar el repositorio
git clone [url-del-repo]
cd NOCProyect

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## 🚀 Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con recarga automática
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Ejecuta la aplicación compilada
- `npm run db` - Inicia JSON Server para desarrollo

## 📁 Estructura del Proyecto

```
src/
├── app.ts                          # Punto de entrada
├── domain/                         # Lógica de negocio
│   ├── entities/                   # Entidades del dominio
│   ├── repository/                 # Contratos de repositorio
│   ├── datasources/               # Contratos de acceso a datos
│   └── use-cases/                 # Casos de uso
├── infrastructure/                 # Implementaciones concretas
│   ├── datasources/               # Acceso a datos
│   └── repositories/              # Repositorios
└── presentation/                   # Capa de presentación
    ├── server.ts                  # Servidor principal
    └── cron/                      # Servicios cron
```

## 📊 Logs

Los logs se organizan por severidad:

- **Low**: Eventos informativos (`logs/logs-low.log`)
- **Medium**: Advertencias (`logs/logs-medium.log`)
- **High**: Errores críticos (`logs/logs-high.log`)

## 🔧 Configuración

### Monitoreo de Servicios

Por defecto, el sistema monitorea `https://localhost:3000` cada 5 segundos. 

Para cambiar la URL o frecuencia, edita `src/presentation/server.ts`:

```typescript
// Cambiar URL objetivo
const url = 'https://tu-servicio.com';

// Cambiar frecuencia (patrón cron)
CronService.createJob('*/10 * * * * *', callback); // cada 10 segundos
```

### Patrones Cron

- `*/5 * * * * *` - Cada 5 segundos
- `0 */1 * * * *` - Cada minuto
- `0 0 */1 * * *` - Cada hora

## 🧪 Testing

El proyecto está estructurado para facilitar testing:

- **Dependency Injection**: Permite inyectar mocks
- **Interfaces claras**: Facilita creación de stubs
- **Separación de responsabilidades**: Testing unitario por capas

## 🎯 Patrones de Diseño Implementados

- **Repository Pattern**: Abstracción de persistencia
- **Dependency Injection**: Inversión de dependencias
- **Use Case Pattern**: Casos de uso específicos
- **Clean Architecture**: Separación por capas
- **Data Access Object**: Acceso a datos

## 📚 Próximas Mejoras

- [ ] Configuración mediante variables de entorno
- [ ] Múltiples servicios de monitoreo
- [ ] Dashboard web para visualización
- [ ] Alertas por email/Slack
- [ ] Base de datos real
- [ ] Tests unitarios y de integración

## 👥 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
