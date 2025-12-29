function buscarProduto() {
    const skuDigitado = document.getElementById("sku").value;

    // Base de dados simples (por enquanto)
    const produtos = {
        "50608475": {
            nome: "AVON CARE CREME DEPILATORIO CORPO 125G",
            ean: "7909189384266"
        }
    };

    const resultado = document.getElementById("resultado");

    if (produtos[skuDigitado]) {
        resultado.innerHTML = `
            <h3>${produtos[skuDigitado].nome}</h3>
            <p><strong>SKU:</strong> ${skuDigitado}</p>
            <p><strong>EAN:</strong> ${produtos[skuDigitado].ean}</p>
            <img 
              src="https://barcode.tec-it.com/barcode.ashx?data=${produtos[skuDigitado].ean}&code=EAN13"
              alt="Código de Barras">
        `;
    } else {
        resultado.innerHTML = "<p>Produto não encontrado</p>";
    }
}
