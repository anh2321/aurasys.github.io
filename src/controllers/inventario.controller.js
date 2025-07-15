import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const obtenerInventario = async (req, res) => {
    try {
        const productos = await prisma.producto.findMany({
            include: {
                proveedor: true
            }
        });
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener el inventario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
