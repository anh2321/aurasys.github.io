import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todos los proveedores
export const obtenerProveedores = async (req, res) => {
    try {
        const proveedores = await prisma.proveedor.findMany();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener proveedores" });
    }
};

// ✅ Crear proveedor individual (Thunder Client lo necesita)
export const crearProveedor = async (req, res) => {
    try {
        const { nombre } = req.body;
        const proveedor = await prisma.proveedor.create({
            data: { nombre }
        });
        res.status(201).json(proveedor);
    } catch (error) {
        res.status(500).json({ error: "Error al crear proveedor" });
    }
};
