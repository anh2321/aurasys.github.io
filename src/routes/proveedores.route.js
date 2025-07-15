import express from 'express';
import {
  obtenerProveedores,
  crearProveedor // <-- Asegúrate de tener esto en el controlador
} from '../controllers/proveedores.controller.js';

const router = express.Router();

// Ruta para obtener todos los proveedores
router.get("/", obtenerProveedores);

// ✅ Ruta para insertar proveedor (necesaria para Thunder Client)
router.post("/", crearProveedor);

export default router;
