import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import open from "open";

// Rutas API
import informesRoutes from "./src/routes/informes.route.js";
import usuarioRoutes from "./src/routes/usuarios.route.js";
import clientesRoutes from "./src/routes/clientes.route.js";
import productosRoutes from "./src/routes/productos.route.js";
import facturasRoutes from "./src/routes/facturas.route.js";
import proveedoresRoutes from "./src/routes/proveedores.route.js";
import inventarioRoutes from "./src/routes/inventario.route.js";
import cuentasPorCobrarRoutes from "./src/routes/cuentasPorCobrar.js"; // <- existe y se usa abajo con guiones
import facturasClientesRoute from './src/routes/facturasClientes.route.js';


dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Rutas API
app.use("/api/usuarios", usuarioRoutes);
app.use('/api/clientes', clientesRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/facturas", facturasRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/inventario", inventarioRoutes);
app.use("/api/informes", informesRoutes);
app.use("/api/cuentas-por-cobrar", cuentasPorCobrarRoutes); // <- corregido con guiones
app.use("/api/facturas-clientes", facturasClientesRoute);
// ✅ Rutas HTML (vistas frontend)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "index.html"));
});
app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "dashboard.html"));
});
app.get("/facturacion", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "facturacion.html"));
});
app.get("/nuevoProducto", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "nuevoProducto.html"));
});
app.get("/administrarProductos", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "administrarProductos.html"));
});
app.get("/reportes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "reportes.html"));
});
app.get("/proveedores", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "proveedores.html"));
});
app.get("/saldosBancarios", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "saldosBancarios.html"));
});
app.get("/cuentasPorCobrar", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "cuentasPorCobrar.html"));
});
app.get("/cuentasPorPagar", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "cuentasPorPagar.html"));
});
app.get("/html/facturasClientes.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "views", "facturasClientes.html"));
});

// ✅ Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`✅ Servidor corriendo en ${url}`);
    open(url);
});
