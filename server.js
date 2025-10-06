   import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// URL de tu n8n en Hostinger (la que dice "No es seguro")
const target = "http://n8n.srv1035035.hstgr.cloud";

app.use(
  "/",
  createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor proxy activo en puerto ${PORT}`);
});


