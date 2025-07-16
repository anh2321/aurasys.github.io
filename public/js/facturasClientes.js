document.addEventListener("DOMContentLoaded", async () => {
    const tabla = document.getElementById("tablaFacturas");
    const cuerpoTabla = tabla.querySelector("tbody");
    const btnExportar = document.getElementById("btnExportarPDF");

    let datosFacturas = [];

    // Cargar datos de la API
    try {
        const response = await fetch("/api/facturas-clientes");
        datosFacturas = await response.json();

        datosFacturas.forEach(factura => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
        <td>${factura.id}</td>
        <td>${new Date(factura.fecha).toLocaleDateString()}</td>
        <td>${factura.formaPago}</td>
        <td>${factura.vendedor}</td>
        <td>${factura.administrador}</td>
        <td>${factura.referencia || "-"}</td>
        <td>${factura.saldo}</td>
        <td>${factura.total}</td>
        <td>${factura.efectivo}</td>
        <td>${factura.cambio}</td>
        <td>${factura.estado}</td>
        <td>${factura.cliente?.nombre || "N/A"}</td>
      `;

            cuerpoTabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar facturas:", error);
    }

    // Exportar a PDF
    btnExportar.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text("Reporte de Facturas a Clientes", 14, 15);

        const filas = datosFacturas.map(factura => [
            factura.id,
            new Date(factura.fecha).toLocaleDateString(),
            factura.formaPago,
            factura.vendedor,
            factura.administrador,
            factura.referencia || "-",
            factura.saldo,
            factura.total,
            factura.efectivo,
            factura.cambio,
            factura.estado,
            factura.cliente?.nombre || "N/A"
        ]);

        doc.autoTable({
            startY: 20,
            head: [[
                "ID", "Fecha", "Forma de Pago", "Vendedor", "Administrador", "Referencia",
                "Saldo", "Total", "Efectivo", "Cambio", "Estado", "Cliente"
            ]],
            body: filas,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [52, 73, 94] },
        });

        doc.save("facturas_clientes.pdf");
    });
});
