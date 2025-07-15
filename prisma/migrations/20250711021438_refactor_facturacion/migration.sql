/*
  Warnings:

  - You are about to drop the column `descripcion` on the `CuentaPorCobrar` table. All the data in the column will be lost.
  - You are about to drop the column `montoPagado` on the `CuentaPorCobrar` table. All the data in the column will be lost.
  - You are about to drop the column `saldoPendiente` on the `CuentaPorCobrar` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Factura` table. All the data in the column will be lost.
  - Added the required column `facturaId` to the `CuentaPorCobrar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `administrador` to the `Factura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clienteId` to the `Factura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formaPago` to the `Factura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saldo` to the `Factura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendedor` to the `Factura` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CuentaPorCobrar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cliente" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "fechaEmision" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "facturaId" INTEGER NOT NULL,
    CONSTRAINT "CuentaPorCobrar_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "Factura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CuentaPorCobrar" ("cliente", "estado", "fechaEmision", "id", "total") SELECT "cliente", "estado", "fechaEmision", "id", "total" FROM "CuentaPorCobrar";
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
    CONSTRAINT "Factura_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Factura" ("fecha", "id", "total") SELECT "fecha", "id", "total" FROM "Factura";
DROP TABLE "Factura";
ALTER TABLE "new_Factura" RENAME TO "Factura";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
