import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los informes con nombre de cliente o proveedor
router.get("/", async (req, res) => {
    try {
        const informes = await prisma.informe.findMany({
            orderBy: { fecha: "desc" },
            include: {
                cliente: { select: { nombre: true } },
                proveedor: { select: { nombre: true } },
            },
        });
        res.json(informes);
    } catch (err) {
        console.error("❌ Error al obtener informes:", err);
        res.status(500).json({ error: "Error al obtener informes" });
    }
});

// Crear nuevo informe
router.post("/", async (req, res) => {
    try {
        const { tipo, descripcion, monto, clienteId, proveedorId } = req.body;

        const data = {
            tipo,
            descripcion,
            monto,
            fecha: new Date(),
            clienteId: tipo === "ingreso" ? clienteId : null,
            proveedorId: tipo === "gasto" ? proveedorId : null,
        };

        const nuevoInforme = await prisma.informe.create({ data });

        res.status(201).json(nuevoInforme);
    } catch (err) {
        console.error("❌ Error al crear informe:", err);
        res.status(500).json({ error: "Error al crear informe" });
    }
});

export default router;
