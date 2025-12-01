import supabase from "../config/supabase.js";

const PedidoModel = {
  async criarPedido({
    nome_cliente,
    email,
    telefone,
    itens,
    total_itens,
    endereco,
    template_id
  }) {
    const { data, error } = await supabase
      .from("pedidos")
      .insert({
        nome_cliente,
        status: "pendente",
        email,
        telefone,
        itens: { itens, template_id },
        total_itens,
        endereco,
        template_id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from("pedidos")
      .select("*");

    if (error) throw error;
    return data;
  },

  async atualizarPedido(id, dadosPedido) {
    const { data, error } = await supabase
      .from("pedidos")
      .update(dadosPedido)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }
    return data;
  },

  async deletarPedido(id) {
    const { error } = await supabase.from("pedidos").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};

export default PedidoModel;
