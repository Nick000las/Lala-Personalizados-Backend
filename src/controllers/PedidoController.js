import PedidoModel from "../models/PedidoModel.js";

const PedidoController = {
  async criar(req, res) {
    try {
      const { nome_cliente, email, telefone, itens, total_itens, endereco, template_id } = req.body;

      const pedido = await PedidoModel.criarPedido({
        nome_cliente,
        email,
        telefone,
        itens,
        total_itens,
        endereco,
        template_id
      });

      res.json({ pedido });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async listar(req, res) {
    try {
      const pedidos = await PedidoModel.getAll();
      res.json({ pedidos });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const dadosPedido = req.body;

      const pedido = await PedidoModel.atualizarPedido(id, dadosPedido);

      if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" });
      }

      res.json({ pedido });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await PedidoModel.deletarPedido(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },
};

export default PedidoController;
