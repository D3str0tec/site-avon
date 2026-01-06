let produtos = [];
let indexSKU = {};
let indexEAN = {};

/* =========================
   CARREGAR JSON
========================= */
fetch("./produtos.json")
  .then(res => {
    if (!res.ok) throw new Error("Arquivo produtos.json não encontrado");
    return res.json();
  })
  .then(dados => {
    produtos = dados.map(p => {
      const produto = {
        sku: p.sku.trim(),
        nome: p.nome.trim().toUpperCase(),
        ean: p.ean.trim()
      };

      indexSKU[produto.sku] = produto;
      indexEAN[produto.ean] = produto;

      return produto;
    });

    console.log("Produtos carregados:", produtos.length);
  })
  .catch(err => {
    console.error(err);
    alert("Erro ao carregar produtos");
  });

/* =========================
   BUSCA
========================= */
document.getElementById("btnBuscar").addEventListener("click", buscarProduto);
document.getElementById("searchInput").addEventListener("keydown", e => {
  if (e.key === "Enter") buscarProduto();
});

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
    produtos.find(p => p.nome.includes(termo));

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
