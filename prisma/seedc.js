import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const nombresClientes = [
    'Carlos Mendoza', 'Ana Torres', 'Luis Ramírez', 'Sofía Vega', 'Daniel Ríos',
    'Valentina López', 'Mateo Navarro', 'Camila Suárez', 'Andrés Jiménez', 'Lucía Herrera',
    'Javier Cruz', 'Fernanda Díaz', 'Martín Ortega', 'Paula Salinas', 'Esteban Molina',
    'Mariana Paredes', 'Hugo Bravo', 'Gabriela Chávez', 'Tomás Acosta', 'Isabel Román'
];

async function main() {
    for (let i = 0; i < 20; i++) {
        const nombre = nombresClientes[i];
        const telefono = `099-000-${String(1000 + i).slice(-4)}`;
        const total = Math.floor(Math.random() * 500) + 100; // entre 100 y 600
        const pagoInicial = Math.floor(Math.random() * total * 0.7);
        const saldo = total - pagoInicial;

        // Crear cliente
        const cliente = await prisma.cliente.create({
            data: {
                nombre,
                telefono,
            }
        });

        // Crear factura
        const factura = await prisma.factura.create({
            data: {
                formaPago: 'crédito',
                vendedor: `Vendedor ${i + 1}`,
                administrador: `Admin ${i + 1}`,
                referencia: `FAC-2025-${String(i + 1).padStart(3, '0')}`,
                saldo,
                total,
                efectivo: pagoInicial,
                cambio: 0.00,
                estado: 'pendiente',
                clienteId: cliente.id
            }
        });

        // Crear cuenta por cobrar
        await prisma.cuentaPorCobrar.create({
            data: {
                total: saldo,
                estado: 'pendiente',
                facturaId: factura.id,
                clienteId: cliente.id
            }
        });
    }

    console.log('✔ Se insertaron 20 cuentas por cobrar de prueba.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
