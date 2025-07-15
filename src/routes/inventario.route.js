import { Router } from "express";
import prisma from "../lib/prismaClient.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const productos = await prisma.producto.findMany({
            include: {
                proveedor: true
            }
        });

        res.json(productos);
    } catch (error) {
        console.error("Error al obtener inventario:", error);
        res.status(500).json({ error: "Error al obtener el inventario" });
    }
});

export default router;
