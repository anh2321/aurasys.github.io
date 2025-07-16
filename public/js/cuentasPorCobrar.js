document.addEventListener('DOMContentLoaded', async () => {
    const tabla = document.getElementById('tabla-cuentas');
    const cuerpoTabla = document.getElementById('cuerpo-cuentas');
    const mensaje = document.getElementById('mensaje-error');

    try {
        const res = await fetch('https://aurasys-production.up.railway.app/api/cuentas-por-cobrar');
        const cuentas = await res.json();

        if (!Array.isArray(cuentas) || cuentas.length === 0) {
            mensaje.textContent = 'No hay cuentas por cobrar registradas.';
            tabla.style.display = 'none';
            return;
        }

        cuentas.forEach(cuenta => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
        <td>${cuenta.id}</td>
        <td>${cuenta.cliente?.nombre || 'Sin nombre'}</td>
        <td>${cuenta.total}</td>
        <td>${new Date(parseInt(cuenta.fechaEmision)).toLocaleDateString()}</td>
        <td>${cuenta.estado}</td>
      `;

            cuerpoTabla.appendChild(fila);
        });

        mensaje.textContent = '';
        tabla.style.display = 'table';
    } catch (error) {
        console.error('Error al cargar cuentas:', error);
        mensaje.textContent = 'Error al cargar las cuentas por cobrar.';
        tabla.style.display = 'none';
    }
});
