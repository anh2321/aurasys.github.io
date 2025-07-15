document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    configurarBotonGrabar();
    configurarEventosDinamicos();
});

function cargarProductos() {
    fetch("/api/productos")
        .then((res) => res.json())
        .then((productos) => {
            document.querySelectorAll(".producto-select").forEach((select) => {
                select.innerHTML = "";
                productos.forEach((producto) => {
                    const option = document.createElement("option");
                    option.value = producto.id; // usamos ID, no nombre
                    option.textContent = producto.nombre;
                    option.dataset.nombre = producto.nombre;
                    option.dataset.codigo = producto.codigo;
                    option.dataset.precio = producto.precioUnitario;
                    select.appendChild(option);
                });
                actualizarProductoFila(select);
            });
        });
}

function actualizarProductoFila(select) {
    const tr = select.closest("tr");
    const selectedOption = select.options[select.selectedIndex];

    const precio = parseFloat(selectedOption.dataset.precio) || 0;
    const codigo = selectedOption.dataset.codigo || "";

    tr.querySelector(".codigo").value = codigo;
    tr.querySelector(".precio").value = precio.toFixed(2);

    calcularFila(tr);
}

function calcularFila(tr) {
    const cantidad = parseFloat(tr.querySelector(".cantidad").value) || 0;
    const precio = parseFloat(tr.querySelector(".precio").value) || 0;
    const descuento = parseFloat(tr.querySelector(".descuento").value) || 0;
    const iva = parseFloat(tr.querySelector(".iva").value) || 0;

    const bruto = cantidad * precio;
    const neto = bruto - descuento;
    const totalConIva = neto + (neto * iva / 100);

    tr.querySelector(".total-neto").value = totalConIva.toFixed(2);

    calcularTotales();
}

function calcularTotales() {
    let subtotal = 0;
    let totalIva = 0;

    document.querySelectorAll("#body-productos tr").forEach((tr) => {
        const cantidad = parseFloat(tr.querySelector(".cantidad").value) || 0;
        const precio = parseFloat(tr.querySelector(".precio").value) || 0;
        const descuento = parseFloat(tr.querySelector(".descuento").value) || 0;
        const iva = parseFloat(tr.querySelector(".iva").value) || 0;

        const bruto = cantidad * precio;
        const neto = bruto - descuento;
        const ivaValor = neto * (iva / 100);

        subtotal += neto;
        totalIva += ivaValor;
    });

    const total = subtotal + totalIva;
    const efectivo = parseFloat(document.getElementById("efectivo").value) || 0;
    const cambio = efectivo - total;

    document.getElementById("subtotal").value = subtotal.toFixed(2);
    document.getElementById("iva").value = totalIva.toFixed(2);
    document.getElementById("total").value = total.toFixed(2);
    document.getElementById("cambio").value = cambio >= 0 ? cambio.toFixed(2) : "0.00";
}

function configurarBotonGrabar() {
    document.getElementById("btnGrabar").addEventListener("click", async () => {
        const clienteNombre = document.getElementById("cliente-nombre").value;
        const clienteTelefono = document.getElementById("cliente-telefono").value;
        const formaPago = document.getElementById("forma-pago").value;
        const vendedor = "ADS";
        const administrador = "Administrador";

        const total = parseFloat(document.getElementById("total").value) || 0;
        const efectivo = parseFloat(document.getElementById("efectivo").value) || 0;
        const cambio = parseFloat(document.getElementById("cambio").value) || 0;
        const saldo = total - efectivo;

        const productos = [];
        document.querySelectorAll("#body-productos tr").forEach((tr) => {
            const select = tr.querySelector(".producto-select");
            const selectedOption = select.options[select.selectedIndex];
            const producto = {
                productoId: parseInt(select.value),
                cantidad: parseFloat(tr.querySelector(".cantidad").value),
                precioUnitario: parseFloat(tr.querySelector(".precio").value),
                descuento: parseFloat(tr.querySelector(".descuento").value),
                ivaPorcentaje: parseFloat(tr.querySelector(".iva").value),
            };
            productos.push(producto);
        });

        const factura = {
            cliente: {
                nombre: clienteNombre,
                telefono: clienteTelefono,
            },
            formaPago,
            vendedor,
            administrador,
            total,
            efectivo,
            cambio,
            saldo,
            productos,
        };

        try {
            const res = await fetch("/api/facturas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(factura),
            });

            if (res.ok) {
                alert("✅ Factura registrada exitosamente");
                location.reload();
            } else {
                const data = await res.json();
                console.error(data);
                alert("❌ Error al grabar factura");
            }
        } catch (err) {
            console.error(err);
            alert("❌ Error al conectar con el servidor");
        }
    });
}

function agregarFila() {
    const tbody = document.getElementById("body-productos");
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td><input class="codigo" type="text" disabled /></td>
    <td><select class="producto-select"></select></td>
    <td><input type="number" class="cantidad" name="cantidad" min="1" value="1" /></td>
    <td><input type="number" class="precio" step="0.01" readonly /></td>
    <td><input type="number" class="descuento" value="0" step="0.01" /></td>
    <td>
        <select class="iva">
            <option value="0">0%</option>
            <option value="12">12%</option>
            <option value="15">15%</option>
        </select>
    </td>
    <td><input type="number" class="total-neto" readonly /></td>
    <td><input type="text" value="PRINC" disabled /></td>
    <td><button type="button" onclick="eliminarFila(this)">✖</button></td>
  `;
    tbody.appendChild(tr);
    cargarProductos();
    configurarEventosDinamicos();
}

function eliminarFila(button) {
    button.closest("tr").remove();
    calcularTotales();
}

function eliminarUltimaFila() {
    const filas = document.querySelectorAll("#body-productos tr");
    if (filas.length > 1) {
        filas[filas.length - 1].remove();
        calcularTotales();
    }
}

function configurarEventosDinamicos() {
    document.querySelectorAll("#body-productos").forEach((tbody) => {
        tbody.addEventListener("change", (e) => {
            if (
                e.target.classList.contains("producto-select") ||
                e.target.classList.contains("cantidad") ||
                e.target.classList.contains("descuento") ||
                e.target.classList.contains("iva")
            ) {
                const tr = e.target.closest("tr");
                if (e.target.classList.contains("producto-select")) {
                    actualizarProductoFila(e.target);
                } else {
                    calcularFila(tr);
                }
            }
        });
    });

    document.getElementById("efectivo").addEventListener("input", calcularTotales);
}
