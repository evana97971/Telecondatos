// Aplicación de Teleenfermería Comunitaria

class TeleenfermiaApp {
  constructor() {
    this.usuarioActual = null;
    this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    this.pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    this.consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.verificarSesion();
  }

  // ==================== AUTENTICACIÓN ====================
  setupEventListeners() {
    // Login
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.login();
    });

    // Registro
    document.getElementById('registerForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.register();
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
      this.logout();
    });

    // Pacientes
    document.getElementById('savePacienteBtn').addEventListener('click', () => {
      this.guardarPaciente();
    });

    document.getElementById('searchPaciente').addEventListener('input', () => {
      this.mostrarPacientes();
    });

    // Consultas
    document.getElementById('saveConsultaBtn').addEventListener('click', () => {
      this.guardarConsulta();
    });

    document.getElementById('searchConsulta').addEventListener('input', () => {
      this.mostrarConsultas();
    });

    document.getElementById('filterConsulta').addEventListener('change', () => {
      this.mostrarConsultas();
    });

    // Exportar
    document.getElementById('exportPDF').addEventListener('click', () => {
      this.exportarPDF();
    });

    document.getElementById('exportExcel').addEventListener('click', () => {
      this.exportarExcel();
    });
  }

  login() {
    const usuario = document.getElementById('loginUser').value;
    const clave = document.getElementById('loginPass').value;

    const user = this.usuarios.find(u => u.usuario === usuario && u.clave === clave);

    if (user) {
      this.usuarioActual = user;
      localStorage.setItem('usuarioActual', JSON.stringify(user));
      this.mostrarPanel();
    } else {
      const msg = document.getElementById('loginMessage');
      msg.textContent = '❌ Usuario o contraseña incorrectos.';
      msg.style.display = 'block';
    }
  }

  register() {
    const nombre = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const usuario = document.getElementById('registerUser').value;
    const clave = document.getElementById('registerPass').value;
    const clave2 = document.getElementById('registerPass2').value;

    if (clave !== clave2) {
      const msg = document.getElementById('registerMessage');
      msg.className = 'alert alert-danger';
      msg.textContent = '❌ Las contraseñas no coinciden.';
      msg.style.display = 'block';
      return;
    }

    if (clave.length < 6) {
      const msg = document.getElementById('registerMessage');
      msg.className = 'alert alert-danger';
      msg.textContent = '❌ La contraseña debe tener al menos 6 caracteres.';
      msg.style.display = 'block';
      return;
    }

    if (this.usuarios.some(u => u.usuario === usuario)) {
      const msg = document.getElementById('registerMessage');
      msg.className = 'alert alert-danger';
      msg.textContent = '❌ El usuario ya existe.';
      msg.style.display = 'block';
      return;
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      email,
      usuario,
      clave,
      fechaRegistro: new Date().toISOString()
    };

    this.usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

    const msg = document.getElementById('registerMessage');
    msg.className = 'alert alert-success';
    msg.textContent = '✅ Registro exitoso. Ahora puedes iniciar sesión.';
    msg.style.display = 'block';

    setTimeout(() => {
      document.getElementById('register-tab').click();
      document.getElementById('loginUser').focus();
    }, 1500);
  }

  logout() {
    this.usuarioActual = null;
    localStorage.removeItem('usuarioActual');
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('mainPanel').style.display = 'none';
    document.getElementById('loginForm').reset();
  }

  verificarSesion() {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      this.usuarioActual = JSON.parse(usuarioGuardado);
      this.mostrarPanel();
    }
  }

  mostrarPanel() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('mainPanel').style.display = 'block';
    document.getElementById('usuarioActual').textContent = `👤 ${this.usuarioActual.nombre}`;
    this.actualizarDashboard();
    this.mostrarPacientes();
    this.mostrarConsultas();
  }

  // ==================== PACIENTES ====================
  guardarPaciente() {
    const paciente = {
      id: Date.now(),
      nombre: document.getElementById('pacNombre').value,
      dni: document.getElementById('pacDNI').value,
      email: document.getElementById('pacEmail').value,
      telefono: document.getElementById('pacTelefono').value,
      edad: parseInt(document.getElementById('pacEdad').value),
      genero: document.getElementById('pacGenero').value,
      sangre: document.getElementById('pacSangre').value,
      estado: document.getElementById('pacEstado').value,
      antecedentes: document.getElementById('pacAntecedentes').value,
      alergias: document.getElementById('pacAlergias').value,
      fechaRegistro: new Date().toISOString()
    };

    // Validar DNI único
    if (this.pacientes.some(p => p.dni === paciente.dni)) {
      alert('⚠️ Este DNI ya está registrado.');
      return;
    }

    this.pacientes.push(paciente);
    localStorage.setItem('pacientes', JSON.stringify(this.pacientes));
    bootstrap.Modal.getInstance(document.getElementById('modalPaciente')).hide();
    document.getElementById('formPaciente').reset();
    this.mostrarPacientes();
    this.actualizarDashboard();
  }

  mostrarPacientes() {
    const searchTerm = document.getElementById('searchPaciente').value.toLowerCase();
    const filtrados = this.pacientes.filter(p =>
      p.nombre.toLowerCase().includes(searchTerm) ||
      p.dni.toLowerCase().includes(searchTerm) ||
      p.email.toLowerCase().includes(searchTerm)
    );

    const tbody = document.querySelector('#tablaPacientes tbody');
    tbody.innerHTML = filtrados.map(p => `
      <tr>
        <td><strong>${p.nombre}</strong></td>
        <td>${p.dni}</td>
        <td>${p.email}</td>
        <td>${p.edad} años</td>
        <td>${p.telefono}</td>
        <td>
          <span class="badge ${p.estado === 'critico' ? 'bg-danger' : p.estado === 'activo' ? 'bg-success' : 'bg-warning'}">
            ${p.estado}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-info" onclick="app.editarPaciente(${p.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="app.eliminarPaciente(${p.id})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  editarPaciente(id) {
    const paciente = this.pacientes.find(p => p.id === id);
    if (paciente) {
      // Llenar el formulario con los datos
      document.getElementById('pacNombre').value = paciente.nombre;
      document.getElementById('pacDNI').value = paciente.dni;
      document.getElementById('pacEmail').value = paciente.email;
      document.getElementById('pacTelefono').value = paciente.telefono;
      document.getElementById('pacEdad').value = paciente.edad;
      document.getElementById('pacGenero').value = paciente.genero;
      document.getElementById('pacSangre').value = paciente.sangre;
      document.getElementById('pacEstado').value = paciente.estado;
      document.getElementById('pacAntecedentes').value = paciente.antecedentes;
      document.getElementById('pacAlergias').value = paciente.alergias;
      
      // Actualizar el guardar para actualizar en lugar de crear
      const btn = document.getElementById('savePacienteBtn');
      btn.onclick = () => {
        paciente.nombre = document.getElementById('pacNombre').value;
        paciente.email = document.getElementById('pacEmail').value;
        paciente.telefono = document.getElementById('pacTelefono').value;
        paciente.edad = parseInt(document.getElementById('pacEdad').value);
        paciente.genero = document.getElementById('pacGenero').value;
        paciente.sangre = document.getElementById('pacSangre').value;
        paciente.estado = document.getElementById('pacEstado').value;
        paciente.antecedentes = document.getElementById('pacAntecedentes').value;
        paciente.alergias = document.getElementById('pacAlergias').value;
        
        localStorage.setItem('pacientes', JSON.stringify(this.pacientes));
        bootstrap.Modal.getInstance(document.getElementById('modalPaciente')).hide();
        document.getElementById('formPaciente').reset();
        this.mostrarPacientes();
        this.actualizarDashboard();
        btn.onclick = () => this.guardarPaciente();
      };
      
      const modal = new bootstrap.Modal(document.getElementById('modalPaciente'));
      modal.show();
    }
  }

  eliminarPaciente(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este paciente?')) {
      this.pacientes = this.pacientes.filter(p => p.id !== id);
      localStorage.setItem('pacientes', JSON.stringify(this.pacientes));
      this.mostrarPacientes();
      this.actualizarDashboard();
    }
  }

  // ==================== CONSULTAS ====================
  guardarConsulta() {
    const dni = document.getElementById('conDNI').value;
    const paciente = this.pacientes.find(p => p.dni === dni);

    if (!paciente) {
      alert('⚠️ Paciente no encontrado. Registra el paciente primero.');
      return;
    }

    const consulta = {
      id: Date.now(),
      pacienteId: paciente.id,
      pacienteNombre: paciente.nombre,
      dni: dni,
      tipo: document.getElementById('conTipo').value,
      fecha: document.getElementById('conFecha').value,
      prioridad: document.getElementById('conPrioridad').value,
      motivo: document.getElementById('conMotivo').value,
      diagnostico: document.getElementById('conDiagnostico').value,
      tratamiento: document.getElementById('conTratamiento').value,
      notas: document.getElementById('conNotas').value,
      estado: 'completada',
      fechaRegistro: new Date().toISOString()
    };

    this.consultas.push(consulta);
    localStorage.setItem('consultas', JSON.stringify(this.consultas));
    bootstrap.Modal.getInstance(document.getElementById('modalConsulta')).hide();
    document.getElementById('formConsulta').reset();
    this.mostrarConsultas();
    this.actualizarDashboard();
  }

  mostrarConsultas() {
    const searchTerm = document.getElementById('searchConsulta').value.toLowerCase();
    const filterTipo = document.getElementById('filterConsulta').value;

    let filtrados = this.consultas.filter(c =>
      (c.pacienteNombre.toLowerCase().includes(searchTerm) || c.dni.includes(searchTerm)) &&
      (!filterTipo || c.tipo === filterTipo)
    );

    // Ordenar por fecha descendente
    filtrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    const tbody = document.querySelector('#tablaConsultas tbody');
    tbody.innerHTML = filtrados.map(c => `
      <tr>
        <td><strong>${c.pacienteNombre}</strong></td>
        <td>${c.dni}</td>
        <td>
          <span class="badge ${c.tipo === 'emergencia' ? 'bg-danger' : c.tipo === 'preventiva' ? 'bg-success' : c.tipo === 'educacion' ? 'bg-info' : 'bg-warning'}">
            ${c.tipo}
          </span>
        </td>
        <td>${c.motivo.substring(0, 50)}...</td>
        <td>${new Date(c.fecha).toLocaleDateString()}</td>
        <td><span class="badge bg-success">Completada</span></td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="app.verConsulta(${c.id})">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="app.eliminarConsulta(${c.id})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  verConsulta(id) {
    const consulta = this.consultas.find(c => c.id === id);
    if (consulta) {
      alert(`Consulta de ${consulta.pacienteNombre}\n\nTipo: ${consulta.tipo}\nMotivo: ${consulta.motivo}\nDiagnóstico: ${consulta.diagnostico}\nTratamiento: ${consulta.tratamiento}`);
    }
  }

  eliminarConsulta(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta consulta?')) {
      this.consultas = this.consultas.filter(c => c.id !== id);
      localStorage.setItem('consultas', JSON.stringify(this.consultas));
      this.mostrarConsultas();
      this.actualizarDashboard();
    }
  }

  // ==================== DASHBOARD ====================
  actualizarDashboard() {
    // Estadísticas básicas
    document.getElementById('totalPacientes').textContent = this.pacientes.length;
    
    const hoy = new Date().toDateString();
    const consultasHoy = this.consultas.filter(c => new Date(c.fecha).toDateString() === hoy).length;
    document.getElementById('consultasHoy').textContent = consultasHoy;
    
    const casosCriticos = this.pacientes.filter(p => p.estado === 'critico').length;
    document.getElementById('casosCriticos').textContent = casosCriticos;
    
    const tasaSeguimiento = this.pacientes.length > 0 
      ? Math.round((this.consultas.length / (this.pacientes.length * 4)) * 100)
      : 0;
    document.getElementById('tasaSeguimiento').textContent = tasaSeguimiento + '%';

    this.actualizarGraficos();
  }

  actualizarGraficos() {
    // Gráfico de Consultas por Tipo
    const tiposCounts = {
      seguimiento: 0,
      educacion: 0,
      emergencia: 0,
      preventiva: 0
    };

    this.consultas.forEach(c => {
      if (tiposCounts[c.tipo] !== undefined) {
        tiposCounts[c.tipo]++;
      }
    });

    const ctxTipo = document.getElementById('chartConsultasTipo')?.getContext('2d');
    if (ctxTipo && window.tipoChart) {
      window.tipoChart.destroy();
    }
    if (ctxTipo) {
      window.tipoChart = new Chart(ctxTipo, {
        type: 'doughnut',
        data: {
          labels: ['Seguimiento', 'Educación', 'Emergencia', 'Preventiva'],
          datasets: [{
            data: [tiposCounts.seguimiento, tiposCounts.educacion, tiposCounts.emergencia, tiposCounts.preventiva],
            backgroundColor: ['#0078d7', '#00a86b', '#dc3545', '#ffc107']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }

    // Gráfico de Distribución de Edades
    const gruposEdad = {
      '0-17': 0,
      '18-30': 0,
      '31-50': 0,
      '51-70': 0,
      '70+': 0
    };

    this.pacientes.forEach(p => {
      if (p.edad < 18) gruposEdad['0-17']++;
      else if (p.edad <= 30) gruposEdad['18-30']++;
      else if (p.edad <= 50) gruposEdad['31-50']++;
      else if (p.edad <= 70) gruposEdad['51-70']++;
      else gruposEdad['70+']++;
    });

    const ctxEdad = document.getElementById('chartEdades')?.getContext('2d');
    if (ctxEdad && window.edadChart) {
      window.edadChart.destroy();
    }
    if (ctxEdad) {
      window.edadChart = new Chart(ctxEdad, {
        type: 'pie',
        data: {
          labels: Object.keys(gruposEdad),
          datasets: [{
            data: Object.values(gruposEdad),
            backgroundColor: ['#667eea', '#764ba2', '#0078d7', '#00a86b', '#dc3545']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }

    // Gráfico de Tendencias
    const consultasPorMes = {};
    const hoy = new Date();
    for (let i = 6; i >= 0; i--) {
      const fecha = new Date(hoy);
      fecha.setDate(fecha.getDate() - i);
      const mes = fecha.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
      consultasPorMes[mes] = 0;
    }

    this.consultas.forEach(c => {
      const fecha = new Date(c.fecha);
      const mes = fecha.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
      if (consultasPorMes[mes] !== undefined) {
        consultasPorMes[mes]++;
      }
    });

    const ctxTendencias = document.getElementById('chartTendencias')?.getContext('2d');
    if (ctxTendencias && window.tendenciasChart) {
      window.tendenciasChart.destroy();
    }
    if (ctxTendencias) {
      window.tendenciasChart = new Chart(ctxTendencias, {
        type: 'line',
        data: {
          labels: Object.keys(consultasPorMes),
          datasets: [{
            label: 'Consultas',
            data: Object.values(consultasPorMes),
            borderColor: '#0078d7',
            backgroundColor: 'rgba(0, 120, 215, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }

    // Top Pacientes
    const topPacientes = this.consultas.reduce((acc, c) => {
      const existing = acc.find(p => p.id === c.pacienteId);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ id: c.pacienteId, nombre: c.pacienteNombre, count: 1 });
      }
      return acc;
    }, []).sort((a, b) => b.count - a.count).slice(0, 5);

    const topDiv = document.getElementById('topPacientes');
    topDiv.innerHTML = topPacientes.map(p => `
      <div class="mb-2">
        <div class="d-flex justify-content-between">
          <span>${p.nombre}</span>
          <span class="badge bg-primary">${p.count} consultas</span>
        </div>
        <div class="progress" style="height: 10px;">
          <div class="progress-bar" style="width: ${(p.count / Math.max(...topPacientes.map(x => x.count))) * 100}%"></div>
        </div>
      </div>
    `).join('');
  }

  // ==================== EXPORTAR ====================
  exportarPDF() {
    const elemento = document.createElement('div');
    elemento.innerHTML = `
      <h2>Reporte de Teleenfermería Comunitaria</h2>
      <p>Fecha: ${new Date().toLocaleDateString()}</p>
      <h3>Resumen</h3>
      <p>Total Pacientes: ${this.pacientes.length}</p>
      <p>Total Consultas: ${this.consultas.length}</p>
      <h3>Pacientes</h3>
      <table border="1" cellpadding="10">
        <tr><th>Nombre</th><th>DNI</th><th>Edad</th><th>Estado</th></tr>
        ${this.pacientes.map(p => `<tr><td>${p.nombre}</td><td>${p.dni}</td><td>${p.edad}</td><td>${p.estado}</td></tr>`).join('')}
      </table>
    `;
    const opt = { margin: 10, filename: 'reporte_teleenfermeria.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' } };
    html2pdf().set(opt).from(elemento).save();
  }

  exportarExcel() {
    let csv = 'Nombre,DNI,Email,Edad,Teléfono,Estado\n';
    this.pacientes.forEach(p => {
      csv += `"${p.nombre}","${p.dni}","${p.email}",${p.edad},"${p.telefono}","${p.estado}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pacientes_teleenfermeria.csv';
    a.click();
  }
}

// Inicializar la aplicación
const app = new TeleenfermiaApp();
