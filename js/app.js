// TodoApp - Aplicación de Lista de Tareas con Local Storage

class TodoApp {
  constructor() {
    this.tasks = [];
    this.editingId = null;
    this.init();
  }

  init() {
    this.loadTasks();
    this.setupEventListeners();
    this.render();
  }

  // Local Storage
  loadTasks() {
    const saved = localStorage.getItem('tasks');
    this.tasks = saved ? JSON.parse(saved) : [];
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Event Listeners
  setupEventListeners() {
    // Formulario de nueva tarea
    document.getElementById('taskForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTask();
    });

    // Búsqueda
    document.getElementById('searchInput').addEventListener('input', () => {
      this.render();
    });

    // Filtros
    document.getElementById('filterSelect').addEventListener('change', () => {
      this.render();
    });

    // Ordenamiento
    document.getElementById('sortSelect').addEventListener('change', () => {
      this.render();
    });

    // Modal de edición
    document.getElementById('saveEditBtn').addEventListener('click', () => {
      this.saveEdit();
    });
  }

  // CRUD Operations
  addTask() {
    const input = document.getElementById('taskInput');
    const priority = document.getElementById('prioritySelect').value;
    const category = document.getElementById('categorySelect').value;
    const dueDate = document.getElementById('dueDateInput').value;

    if (!input.value.trim()) return;

    const task = {
      id: Date.now(),
      text: input.value,
      priority,
      category,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasks.push(task);
    this.saveTasks();
    this.render();

    // Limpiar formulario
    input.value = '';
    document.getElementById('prioritySelect').value = 'media';
    document.getElementById('categorySelect').value = 'personal';
    document.getElementById('dueDateInput').value = '';
    input.focus();
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.render();
    }
  }

  deleteTask(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.saveTasks();
      this.render();
    }
  }

  editTask(id) {
    this.editingId = id;
    const task = this.tasks.find(t => t.id === id);

    if (task) {
      document.getElementById('editTaskInput').value = task.text;
      document.getElementById('editPriority').value = task.priority;
      document.getElementById('editCategory').value = task.category;
      document.getElementById('editDueDate').value = task.dueDate;

      const modal = new bootstrap.Modal(document.getElementById('editModal'));
      modal.show();
    }
  }

  saveEdit() {
    const task = this.tasks.find(t => t.id === this.editingId);
    if (task) {
      task.text = document.getElementById('editTaskInput').value;
      task.priority = document.getElementById('editPriority').value;
      task.category = document.getElementById('editCategory').value;
      task.dueDate = document.getElementById('editDueDate').value;

      this.saveTasks();
      this.render();

      bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    }
  }

  // Filtrado y búsqueda
  getFilteredTasks() {
    let filtered = this.tasks;

    // Búsqueda
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.text.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro de estado
    const filterValue = document.getElementById('filterSelect').value;
    if (filterValue === 'completadas') {
      filtered = filtered.filter(t => t.completed);
    } else if (filterValue === 'pendientes') {
      filtered = filtered.filter(t => !t.completed);
    }

    // Ordenamiento
    const sortValue = document.getElementById('sortSelect').value;
    filtered.sort((a, b) => {
      switch (sortValue) {
        case 'fecha-asc':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'fecha-desc':
          if (!a.dueDate) return -1;
          if (!b.dueDate) return 1;
          return new Date(b.dueDate) - new Date(a.dueDate);
        case 'prioridad':
          const priorityOrder = { 'alta': 3, 'media': 2, 'baja': 1 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        case 'creacion':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    return filtered;
  }

  // Renderización
  render() {
    const filtered = this.getFilteredTasks();
    const tasksList = document.getElementById('tasksList');

    if (filtered.length === 0) {
      const filter = document.getElementById('filterSelect').value;
      const search = document.getElementById('searchInput').value;

      let message = 'No hay tareas aún. ¡Crea una nueva!';
      if (search) message = 'No se encontraron tareas que coincidan con la búsqueda.';
      if (filter === 'completadas') message = 'No hay tareas completadas aún.';
      if (filter === 'pendientes') message = 'No hay tareas pendientes. ¡Excelente!';

      tasksList.innerHTML = `
        <div class="alert alert-info text-center">
          <i class="bi bi-inbox"></i> ${message}
        </div>
      `;
    } else {
      tasksList.innerHTML = filtered.map(task => this.createTaskElement(task)).join('');
      this.attachTaskListeners();
    }

    this.updateStats();
  }

  createTaskElement(task) {
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
    const dueDateClass = isOverdue ? 'overdue' : '';

    let dueDateHtml = '';
    if (task.dueDate) {
      const date = new Date(task.dueDate);
      const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      dueDateHtml = `
        <span class="due-date ${dueDateClass}">
          <i class="bi bi-calendar-event"></i>
          ${formattedDate}
        </span>
      `;
    }

    return `
      <div class="task-item ${task.completed ? 'completed' : ''}">
        <input 
          type="checkbox" 
          class="task-checkbox" 
          ${task.completed ? 'checked' : ''}
          data-id="${task.id}"
        >
        <div class="task-content">
          <div class="task-text">${this.escapeHtml(task.text)}</div>
          <div class="task-meta">
            <span class="task-badge priority-${task.priority}">
              <i class="bi bi-exclamation-circle"></i>
              ${this.capitalizarPrioridad(task.priority)}
            </span>
            <span class="task-badge category-badge">
              <i class="bi bi-tag"></i>
              ${this.capitalizarCategoria(task.category)}
            </span>
            ${dueDateHtml}
          </div>
        </div>
        <div class="task-actions">
          <button class="task-btn edit" data-id="${task.id}" title="Editar">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="task-btn delete" data-id="${task.id}" title="Eliminar">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    `;
  }

  attachTaskListeners() {
    // Checkboxes
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        this.toggleTask(parseInt(e.target.dataset.id));
      });
    });

    // Botones de edición
    document.querySelectorAll('.task-btn.edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.editTask(parseInt(e.currentTarget.dataset.id));
      });
    });

    // Botones de eliminación
    document.querySelectorAll('.task-btn.delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.deleteTask(parseInt(e.currentTarget.dataset.id));
      });
    });
  }

  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
  }

  // Utilidades
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  capitalizarPrioridad(priority) {
    const map = {
      'alta': 'Alta',
      'media': 'Media',
      'baja': 'Baja'
    };
    return map[priority] || priority;
  }

  capitalizarCategoria(category) {
    const map = {
      'trabajo': 'Trabajo',
      'personal': 'Personal',
      'salud': 'Salud',
      'compras': 'Compras',
      'otro': 'Otro'
    };
    return map[category] || category;
  }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});