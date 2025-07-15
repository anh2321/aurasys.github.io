const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.cliente.createMany({
        data: [
            { nombre: 'Domenica', telefono: '0984443545' },
            { nombre: 'Juan Pérez', telefono: '555-1234' },
            { nombre: 'Misael Rendón', telefono: '0987654123' },
            { nombre: 'Jeremi Vasquez', telefono: '0998172313' },
            { nombre: 'Carlos Mendoza', telefono: '099-888-7766' },
            { nombre: 'Carlos Mendoza', telefono: '099-000-1000' },
            { nombre: 'Ana Torres', telefono: '099-000-1001' },
            { nombre: 'Luis Ramírez', telefono: '099-000-1002' },
            { nombre: 'Sofía Vega', telefono: '099-000-1003' },
            { nombre: 'Daniel Ríos', telefono: '099-000-1004' },
            { nombre: 'Valentina López', telefono: '099-000-1005' },
            { nombre: 'Mateo Navarro', telefono: '099-000-1006' },
            { nombre: 'Camila Suárez', telefono: '099-000-1007' },
            { nombre: 'Andrés Jiménez', telefono: '099-000-1008' },
            { nombre: 'Lucía Herrera', telefono: '099-000-1009' },
            { nombre: 'Javier Cruz', telefono: '099-000-1010' },
            { nombre: 'Fernanda Díaz', telefono: '099-000-1011' },
            { nombre: 'Martín Ortega', telefono: '099-000-1012' },
            { nombre: 'Paula Salinas', telefono: '099-000-1013' },
            { nombre: 'Esteban Molina', telefono: '099-000-1014' },
            { nombre: 'Mariana Paredes', telefono: '099-000-1015' },
            { nombre: 'Hugo Bravo', telefono: '099-000-1016' },
            { nombre: 'Gabriela Chávez', telefono: '099-000-1017' },
            { nombre: 'Tomás Acosta', telefono: '099-000-1018' },
            { nombre: 'Isabel Román', telefono: '099-000-1019' },
            { nombre: 'Cristhian Rojas', telefono: '098128876' },
            { nombre: 'Geovanny Rendón', telefono: '0985334578' },
            { nombre: 'Cliente Demo', telefono: '0000000000' }
        ],
        skipDuplicates: true
    });

    console.log("✅ Clientes insertados con éxito.");
}

main()
    .catch((e) => {
        console.error("❌ Error al insertar clientes:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
