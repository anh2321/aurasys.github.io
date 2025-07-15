document.addEventListener("DOMContentLoaded", () => {
    cargarInformes();
    cargarOpcionesRelacionado();

    const form = document.getElementById("formInforme");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const tipo = document.getElementById("tipo").value;
        const descripcion = document.getElementById("descripcion").value;
        const monto = parseFloat(document.getElementById("monto").value);
        const relacionadoId = parseInt(document.getElementById("relacionadoId").value);

        const payload =
            tipo === "ingreso"
                ? { tipo, descripcion, monto, clienteId: relacionadoId }
                : { tipo, descripcion, monto, proveedorId: relacionadoId };

        try {
            const response = await fetch("/api/informes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Error al guardar informe");

            form.reset();
            cargarInformes();
        } catch (err) {
            console.error("❌ Error al guardar informe:", err);
        }
    });

    // Exportar a PDF
    const btnExportar = document.querySelector(".btn-exportar");
    if (btnExportar) {
        btnExportar.addEventListener("click", () => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.text("Informe de Ingresos y Gastos", 14, 15);

            const tabla = document.getElementById("tablaInformes");
            const filas = [...tabla.querySelectorAll("tbody tr")].map(row =>
                [...row.children].map(cell => cell.textContent.trim())
            );

            doc.autoTable({
                head: [["Tipo", "Descripción", "Relacionado con", "Fecha", "Monto"]],
                body: filas,
                startY: 20,
                theme: "striped",
                styles: { fontSize: 10 },
                headStyles: { fillColor: [44, 52, 71] }
            });

            doc.save("Informe_Ingresos_Gastos.pdf");
        });
    }
});

async function cargarInformes() {
    try {
        const res = await fetch("/api/informes");
        const data = await res.json();
        const tbody = document.querySelector("#tablaInformes tbody");
        tbody.innerHTML = "";

        data.forEach((informe) => {
            const tr = document.createElement("tr");

            const relacionado =
                informe.cliente?.nombre ||
                informe.proveedor?.nombre ||
                "Desconocido";

            tr.innerHTML = `
                <td>${capitalizar(informe.tipo)}</td>
                <td>${informe.descripcion}</td>
                <td>${relacionado}</td>
                <td>${formatearFecha(informe.fecha)}</td>
                <td>$${informe.monto.toFixed(2)}</td>
            `;

            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("❌ Error al cargar informes:", error);
    }
}

async function cargarOpcionesRelacionado() {
    const select = document.getElementById("relacionadoId");
    select.innerHTML = "";

    try {
        const [clientesRes, proveedoresRes] = await Promise.all([
            fetch("/api/clientes"),
            fetch("/api/proveedores"),
        ]);

        const clientes = await clientesRes.json();
        const proveedores = await proveedoresRes.json();

        if (clientes.length > 0) {
            const optgroupClientes = document.createElement("optgroup");
            optgroupClientes.label = "Clientes";

            clientes.forEach((cliente) => {
                const option = document.createElement("option");
                option.value = cliente.id;
                option.textContent = cliente.nombre;
                optgroupClientes.appendChild(option);
            });

            select.appendChild(optgroupClientes);
        }

        if (proveedores.length > 0) {
            const optgroupProveedores = document.createElement("optgroup");
            optgroupProveedores.label = "Proveedores";

            proveedores.forEach((proveedor) => {
                const option = document.createElement("option");
                option.value = proveedor.id;
                option.textContent = proveedor.nombre;
                optgroupProveedores.appendChild(option);
            });

            select.appendChild(optgroupProveedores);
        }
    } catch (err) {
        console.error("❌ Error al cargar opciones de relacionado:", err);
    }
}

function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString("es-ES");
}

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}
