-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Producto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "costo" REAL NOT NULL,
    "precioUnitario" REAL,
    "unidades" INTEGER,
    "proveedorId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Producto_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Producto" ("costo", "id", "nombre", "precioUnitario", "proveedorId", "unidades") SELECT "costo", "id", "nombre", "precioUnitario", "proveedorId", "unidades" FROM "Producto";
DROP TABLE "Producto";
ALTER TABLE "new_Producto" RENAME TO "Producto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
