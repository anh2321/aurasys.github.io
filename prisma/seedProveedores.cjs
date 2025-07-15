const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const proveedores = [
        { id: 103, nombre: 'Flor Ltd' },
        { id: 104, nombre: 'Rivas, Giménez and Sanchez' },
        { id: 105, nombre: 'Lobo, Agudo and Cuervo' },
        { id: 106, nombre: 'Rocamora, Nieto and Lobo' },
        { id: 107, nombre: 'Garrido LLC' },
        { id: 108, nombre: 'Bru Group' },
        { id: 109, nombre: 'Palomar LLC' },
        { id: 110, nombre: 'Lamas, Aroca and Segovia' },
        { id: 111, nombre: 'Casanovas, Pinedo and Bermúdez' },
        { id: 112, nombre: 'Marcos, Pardo and Fernandez' },
        { id: 113, nombre: 'Baños, Arroyo and Goñi' },
        { id: 114, nombre: 'Bernal-Guerrero' },
        { id: 115, nombre: 'Pinto LLC' },
        { id: 116, nombre: 'Patiño-Cánovas' },
        { id: 117, nombre: 'Padilla-Gallego' },
        { id: 118, nombre: 'Lasa, Bellido and Donoso' },
        { id: 119, nombre: 'Hierro, Cárdenas and Sevilla' },
        { id: 120, nombre: 'Lerma-Gimenez' },
        { id: 121, nombre: 'Morata, Barba and Grande' },
        { id: 122, nombre: 'Moles Group' },


    ];

    for (const proveedor of proveedores) {
        await prisma.proveedor.upsert({
            where: { id: proveedor.id },
            update: {},
            create: proveedor,
        });
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
