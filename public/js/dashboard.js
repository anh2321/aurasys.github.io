// ⛔ Protección del dashboard: esto debe ir al principio
const usuario = localStorage.getItem("usuario");
const cargo = localStorage.getItem("cargo");

if (!usuario || !cargo) {
    alert("Debes iniciar sesión primero");
    window.location.href = "/views/index.html";
}

// ✅ Cerrar sesión
const cerrarBtn = document.getElementById("cerrarSesion");
if (cerrarBtn) {
    cerrarBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "/views/index.html";
    });
}

// BAR
new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
        labels: ['Ingresos', 'Costos', 'Gastos'],
        datasets: [{
            label: 'Totales ($)',
            data: [27897.96, 21500.00, 3950.94],
            backgroundColor: ['#2ecc71', '#f39c12', '#e74c3c']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: 'Ingresos vs Costos vs Gastos' }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// PIE
new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
        labels: ['Producto A', 'Producto B', 'Producto C'],
        datasets: [{
            data: [45, 30, 25],
            backgroundColor: ['#3498db', '#9b59b6', '#1abc9c']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: 'Distribución de Ventas (%)' }
        }
    }
});

// LINE
new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
            label: 'Ventas Mensuales',
            data: [3000, 5000, 4000, 7000, 6000, 8000],
            borderColor: '#2980b9',
            fill: false,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: 'Ventas por Mes' }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// RADAR
new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: {
        labels: ['Ventas', 'Clientes', 'Proveedores', 'Inventario', 'Cobros'],
        datasets: [{
            label: 'Módulo A',
            data: [90, 80, 70, 60, 85],
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: '#3498db',
            pointBackgroundColor: '#3498db'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: 'Comparación de Módulos' }
        }
    }
});

// DOUGHNUT
new Chart(document.getElementById('doughnutChart'), {
    type: 'doughnut',
    data: {
        labels: ['Ventas Local', 'Ventas Online'],
        datasets: [{
            data: [60, 40],
            backgroundColor: ['#1abc9c', '#e67e22']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: 'Distribución por Canal' }
        }
    }
});

// POLAR
new Chart(document.getElementById('polarChart'), {
    type: 'polarArea',
    data: {
        labels: ['Ventas', 'Ingresos', 'Gastos', 'Cobros'],
        datasets: [{
            data: [4000, 6000, 3000, 5000],
            backgroundColor: ['#9b59b6', '#f1c40f', '#e67e22', '#16a085']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: 'Comparativa Polar' }
        }
    }
});

// AREA (línea con relleno)
new Chart(document.getElementById('areaChart'), {
    type: 'line',
    data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
            label: 'Utilidad Neta',
            data: [1500, 2200, 1800, 2400, 2600, 3000],
            backgroundColor: 'rgba(46, 204, 113, 0.2)',
            borderColor: '#2ecc71',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: 'Utilidad Neta Mensual' }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// STACKED BAR
new Chart(document.getElementById('stackedChart'), {
    type: 'bar',
    data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            { label: 'Ventas', data: [5000, 7000, 6500, 8000], backgroundColor: '#3498db' },
            { label: 'Gastos', data: [2000, 2500, 2200, 2600], backgroundColor: '#e74c3c' }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: 'Ventas vs Gastos por Trimestre' }
        },
        scales: {
            x: { stacked: true },
            y: { stacked: true, beginAtZero: true }
        }
    }
});
