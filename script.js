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
        nome: valores[1]?.trim().toUpperCase(),
        ean: valores[2]?.trim()
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
    .getElementById("searchInput")
    .value
    .trim()
    .toUpperCase();

  if (!termo) {
    alert("Digite um SKU, EAN ou nome");
    return;
  }

  const produto = produtos.find(p =>
    p.sku === termo ||
    p.ean === termo ||
    p.nome.includes(termo)
  );

  if (!produto) {
    alert("Produto não encontrado");
    return;
  }

  document.getElementById("nomeProduto").innerText = produto.nome;
  document.getElementById("skuProduto").innerText = produto.sku;
  document.getElementById("eanProduto").innerText = produto.ean;

  gerarCodigoBarras(produto.ean || produto.sku);
}

/* =========================
   CÓDIGO DE BARRAS
========================= */
function gerarCodigoBarras(valor) {
  JsBarcode("#barcode", valor, {
    format: "CODE128",
    width: 2,
    height: 80,
    displayValue: true
  });
}
