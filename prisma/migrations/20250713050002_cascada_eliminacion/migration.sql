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
    CONSTRAINT "CuentaPorCobrar_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "Factura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CuentaPorCobrar_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CuentaPorCobrar" ("clienteId", "estado", "facturaId", "fechaEmision", "id", "total") SELECT "clienteId", "estado", "facturaId", "fechaEmision", "id", "total" FROM "CuentaPorCobrar";
DROP TABLE "CuentaPorCobrar";
ALTER TABLE "new_CuentaPorCobrar" RENAME TO "CuentaPorCobrar";
CREATE UNIQUE INDEX "CuentaPorCobrar_facturaId_key" ON "CuentaPorCobrar"("facturaId");
CREATE TABLE "new_Factura" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "formaPago" TEXT NOT NULL,
    "vendedor" TEXT NOT NULL,
    "administrador" TEXT NOT NULL,
    "referencia" TEXT,
    "saldo" REAL NOT NULL,
    "total" REAL NOT NULL,
    "efectivo" REAL,
    "cambio" REAL,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "Factura_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Factura" ("administrador", "cambio", "clienteId", "efectivo", "estado", "fecha", "formaPago", "id", "referencia", "saldo", "total", "vendedor") SELECT "administrador", "cambio", "clienteId", "efectivo", "estado", "fecha", "formaPago", "id", "referencia", "saldo", "total", "vendedor" FROM "Factura";
DROP TABLE "Factura";
ALTER TABLE "new_Factura" RENAME TO "Factura";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
