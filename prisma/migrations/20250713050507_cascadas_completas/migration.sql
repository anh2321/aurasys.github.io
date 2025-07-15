-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CuentaPorCobrar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" REAL NOT NULL,
    "fechaEmision" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "facturaId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "CuentaPorCobrar_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "Factura" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CuentaPorCobrar_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CuentaPorCobrar" ("clienteId", "estado", "facturaId", "fechaEmision", "id", "total") SELECT "clienteId", "estado", "facturaId", "fechaEmision", "id", "total" FROM "CuentaPorCobrar";
DROP TABLE "CuentaPorCobrar";
ALTER TABLE "new_CuentaPorCobrar" RENAME TO "CuentaPorCobrar";
CREATE UNIQUE INDEX "CuentaPorCobrar_facturaId_key" ON "CuentaPorCobrar"("facturaId");
CREATE TABLE "new_FacturaProducto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "facturaId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" REAL NOT NULL,
    "descuento" REAL NOT NULL,
    "ivaPorcentaje" REAL NOT NULL,
    "totalNeto" REAL NOT NULL,
    CONSTRAINT "FacturaProducto_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "Factura" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FacturaProducto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FacturaProducto" ("cantidad", "descuento", "facturaId", "id", "ivaPorcentaje", "precioUnitario", "productoId", "totalNeto") SELECT "cantidad", "descuento", "facturaId", "id", "ivaPorcentaje", "precioUnitario", "productoId", "totalNeto" FROM "FacturaProducto";
DROP TABLE "FacturaProducto";
ALTER TABLE "new_FacturaProducto" RENAME TO "FacturaProducto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
