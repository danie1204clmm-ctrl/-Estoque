const form = document.getElementById("form-produto");
const lista = document.getElementById("lista-produtos");
const filtro = document.getElementById("filtro"); // input de busca

let produtos = [];

// ---- Persistência no localStorage ----
function salvar() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function carregar() {
  const dados = localStorage.getItem("produtos");
  produtos = dados ? JSON.parse(dados) : [];
}

// ---- Renderização ----
function atualizarTabela(filtroTexto = "") {
  lista.innerHTML = "";
  produtos.forEach((p, index) => {
    if (p.nome.toLowerCase().includes(filtroTexto.toLowerCase())) {
      lista.innerHTML += `
        <tr>
          <td>${p.nome}</td>
          <td>${p.quantidade}</td>
          <td>R$ ${p.preco.toFixed(2)}</td>
          <td>
            <button onclick="removerProduto(${index})">Remover</button>
          </td>
        </tr>
      `;
    }
  });
}

// ---- Adicionar produto ----
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const preco = parseFloat(document.getElementById("preco").value);

  produtos.push({ nome, quantidade, preco });
  salvar();
  atualizarTabela();
  form.reset();
});

// ---- Remover produto ----
function removerProduto(index) {
  produtos.splice(index, 1);
  salvar();
  atualizarTabela();
}

// ---- Filtro / Busca ----
filtro.addEventListener("input", (e) => {
  atualizarTabela(e.target.value);
});

// ---- Inicialização ----
carregar();
atualizarTabela();
