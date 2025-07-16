import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const facturas = await prisma.factura.findMany({
            include: { cliente: true },
            orderBy: { fecha: "desc" },
        });
        res.json(facturas);
    } catch (error) {
        console.error("Error al obtener facturas:", error);
        res.status(500).json({ error: "Error al obtener facturas" });
    }
});

export default router;
