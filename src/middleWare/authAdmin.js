import dotenv from "dotenv";
dotenv.config();

export default function authAdmin(req, res, next) {
  const keyFromHeader = req.headers["x-api-key"];
  const keyFromCookie = req.cookies && req.cookies.admin_session;
  const valid = (keyFromHeader === process.env.ADMIN_KEY) || (keyFromCookie === process.env.ADMIN_KEY);

  if (!valid) {
    return res.status(401).json({ erro: "Acesso não autorizado" });
  }

  next();
}
