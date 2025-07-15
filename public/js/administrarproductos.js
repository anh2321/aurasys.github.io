document.addEventListener("DOMContentLoaded", async () => {
    let productos = [];

    async function cargarProductos() {
        try {
            const res = await fetch("/api/productos");
            productos = await res.json();
            renderizarTabla(productos);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    }

    function renderizarTabla(lista) {
        const tbody = document.getElementById("productosBody");
        tbody.innerHTML = "";

        lista.forEach((p) => {
            const codigo = `PRD-${String(p.id).padStart(3, '0')}`;
            const fecha = p.createdAt?.split("T")[0] || "-";

            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${codigo}</td>
        <td>${p.nombre}</td>
        <td>${p.proveedor?.nombre || 'Sin proveedor'}</td>
        <td>$${p.costo.toFixed(2)}</td>
        <td>$${p.precioUnitario?.toFixed(2) || '-'}</td>
        <td class="centered">${p.unidades ?? '-'}</td>
        <td>${fecha}</td>
        <td>
          <button class="btn small danger" onclick="eliminarProducto(${p.id})">Eliminar</button>
        </td>
      `;
            tbody.appendChild(tr);
        });
    }

    window.buscarProducto = function () {
        const query = document.getElementById("buscar").value.trim().toLowerCase();
        const resultados = productos.filter(p => `prd-${String(p.id).padStart(3, '0')}`.includes(query));
        renderizarTabla(resultados);
    };

    window.eliminarProducto = async function (id) {
        if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
        try {
            const res = await fetch(`/api/productos/${id}`, { method: "DELETE" });
            if (res.ok) {
                productos = productos.filter(p => p.id !== id);
                renderizarTabla(productos);
            } else {
                alert("Error al eliminar producto.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo eliminar.");
        }
    };

    cargarProductos();
});
