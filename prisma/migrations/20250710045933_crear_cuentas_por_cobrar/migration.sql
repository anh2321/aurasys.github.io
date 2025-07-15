-- CreateTable
CREATE TABLE "CuentaPorCobrar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cliente" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaEmision" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" REAL NOT NULL,
    "montoPagado" REAL NOT NULL DEFAULT 0,
    "saldoPendiente" REAL NOT NULL,
    "estado" TEXT NOT NULL
);
