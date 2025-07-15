// reportes.js (sin type="module" y sin import)

const crearGrafico = (ctxId, tipo, data, opciones = {}) => {
    const ctx = document.getElementById(ctxId);
    if (!ctx) return;
    new Chart(ctx, {
        type: tipo,
        data: data,
        options: opciones
    });
};

// Gráfico de Ventas
crearGrafico('ventasChart', 'bar', {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
        label: 'Ventas ($)',
        backgroundColor: '#4361ee',
        data: [4500, 5300, 4800, 6100, 5900]
    }]
});

// Gráfico de Ingresos
crearGrafico('ingresosChart', 'line', {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
        label: 'Ingresos ($)',
        borderColor: '#48cae4',
        backgroundColor: '#caf0f8',
        fill: true,
        tension: 0.3,
        data: [2200, 2900, 3100, 2800, 3600]
    }]
});

// Gráfico de Saldos Bancarios
crearGrafico('saldosChart', 'doughnut', {
    labels: ['Caja', 'Banco', 'Otros'],
    datasets: [{
        label: 'Saldos',
        backgroundColor: ['#4361ee', '#4cc9f0', '#adb5bd'],
        data: [2000, 2500, 1000]
    }]
});

// Gráfico de Cuentas por Cobrar
crearGrafico('cobrarChart', 'polarArea', {
    labels: ['Cliente A', 'Cliente B', 'Cliente C'],
    datasets: [{
        label: 'Cuentas por Cobrar',
        backgroundColor: ['#3f37c9', '#4895ef', '#90e0ef'],
        data: [1200, 800, 1800]
    }]
});

// Gráfico de Cuentas por Pagar
crearGrafico('pagarChart', 'pie', {
    labels: ['Proveedor X', 'Proveedor Y', 'Proveedor Z'],
    datasets: [{
        label: 'Cuentas por Pagar',
        backgroundColor: ['#ff6b6b', '#ffa502', '#2ed573'],
        data: [700, 900, 400]
    }]
});
