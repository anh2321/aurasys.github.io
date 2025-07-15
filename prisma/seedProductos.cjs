const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.producto.createMany({
        data: [
            {
                id: 50,
                codigo: 'PRD-050',
                tipo: 'Producto',
                nombre: 'Alias Pro',
                costo: 297.93,
                precioUnitario: 39.09,
                unidades: 44,
                proveedorId: 88,
                fechaIngreso: new Date(),
                createdAt: new Date(),
            },
            {
                id: 51,
                codigo: 'PRD-051',
                tipo: 'Producto',
                nombre: 'Harum Smart',
                costo: 29.79,
                precioUnitario: 322.03,
                unidades: 47,
                proveedorId: 100,
                fechaIngreso: new Date(),
                createdAt: new Date(),
            },
            {
                id: 52,
                codigo: 'PRD-052',
                tipo: 'Producto',
                nombre: 'Exercitationem Max',
                costo: 298.46,
                precioUnitario: 44.43,
                unidades: 27,
                proveedorId: 61,
                fechaIngreso: new Date(),
                createdAt: new Date(),
            },
            {
                id: 53,
                codigo: 'PRD-053',
                tipo: 'Producto',
                nombre: 'Voluptatibus Advance',
                costo: 98.06,
                precioUnitario: 405.71,
                unidades: 87,
                proveedorId: 85,
                fechaIngreso: new Date(),
                createdAt: new Date(),
            },

        
        ],
        skipDuplicates: true,
    });
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
