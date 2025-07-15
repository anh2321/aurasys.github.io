import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const {
      cliente,
      formaPago,
      vendedor,
      administrador,
      total,
      efectivo,
      cambio,
      saldo,
      productos,
    } = req.body;

    // Buscar o crear cliente
    let clienteExistente = await prisma.cliente.findFirst({
      where: {
        nombre: cliente.nombre,
        telefono: cliente.telefono,
      },
    });

    if (!clienteExistente) {
      clienteExistente = await prisma.cliente.create({
        data: {
          nombre: cliente.nombre,
          telefono: cliente.telefono,
        },
      });
    }

    // Crear factura
    const nuevaFactura = await prisma.factura.create({
      data: {
        clienteId: clienteExistente.id,
        formaPago,
        vendedor,
        administrador,
        total,
        efectivo,
        cambio,
        saldo,
      },
    });

    // Insertar productos
    for (const p of productos) {
      let productoDB;

      if (p.productoId) {
        productoDB = await prisma.producto.findUnique({
          where: { id: p.productoId },
        });
      } else {
        productoDB = await prisma.producto.findFirst({
          where: { nombre: p.nombre },
        });
      }

      if (!productoDB) continue;

      await prisma.facturaProducto.create({
        data: {
          facturaId: nuevaFactura.id,
          productoId: productoDB.id,
          cantidad: p.cantidad,
          precioUnitario: p.precioUnitario,
          descuento: p.descuento,
          ivaPorcentaje: p.ivaPorcentaje,
          totalNeto: (p.cantidad * p.precioUnitario) - p.descuento,
        },
      });
    }

    // Crear cuenta por cobrar si aplica
    if (formaPago === "cxc") {
      await prisma.cuentaPorCobrar.create({
        data: {
          facturaId: nuevaFactura.id,
          clienteId: clienteExistente.id,
          total: saldo,
        },
      });
    }

    res.status(201).json({ mensaje: "Factura creada exitosamente" });

  } catch (error) {
    console.error("❌ Error al crear factura:", error);
    res.status(500).json({ error: "Error al crear la factura" });
  }
});

export default router;
