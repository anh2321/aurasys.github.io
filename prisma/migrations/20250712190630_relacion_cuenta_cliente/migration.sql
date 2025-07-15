/*
  Warnings:

  - You are about to drop the column `cliente` on the `CuentaPorCobrar` table. All the data in the column will be lost.
  - Added the required column `clienteId` to the `CuentaPorCobrar` table without a default value. This is not possible if the table is not empty.

*/
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
    CONSTRAINT "CuentaPorCobrar_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CuentaPorCobrar" ("estado", "facturaId", "fechaEmision", "id", "total") SELECT "estado", "facturaId", "fechaEmision", "id", "total" FROM "CuentaPorCobrar";
DROP TABLE "CuentaPorCobrar";
ALTER TABLE "new_CuentaPorCobrar" RENAME TO "CuentaPorCobrar";
CREATE UNIQUE INDEX "CuentaPorCobrar_facturaId_key" ON "CuentaPorCobrar"("facturaId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
