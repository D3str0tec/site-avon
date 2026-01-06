let produtos = [];

/* =========================
   CARREGAR CSV
========================= */
fetch("produtos.csv")
  .then(response => response.text())
  .then(texto => {
    const linhas = texto.split("\n");

    for (let i = 1; i < linhas.length; i++) {
      const linha = linhas[i].trim();
      if (!linha) continue;

      const valores = linha.split(",");

      produtos.push({
        sku: valores[0]?.trim(),
        ean: valores[1]?.trim(),
        nome: valores[2]?.trim().toUpperCase()
      });
    }

    console.log("Produtos carregados:", produtos.length);
  })
  .catch(err => console.error("Erro ao carregar CSV:", err));

/* =========================
   BUSCAR PRODUTO
========================= */
function buscarProduto() {
  const termo = document
    .getElementById("searc
