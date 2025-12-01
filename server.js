import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import pedidoRoutes from "./src/routes/pedidoRoutes.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();



app.use(cors({
  origin: ["http://127.0.0.1:3001", "http://localhost:3001"], // se frontend separado
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "../front-prog-web-m3/public")));


// Página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-prog-web-m3/public/index.html"));
});

// Tela de login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-prog-web-m3/public/login.html"));
});

// Tela de admin
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-prog-web-m3/public/admin.html"));
});


app.post("/login", (req, res) => {
  const { senha } = req.body;

  if (!senha) {
    return res.status(400).json({ erro: "Senha necessária" });
  }

  if (senha !== process.env.ADMIN_KEY) {
    return res.status(401).json({ erro: "Senha inválida" });
  }


  res.cookie("admin_session", process.env.ADMIN_KEY, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 2 // 2 horas

  });

  return res.json({ ok: true });
});


app.get("/logout", (req, res) => {
  res.clearCookie("admin_session");
  res.json({ ok: true });
});


app.use(pedidoRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
