import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// URL de tu n8n en Hostinger (sin https, tal como aparece en el navegador)
const target = "http://n8n.srv1035035.hstgr.cloud";

app.use(
  "/",
  createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader("X-Forwarded-Proto", "https");
    },
  })
);

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`🔒 Proxy seguro activo en puerto ${port}`);
});
