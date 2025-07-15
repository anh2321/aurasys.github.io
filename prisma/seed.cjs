const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.usuario.createMany({
        data: [
            {
                nombre: 'micro',
                contraseña: '1234',
                cargo: 'Microempresario',
            },
            {
                nombre: 'encar',
                contraseña: '1234',
                cargo: 'Encargado',
            },
        ],
        skipDuplicates: true,
    });

    console.log("✅ Usuarios insertados con éxito.");
}

main()
    .catch((e) => {
        console.error("❌ Error al insertar usuarios:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
