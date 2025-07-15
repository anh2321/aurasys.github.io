import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const grabarFactura = async (req, res) => {
    try {
        const {
            clienteNombre,
            clienteTelefono,
            productos, // [{ id, cantidad, precioUnitario, descuento, ivaPorcentaje, totalNeto }]
            formaPago,
            vendedor,
            administrador,
            referencia,
            efectivo,
            cambio,
            estado,
            total,
            saldo
        } = req.body;

        // Verificar si el cliente existe
        let cliente = await prisma.cliente.findFirst({
            where: { nombre: clienteNombre }
        });

        if (!cliente) {
            cliente = await prisma.cliente.create({
                data: {
                    nombre: clienteNombre,
                    telefono: clienteTelefono
                }
            });
        }

        // Crear la factura
        const factura = await prisma.factura.create({
            data: {
                formaPago,
                vendedor,
                administrador,
                referencia,
                efectivo,
                cambio,
                estado,
                total,
                saldo,
                clienteId: cliente.id
            }
        });

        // Insertar productos de la factura
        for (const p of productos) {
            await prisma.facturaProducto.create({
                data: {
                    facturaId: factura.id,
                    productoId: p.id,
                    cantidad: p.cantidad,
                    precioUnitario: p.precioUnitario,
                    descuento: p.descuento,
                    ivaPorcentaje: p.ivaPorcentaje,
                    totalNeto: p.totalNeto
                }
            });
        }

        // Si hay saldo pendiente, registrar cuenta por cobrar
        if (saldo > 0) {
            await prisma.cuentaPorCobrar.create({
                data: {
                    clienteId: cliente.id,
                    total: saldo,
                    facturaId: factura.id
                }
            });
        }

        res.status(201).json({ message: 'Factura grabada con éxito.' });
    } catch (error) {
        console.error('Error al grabar factura:', error);
        res.status(500).json({ error: 'Error al grabar factura' });
    }
};
