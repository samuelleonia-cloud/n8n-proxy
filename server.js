import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// URL de tu n8n en Hostinger (la insegura)
const target = "http://n8n.srv1035035.hstgr.cloud";

app.set("trust proxy", 1); // importante para Render

app.use(
  "/",
  createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
      // fuerza encabezados HTTPS
      proxyReq.setHeader("X-Forwarded-Proto", "https");
      proxyReq.setHeader("X-Forwarded-Host", req.headers.host);
    },
    onProxyRes: (proxyRes, req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    },
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor proxy activo en puerto ${PORT}`);
});
