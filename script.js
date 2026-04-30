let contador = 2; // já existe o INC001
let incidenteSelecionado = null;

// CRIAR NOVO INCIDENTE
function criarIncidente() {
  contador++;

  const lista = document.getElementById("lista-incidentes");

  const novo = document.createElement("div");
  novo.className = "incidente";

  const id = "INC" + String(contador).padStart(3, "0");

  novo.innerHTML = `
    <p><strong>${id}</strong> - Novo incidente criado</p>
    <p>Status: <span class="status-aberto">ABERTO</span></p>
    <button onclick="alterarStatus(this)">Alterar Status</button>
  `;

  // clicar no incidente mostra detalhes
  novo.onclick = function () {
    mostrarDetalhes(id, novo);
  };

  lista.appendChild(novo);
}

// ALTERAR STATUS
function alterarStatus(botao) {
  const statusSpan = botao.parentElement.querySelector("span");

  if (statusSpan.textContent === "ABERTO") {
    statusSpan.textContent = "EM ANDAMENTO";
    statusSpan.className = "status-andamento";
  } else if (statusSpan.textContent === "EM ANDAMENTO") {
    statusSpan.textContent = "RESOLVIDO";
    statusSpan.className = "status-resolvido";
  } else {
    statusSpan.textContent = "ABERTO";
    statusSpan.className = "status-aberto";
  }

  // atualiza detalhes se for o selecionado
  if (incidenteSelecionado) {
    const id = incidenteSelecionado.querySelector("strong").textContent;
    mostrarDetalhes(id, incidenteSelecionado);
  }
}

// MOSTRAR DETALHES (tipo log)
function mostrarDetalhes(id, elemento) {
  incidenteSelecionado = elemento;

  const detalhes = document.getElementById("detalhes");

  const status = elemento.querySelector("span").textContent;

  let mensagem = "";

  if (status === "ABERTO") {
    mensagem = "Incidente registrado e aguardando análise.";
  } else if (status === "EM ANDAMENTO") {
    mensagem = "Equipe atuando na resolução do problema.";
  } else if (status === "RESOLVIDO") {
    mensagem = "Incidente resolvido com sucesso.";
  }

  detalhes.innerHTML = `<p><strong>${id}</strong></p><p>Carregando...</p>`;

  setTimeout(() => {
    detalhes.innerHTML = `
      <p><strong>${id}</strong></p>
      <p>> ${mensagem}</p>
    `;
  }, 500);
}

// FILTRAR INCIDENTES
function filtrarIncidentes(valor) {
  const incidentes = document.querySelectorAll(".incidente");

  incidentes.forEach(inc => {
    const texto = inc.textContent.toLowerCase();

    if (texto.includes(valor.toLowerCase())) {
      inc.style.display = "block";
    } else {
      inc.style.display = "none";
    }
  });
}

// FAZER OS INCIDENTES INICIAIS FUNCIONAREM
document.querySelectorAll(".incidente").forEach(inc => {
  inc.onclick = function () {
    const id = inc.querySelector("strong").textContent;
    mostrarDetalhes(id, inc);
  };
});
