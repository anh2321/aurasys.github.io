// Este script maneja el comportamiento del campo "Forma de Pago"
export function actualizarFormaPago() {
    const formaPago = document.getElementById('forma-pago').value;
    const saldo = document.getElementById('saldo-label');
    const efectivo = document.getElementById('efectivo');

    if (formaPago === 'cxc') {
        saldo.style.display = 'flex';
        efectivo.disabled = true;

        // Aquí podrías consultar el saldo desde la API si ya tienes endpoint
        const telefono = document.getElementById('cliente-telefono').value;
        if (telefono.trim()) {
            fetch(`/api/clientes/${telefono}`)
                .then(res => res.json())
                .then(data => {
                    document.getElementById('saldo-cliente').value = data.saldo?.toFixed(2) ?? '0.00';
                })
                .catch(err => {
                    console.error('Error al obtener saldo:', err);
                    document.getElementById('saldo-cliente').value = '0.00';
                });
        }

    } else {
        saldo.style.display = 'none';
        efectivo.disabled = false;
        document.getElementById('saldo-cliente').value = '';
    }
}
