# Mi Lista de Tareas 📝

Una aplicación moderna y responsiva de lista de tareas con almacenamiento local (Local Storage). Crea, edita, elimina y organiza tus tareas de forma sencilla.

## ✨ Características

- ✅ **Agregar tareas** con descripción, prioridad, categoría y fecha de vencimiento
- 🔍 **Buscar tareas** en tiempo real
- 🏷️ **Filtrar** por estado (todas, completadas, pendientes)
- 📊 **Ordenar** por fecha, prioridad o fecha de creación
- ✏️ **Editar tareas** existentes
- 🗑️ **Eliminar tareas** con confirmación
- 📱 **Diseño responsivo** (funciona en móviles, tablets y escritorios)
- 💾 **Almacenamiento local** - Los datos se guardan automáticamente en el navegador
- 📈 **Estadísticas** - Visualiza el progreso de tus tareas
- 🌙 **Soporte para modo oscuro** (automático según preferencias del sistema)

## 🚀 Cómo usar

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/evana97971/Telecondatos.git
cd Telecondatos
```

2. Abre `index.html` en tu navegador favorito.

### Uso

1. **Crear una tarea:**
   - Escribe la descripción de la tarea
   - Selecciona la prioridad (Baja, Media, Alta)
   - Elige una categoría
   - Opcionalmente, establece una fecha de vencimiento
   - Haz clic en "Agregar Tarea"

2. **Completar una tarea:**
   - Marca la casilla de verificación junto a la tarea
   - La tarea se marcará como completada (con tachado)

3. **Editar una tarea:**
   - Haz clic en el botón de lápiz (✏️)
   - Modifica los detalles en el modal
   - Guarda los cambios

4. **Eliminar una tarea:**
   - Haz clic en el botón de basura (🗑️)
   - Confirma la eliminación

5. **Buscar y filtrar:**
   - Usa la barra de búsqueda para encontrar tareas por palabras clave
   - Filtra por estado (Todas, Pendientes, Completadas)
   - Ordena por fecha, prioridad o fecha de creación

## 🎨 Características del Diseño

- **Interfaz intuitiva** con colores atractivos y degradados
- **Animaciones suaves** para mejor experiencia de usuario
- **Iconos Bootstrap Icons** para una mejor visualización
- **Tarjetas interactivas** con efectos hover
- **Estadísticas en tiempo real** que se actualizan automáticamente
- **Indicadores visuales** para prioridades y categorías
- **Alertas amigables** cuando no hay tareas

## 💾 Almacenamiento Local

Todas tus tareas se guardan automáticamente en el Local Storage del navegador. Esto significa que:
- ✅ Tus tareas se guardan cuando cierres la pestaña
- ✅ Puedes volver en cualquier momento y tus tareas estarán allí
- ✅ No necesitas crear una cuenta ni iniciar sesión
- ⚠️ Los datos se guardan localmente en tu navegador (borrar el historial puede eliminar los datos)

## 📊 Estructura de datos

Cada tarea contiene:
```javascript
{
  id: timestamp,           // ID único
  text: string,           // Descripción de la tarea
  priority: string,       // 'baja', 'media', 'alta'
  category: string,       // 'trabajo', 'personal', 'salud', 'compras', 'otro'
  dueDate: string,        // Fecha en formato YYYY-MM-DD
  completed: boolean,     // Estado de completación
  createdAt: ISO_STRING   // Fecha de creación
}
```

## 🛠️ Tecnologías utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos (Gradientes, Flexbox, Grid, Animaciones)
- **JavaScript (Vanilla)** - Funcionalidad
- **Bootstrap 5** - Framework CSS responsive
- **Bootstrap Icons** - Iconografía
- **Local Storage API** - Persistencia de datos

## 📱 Compatibilidad

- ✅ Chrome, Edge, Firefox, Safari (versiones modernas)
- ✅ Mobile responsivo
- ✅ Tablets
- ✅ Computadoras de escritorio

## 🎯 Mejoras futuras

- [ ] Exportar tareas a PDF
- [ ] Importar tareas desde archivo
- [ ] Sincronización con la nube
- [ ] Notificaciones para tareas vencidas
- [ ] Etiquetas personalizadas
- [ ] Subtareas
- [ ] Historial de cambios
- [ ] Temas personalizables

## 📄 Licencia

Este proyecto está disponible bajo la licencia MIT.

## 👤 Autor

Creado por [evana97971](https://github.com/evana97971)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes sugerencias o encontras bugs, por favor abre un issue.

---

**Hecho con ❤️ para ayudarte a ser más productivo**