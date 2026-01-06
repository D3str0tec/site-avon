let produtos = [];
let indexSKU = {};
let indexEAN = {};

/* =========================
   CARREGAR PRODUTOS
========================= */
fetch("./produtos.json")
  .then(res => {
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
  })
  .then(dados => {
    if (!Array.isArray(dados)) {
      throw new Error("JSON não é um array");
    }

    dados.forEach(p => {
      if (!p || !p.sku || !p.nome) return;

      const produto = {
        sku: String(p.sku).trim(),
        nome: String(p.nome).trim().toUpperCase(),
        ean: String(p.ean || "").trim()
      };

      produtos.push(produto);
      indexSKU[produto.sku] = produto;
      if (produto.ean) indexEAN[produto.ean] = produto;
    });

    console.log("Produtos válidos carregados:", produtos.length);
  })
  .catch(err => {
    console.error("Erro ao carregar produtos:", err);
    alert("Erro ao carregar produtos. Veja o console.");
  });

/* =========================
   EVENTOS
========================= */
document.getElementById("btnBuscar").addEventListener("click", buscarProduto);
document.getElementById("searchInput").addEventListener("keydown", e => {
  if (e.key === "Enter") buscarProduto();
});

/* =========================
   BUSCA
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

  let produto =
    indexSKU[termo] ||
    indexEAN[termo] ||
    produtos.find(p => p.nome && p.nome.includes(termo));

  if (!produto) {
    alert("Produto não encontrado");
    return;
  }

  document.getElementById("nomeProduto").innerText = produto.nome;
  document.getElementById("skuProduto").innerText = produto.sku;
  document.getElementById("eanProduto").innerText = produto.ean || "-";

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
