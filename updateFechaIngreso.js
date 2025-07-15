// updateFechaIngreso.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const result = await prisma.producto.updateMany({
        data: {
            fechaIngreso: new Date()
        },
        where: {
            fechaIngreso: null
        }
    });

    console.log(`Productos actualizados: ${result.count}`);
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
