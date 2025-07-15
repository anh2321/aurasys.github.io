import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const nuevosProveedores = [
    'TechParts SA', 'InfoWare', 'Electronix', 'PC Global', 'RedNet S.A.',
    'HardComp', 'MegaBytes', 'CyberZone', 'NetExpress', 'DataPlus'
];

const nombresProductos = [
    'Mouse Inalámbrico', 'Teclado Mecánico', 'Pantalla LED 24"', 'Monitor 27"', 'Impresora Multifunción',
    'Laptop 15"', 'Tablet 10"', 'Auriculares Bluetooth', 'Parlantes', 'Webcam HD',
    'Disco SSD 1TB', 'Disco Duro 2TB', 'Memoria RAM 8GB', 'Memoria RAM 16GB', 'CPU Intel i5',
    'CPU AMD Ryzen 5', 'Placa Madre ASUS', 'Fuente 650W', 'Gabinete Gamer', 'Silla Ergonómica',
    'Router Wi-Fi', 'Switch 8 Puertos', 'Cámara IP', 'Micrófono Condensador', 'UPS 1000VA',
    'Lector Código Barras', 'Cinta Etiquetas', 'Pantalla Touch', 'Mini PC', 'Antena WiFi',
    'Hub USB', 'Proyector', 'Batería Laptop', 'Teclado Inalámbrico', 'Mouse Pad RGB',
    'Caja Registradora', 'Control Remoto', 'Cable HDMI', 'Adaptador USB-C', 'Soporte Monitor',
    'Cooler CPU', 'Tarjeta de Sonido', 'Luces LED RGB', 'Caja Herramientas', 'Scanner Documentos',
    'Disco Externo', 'Repetidor WiFi', 'Cámara de Seguridad', 'Almohadilla Muñeca', 'Clip Ventilador'
];

async function main() {
    // 1. Insertar nuevos proveedores
    const proveedoresCreados = [];

    for (const nombre of nuevosProveedores) {
        const proveedor = await prisma.proveedor.create({
            data: { nombre }
        });
        proveedoresCreados.push(proveedor.id);
    }

    // Incluir también los existentes
    const proveedoresExistentes = [58, 59, 60];
    const todosLosProveedores = [...proveedoresExistentes, ...proveedoresCreados];

    // 2. Insertar 50 productos
    for (let i = 0; i < nombresProductos.length; i++) {
        const proveedorId = todosLosProveedores[Math.floor(Math.random() * todosLosProveedores.length)];

        await prisma.producto.create({
            data: {
                codigo: `PRD-${(i + 36).toString().padStart(3, '0')}`, // evita duplicar los existentes
                tipo: 'Producto',
                nombre: nombresProductos[i],
                costo: parseFloat((Math.random() * 100 + 10).toFixed(2)),
                precioUnitario: parseFloat((Math.random() * 150 + 20).toFixed(2)),
                unidades: Math.floor(Math.random() * 50 + 1),
                proveedorId,
                fechaIngreso: new Date(),                
                createdAt: new Date()
            }
        });
    }

    console.log('✔ Proveedores y productos insertados correctamente.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
