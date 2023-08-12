class CaixaDaLanchonete {

    calcularValorDaCompra(formaDePagamento, itens) {
        const cardapio = {
            cafe: { descricao: "Café", valor: 3.0 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
            suco: { descricao: "Suco Natural", valor: 6.2 },
            sanduiche: { descricao: "Sanduíche", valor: 6.5 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 }
        };
        const formasDePagamento = ["dinheiro", "debito", "credito"];
        const descontos = { dinheiro: 0.95, debito: 1, credito: 1.03 };

        if (!formasDePagamento.includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = 0;
        let chantilyAcompanhandoCafe = false;
        let queijoAcompanhandoSanduiche = false;

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(",");
            const itemCardapio = cardapio[codigo];

            if (!itemCardapio) {
                return "Item inválido!";
            }
            
            const qunatidade = parseInt(quantidade);

            if (qunatidade <= 0 || quantidade == 0) {
                return "Quantidade inválida!";
            }

            if (itemCardapio.descricao.includes("extra")) {
                if (itemCardapio.descricao.includes("Chantily") && chantilyAcompanhandoCafe) {
                    valorTotal += itemCardapio.valor * parseInt(quantidade);
                } else if (itemCardapio.descricao.includes("Queijo") && queijoAcompanhandoSanduiche) {
                    valorTotal += itemCardapio.valor * parseInt(quantidade);
                } else {
                    return "Item extra não pode ser pedido sem o principal";
                }
            } else {
                const parsedQuantity = parseInt(quantidade);
                valorTotal += itemCardapio.valor * parsedQuantity;

                if (itemCardapio.descricao === "Café") {
                    chantilyAcompanhandoCafe = true;
                } else if (itemCardapio.descricao === "Sanduíche") {
                    queijoAcompanhandoSanduiche = true;
                }
            }
        }

        if (formaDePagamento === "dinheiro") {
            valorTotal *= descontos.dinheiro;
        } else if (formaDePagamento === "credito") {
            valorTotal *= descontos.credito;
        }

        return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
    }
}

export { CaixaDaLanchonete };
