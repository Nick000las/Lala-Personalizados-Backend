import { Router } from "express";
import authAdmin from "../middleWare/authAdmin.js";
import PedidoController from "../controllers/PedidoController.js";

const router = Router();

router.get("/pedidos", authAdmin, PedidoController.listar);
router.post("/pedidos", PedidoController.criar);
router.put("/pedidos/:id", authAdmin, PedidoController.atualizar);
router.delete("/pedidos/:id", authAdmin, PedidoController.deletar);

export default router;
