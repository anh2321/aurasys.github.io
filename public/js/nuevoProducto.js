document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("formNuevoProducto");

    // Cargar proveedores
    const selectProveedor = document.getElementById("proveedor");
    try {
        const res = await fetch("/api/proveedores");
        const proveedores = await res.json();
        proveedores.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.id;
            opt.textContent = p.nombre;
            selectProveedor.appendChild(opt);
        });
    } catch (error) {
        console.error("Error al cargar proveedores:", error);
    }

    // Guardar producto
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            codigo: document.getElementById("codigo").value,
            tipo: document.getElementById("tipo").value,
            nombre: document.getElementById("nombre").value,
            costo: parseFloat(document.getElementById("costo").value),
            precioUnitario: parseFloat(document.getElementById("precioUnitario").value),
            unidades: parseInt(document.getElementById("unidades").value),
            proveedorId: parseInt(document.getElementById("proveedor").value)
        };

        try {
            const res = await fetch("/api/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                alert("Producto registrado exitosamente.");
                form.reset();
            } else {
                alert("Error al guardar producto.");
            }
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    });
});
