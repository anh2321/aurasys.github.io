import express from "express";
import { getPrismaInstance } from "../services/prisma.service.js";

const router = express.Router();
const prisma = getPrismaInstance();

// Obtener todos los usuarios (GET opcional)
router.get("/", async (req, res) => {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
});

// Crear un nuevo usuario (POST para usar con Thunder Client)
router.post("/", async (req, res) => {
    const { nombre, contraseña, cargo } = req.body;

    try {
        const nuevoUsuario = await prisma.usuario.create({
            data: { nombre, contraseña, cargo },
        });

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "No se pudo crear el usuario" });
    }
});

// Ruta para login (usada por tu login.js)
router.post("/login", async (req, res) => {
    const { nombre, contraseña, cargo } = req.body;

    try {
        const usuario = await prisma.usuario.findFirst({
            where: { nombre, contraseña, cargo }
        });

        if (usuario) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ success: false });
    }
});
router.get("/test", (req, res) => {
    res.send("✅ Ruta activa");
});
export default router;
