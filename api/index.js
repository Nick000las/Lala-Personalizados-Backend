import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import pedidoRoutes from "../src/routes/pedidoRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({
  origin: ["http://localhost:3001"], 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rotas
app.get("/logout", (req, res) => {
  res.clearCookie("admin_session");
  res.json({ ok: true });
});

app.use(pedidoRoutes);

export default app;
