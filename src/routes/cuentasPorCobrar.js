import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const cuentas = await prisma.cuentaPorCobrar.findMany({
            include: {
                cliente: true,
                factura: true,
            },
            orderBy: {
                fechaEmision: "desc"
            }
        });

        res.json(cuentas);
    } catch (error) {
        console.error("Error al obtener cuentas por cobrar:", error);
        res.status(500).json({ error: "Error al obtener cuentas por cobrar" });
    }
});

export default router;
