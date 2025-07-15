document.addEventListener("DOMContentLoaded", cargarInventario);

async function cargarInventario() {
    try {
        const res = await fetch("/api/inventario");
        const productos = await res.json();

        const tbody = document.querySelector("#tablaInventario tbody");
        tbody.innerHTML = "";

        productos.forEach((prod) => {
            const fila = `
        <tr>
          <td>${prod.id}</td>
          <td>${prod.nombre}</td>
          <td>${prod.proveedor?.nombre || "Sin proveedor"}</td>
          <td>${prod.unidades ?? "-"}</td>
          <td>$${prod.costo.toFixed(2)}</td>
          <td>$${prod.precioUnitario?.toFixed(2) || "-"}</td>
        </tr>
      `;
            tbody.innerHTML += fila;
        });
    } catch (error) {
        console.error("Error al cargar el inventario:", error);
    }
}
