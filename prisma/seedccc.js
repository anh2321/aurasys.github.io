import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Crear cliente si no existe
    const cliente = await prisma.cliente.upsert({
        where: { telefono: '0000000000' },
        update: {},
        create: {
            nombre: 'Cliente Demo',
            telefono: '0000000000',
        },
    });

    // Insertar ingresos
    await prisma.informe.createMany({
        data: [
            {
                tipo: 'ingreso',
                descripcion: 'Pago de factura 001',
                monto: 250.0,
                clienteId: cliente.id,
                fecha: new Date('2025-07-01'),
            },
            {
                tipo: 'ingreso',
                descripcion: 'Pago parcial de factura 002',
                monto: 150.0,
                clienteId: cliente.id,
                fecha: new Date('2025-07-05'),
            },
            {
                tipo: 'ingreso',
                descripcion: 'Ingreso por servicio técnico',
                monto: 100.0,
                clienteId: cliente.id,
                fecha: new Date('2025-07-10'),
            },
        ],
    });

    // Insertar gastos (sin clienteId)
    await prisma.informe.createMany({
        data: [
            {
                tipo: 'gasto',
                descripcion: 'Compra de productos a proveedor',
                monto: 120.0,
                fecha: new Date('2025-07-03'),
            },
            {
                tipo: 'gasto',
                descripcion: 'Pago por mantenimiento',
                monto: 200.0,
                fecha: new Date('2025-07-06'),
            },
            {
                tipo: 'gasto',
                descripcion: 'Compra de insumos de oficina',
                monto: 80.0,
                fecha: new Date('2025-07-09'),
            },
        ],
    });

    console.log('✅ Datos de informes insertados correctamente');
}

main()
    .catch((e) => {
        console.error('❌ Error al insertar informes:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
