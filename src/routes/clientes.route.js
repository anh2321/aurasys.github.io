import express from 'express';
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

// Obtener todos los clientes
router.get('/', async (req, res) => {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
});

// Crear nuevo cliente
router.post('/', async (req, res) => {
    const { nombre, telefono } = req.body;
    try {
        const nuevoCliente = await prisma.cliente.create({ data: { nombre, telefono } });
        res.status(201).json(nuevoCliente);
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ error: 'Error al crear cliente' });
    }
});

// Actualizar cliente
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, telefono } = req.body;
    try {
        const cliente = await prisma.cliente.update({
            where: { id },
            data: { nombre, telefono }
        });
        res.json(cliente);
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({ error: 'Error al actualizar cliente' });
    }
});

// Eliminar cliente (con relaciones)
// Eliminar cliente y sus relaciones
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        // Eliminación directa, ya que las relaciones tienen onDelete: Cascade
        await prisma.cliente.delete({
            where: { id }
        });

        res.status(204).send(); // 204 = No Content
    } catch (error) {
        console.error('Error al eliminar cliente:', error);

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
});


export default router;
