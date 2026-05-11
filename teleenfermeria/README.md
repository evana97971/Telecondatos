# 🏥 Teleenfermería Comunitaria - Sistema de Gestión Sanitaria

Sistema profesional y moderno para la gestión integral de pacientes, consultas y estadísticas en teleenfermería comunitaria.

## ✨ Características Principales

### 🔐 Autenticación y Seguridad
- Sistema de registro e inicio de sesión seguro
- Validación de contraseñas
- Persistencia de sesión en Local Storage
- Cierre de sesión seguro

### 👥 Gestión de Pacientes
- ✅ Crear nuevos pacientes con información completa
- ✅ Editar datos de pacientes existentes
- ✅ Eliminar pacientes del sistema
- ✅ Búsqueda en tiempo real (por nombre, DNI, email)
- ✅ Información detallada:
  - Datos personales (nombre, DNI, email, teléfono)
  - Datos de salud (edad, género, grupo sanguíneo)
  - Antecedentes médicos y alergias
  - Estado del paciente (Activo, Inactivo, Crítico)

### 📋 Registro de Consultas
- ✅ Registrar nuevas consultas médicas
- ✅ Clasificación por tipo (Seguimiento, Educación, Emergencia, Preventiva)
- ✅ Establecer prioridad (Normal, Alta, Urgente)
- ✅ Detalles de consulta:
  - Motivo de la consulta
  - Diagnóstico preliminar
  - Tratamiento recomendado
  - Notas adicionales
  - Fecha y hora de la consulta
- ✅ Búsqueda y filtrado de consultas
- ✅ Visualización de historial de consultas

### 📊 Dashboard y Estadísticas
- 📈 Estadísticas en tiempo real:
  - Total de pacientes registrados
  - Consultas realizadas hoy
  - Casos críticos identificados
  - Tasa de seguimiento
- 📉 Gráficos interactivos:
  - Consultas por tipo (gráfico de rosquilla)
  - Distribución de edades (gráfico circular)
  - Tendencias de consultas (gráfico de línea)
  - Pacientes con mayor actividad

### 📑 Reportes y Exportación
- 📄 Exportar a PDF con formato profesional
- 📊 Exportar a Excel (CSV) para análisis adicional
- 📋 Reportes detallados con datos de pacientes y consultas

### 🎨 Interfaz de Usuario
- Diseño moderno y atractivo con gradientes
- Interfaz responsiva (funciona en móviles, tablets, desktop)
- Animaciones suaves y transiciones
- Iconos intuitivos con Bootstrap Icons
- Tema profesional con colores corporativos
- Modal moderno para agregar/editar información

## 🚀 Cómo Usar

### 1. Instalación
```bash
# Clonar el repositorio
git clone https://github.com/evana97971/Telecondatos.git
cd Telecondatos/teleenfermeria

# Abrir en el navegador
open index.html
# o simplemente abre el archivo con tu navegador favorito
```

### 2. Registro e Inicio de Sesión
1. Haz clic en la pestaña "Registrarse"
2. Completa tus datos (nombre, email, usuario, contraseña)
3. Haz clic en "Registrarse"
4. Inicia sesión con tus credenciales

### 3. Gestión de Pacientes
1. Ve a la pestaña "Pacientes"
2. Haz clic en "Nuevo Paciente"
3. Completa el formulario con toda la información
4. Haz clic en "Guardar"
5. Para editar: haz clic en el botón de lápiz
6. Para eliminar: haz clic en el botón de papelera

### 4. Registro de Consultas
1. Ve a la pestaña "Consultas"
2. Haz clic en "Nueva Consulta"
3. Ingresa el DNI del paciente
4. Selecciona el tipo de consulta
5. Completa los detalles (motivo, diagnóstico, tratamiento)
6. Haz clic en "Guardar"

### 5. Análisis de Reportes
1. Ve a la pestaña "Reportes"
2. Visualiza los gráficos y estadísticas
3. Exporta los datos a PDF o Excel según sea necesario

## 💾 Almacenamiento de Datos

Todos los datos se guardan automáticamente en el **Local Storage** del navegador:
- `usuarios` - Información de usuarios registrados
- `pacientes` - Base de datos de pacientes
- `consultas` - Historial de consultas realizadas
- `usuarioActual` - Sesión activa

**Nota:** Los datos se guardan localmente en el navegador. Borrar el historial del navegador eliminará los datos.

## 📱 Compatibilidad

- ✅ Chrome, Edge, Firefox, Safari (versiones modernas)
- ✅ Tablets
- ✅ Dispositivos móviles
- ✅ Computadoras de escritorio

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos (Gradientes, Flexbox, Animaciones)
- **JavaScript (Vanilla)** - Funcionalidad
- **Bootstrap 5** - Framework CSS responsivo
- **Bootstrap Icons** - Iconografía
- **Chart.js** - Gráficos interactivos
- **HTML2PDF** - Exportación a PDF
- **Local Storage API** - Persistencia de datos

## 📊 Estructura de Datos

### Usuario
```javascript
{
  id: timestamp,
  nombre: string,
  email: string,
  usuario: string,
  clave: string,
  fechaRegistro: ISO_STRING
}
```

### Paciente
```javascript
{
  id: timestamp,
  nombre: string,
  dni: string,
  email: string,
  telefono: string,
  edad: number,
  genero: string,
  sangre: string,
  estado: 'activo' | 'inactivo' | 'critico',
  antecedentes: string,
  alergias: string,
  fechaRegistro: ISO_STRING
}
```

### Consulta
```javascript
{
  id: timestamp,
  pacienteId: timestamp,
  pacienteNombre: string,
  dni: string,
  tipo: 'seguimiento' | 'educacion' | 'emergencia' | 'preventiva',
  fecha: datetime,
  prioridad: 'normal' | 'alta' | 'urgente',
  motivo: string,
  diagnostico: string,
  tratamiento: string,
  notas: string,
  estado: string,
  fechaRegistro: ISO_STRING
}
```

## 🎯 Mejoras Futuras

- [ ] Integración con base de datos en la nube (Supabase, Firebase)
- [ ] Sincronización de datos entre dispositivos
- [ ] Notificaciones de citas próximas
- [ ] Historial de cambios y auditoría
- [ ] Reportes avanzados con filtros personalizados
- [ ] Integración de telemedicina (videollamadas)
- [ ] Aplicación móvil nativa (iOS/Android)
- [ ] Sistema de notificaciones por email/SMS
- [ ] Backup automático de datos
- [ ] Autenticación con redes sociales

## 📄 Licencia

Este proyecto está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Creado por [evana97971](https://github.com/evana97971)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes sugerencias o encontras bugs, por favor abre un issue o crea un pull request.

## ⚠️ Nota de Seguridad

Este es un sistema de demostración/desarrollo. Para uso en producción:
- Implementa autenticación segura en el backend
- Usa bases de datos profesionales (PostgreSQL, MongoDB, etc.)
- Cifra contraseñas con bcrypt o similar
- Implementa SSL/TLS para comunicación segura
- Realiza auditorías de seguridad regulares

---

**Hecho con ❤️ para mejorar la atención sanitaria comunitaria**
