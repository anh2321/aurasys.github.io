/*
  Warnings:

  - Added the required column `codigo` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Producto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "costo" REAL NOT NULL,
    "precioUnitario" REAL,
    "unidades" INTEGER,
    "proveedorId" INTEGER,
    "fechaIngreso" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Producto_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Producto" ("costo", "createdAt", "id", "nombre", "precioUnitario", "proveedorId", "unidades") SELECT "costo", "createdAt", "id", "nombre", "precioUnitario", "proveedorId", "unidades" FROM "Producto";
DROP TABLE "Producto";
ALTER TABLE "new_Producto" RENAME TO "Producto";
CREATE UNIQUE INDEX "Producto_codigo_key" ON "Producto"("codigo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
