/*
  Warnings:

  - Added the required column `descuento` to the `FacturaProducto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ivaPorcentaje` to the `FacturaProducto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioUnitario` to the `FacturaProducto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalNeto` to the `FacturaProducto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FacturaProducto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "facturaId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" REAL NOT NULL,
    "descuento" REAL NOT NULL,
    "ivaPorcentaje" REAL NOT NULL,
    "totalNeto" REAL NOT NULL,
    CONSTRAINT "FacturaProducto_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "Factura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FacturaProducto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FacturaProducto" ("cantidad", "facturaId", "id", "productoId") SELECT "cantidad", "facturaId", "id", "productoId" FROM "FacturaProducto";
DROP TABLE "FacturaProducto";
ALTER TABLE "new_FacturaProducto" RENAME TO "FacturaProducto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
