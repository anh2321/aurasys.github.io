import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        proveedor: true
      },
      orderBy: { id: 'asc' }
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Crear nuevo producto
router.post("/", async (req, res) => {
  try {
    const {
      codigo,
      tipo,
      nombre,
      costo,
      precioUnitario,
      unidades,
      proveedorId
    } = req.body;

    const nuevo = await prisma.producto.create({
      data: {
        codigo,
        tipo,
        nombre,
        costo,
        precioUnitario,
        unidades,
        proveedorId
      }
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "No se pudo crear el producto" });
  }
});

// Eliminar producto
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.producto.delete({ where: { id } });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

export default router;
