-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Informe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monto" REAL NOT NULL,
    "clienteId" INTEGER,
    "facturaId" INTEGER,
    "proveedorId" INTEGER,
    "productoId" INTEGER,
    CONSTRAINT "Informe_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Informe_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "Factura" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Informe_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Informe_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Informe" ("clienteId", "descripcion", "fecha", "id", "monto", "tipo") SELECT "clienteId", "descripcion", "fecha", "id", "monto", "tipo" FROM "Informe";
DROP TABLE "Informe";
ALTER TABLE "new_Informe" RENAME TO "Informe";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
