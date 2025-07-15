async function cargarClientes() {
    try {
        const respuesta = await fetch('/api/clientes');
        const clientes = await respuesta.json();

        const cuerpoTabla = document.getElementById('cuerpoTablaClientes');
        cuerpoTabla.innerHTML = '';

        clientes.forEach(cliente => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${cliente.id}</td>
                <td contenteditable="false">${cliente.nombre}</td>
                <td contenteditable="false">${cliente.telefono}</td>
                <td>
                    <button class="editar">Editar</button>
                    <button class="guardar" style="display:none;">Guardar</button>
                    <button class="eliminar">Eliminar</button>
                </td>
            `;

            // Funcionalidad de los botones
            const btnEditar = fila.querySelector('.editar');
            const btnGuardar = fila.querySelector('.guardar');
            const btnEliminar = fila.querySelector('.eliminar');
            const tdNombre = fila.children[1];
            const tdTelefono = fila.children[2];

            btnEditar.addEventListener('click', () => {
                tdNombre.contentEditable = true;
                tdTelefono.contentEditable = true;
                btnEditar.style.display = 'none';
                btnGuardar.style.display = 'inline-block';
            });

            btnGuardar.addEventListener('click', async () => {
                const nuevoNombre = tdNombre.textContent.trim();
                const nuevoTelefono = tdTelefono.textContent.trim();

                const res = await fetch(`/api/clientes/${cliente.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre: nuevoNombre, telefono: nuevoTelefono })
                });

                if (res.ok) {
                    tdNombre.contentEditable = false;
                    tdTelefono.contentEditable = false;
                    btnEditar.style.display = 'inline-block';
                    btnGuardar.style.display = 'none';
                } else {
                    alert('Error al guardar los cambios.');
                }
            });

            btnEliminar.addEventListener('click', async () => {
                if (confirm('¿Estás seguro de eliminar este cliente?')) {
                    const res = await fetch(`/api/clientes/${cliente.id}`, {
                        method: 'DELETE'
                    });
                    if (res.ok) {
                        fila.remove();
                    } else {
                        alert('Error al eliminar el cliente.');
                    }
                }
            });

            cuerpoTabla.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar clientes:', error);
    }
}

document.addEventListener('DOMContentLoaded', cargarClientes);

