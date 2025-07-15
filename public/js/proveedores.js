const cargarProveedores = async () => {
    try {
        const res = await fetch("/api/proveedores");
        const proveedores = await res.json();

        const tbody = document.getElementById("tablaProveedores");
        tbody.innerHTML = "";

        proveedores.forEach((prov) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${prov.id}</td>
                <td>${prov.nombre}</td>
            `;
            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar proveedores:", error);
    }
};

document.addEventListener("DOMContentLoaded", cargarProveedores);
