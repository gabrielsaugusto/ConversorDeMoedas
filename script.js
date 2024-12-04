// Sua chave de API
const API_KEY = "19118593b8e224275581b57a";
const BASE_URL = `https://v6.exchangerate-api.com/v6/19118593b8e224275581b57a/latest/`;

// Elementos do DOM
const moedaOrigem = document.getElementById("moeda-origem");
const moedaDestino = document.getElementById("moeda-destino");
const valor = document.getElementById("valor");
const btnConverter = document.getElementById("converter");
const resultado = document.getElementById("resultado");
const btnModoEscuro = document.getElementById("modo-escuro");

// Função para converter moedas
async function converterMoeda() {
    const origem = moedaOrigem.value;
    const destino = moedaDestino.value;
    const valorInput = parseFloat(valor.value);

    if (isNaN(valorInput) || valorInput <= 0) {
        resultado.textContent = "Por favor, insira um valor válido.";
        return;
    }

    // Adicionar efeito de loading
    btnConverter.classList.add("loading");
    resultado.textContent = "";  // Limpar o resultado anterior

    try {
        // Requisição à API
        const response = await fetch(`${BASE_URL}${origem}`);
        const data = await response.json();

        if (response.status !== 200) {
            resultado.textContent = "Erro ao acessar a API.";
            return;
        }

        // Calcular a conversão
        const taxa = data.conversion_rates[destino];
        const valorConvertido = (valorInput * taxa).toFixed(2);

        // Exibir o resultado com fade-in
        resultado.textContent = `${valorInput} ${origem} equivale a ${valorConvertido} ${destino}`;
        resultado.classList.add("show");  // Ativar o efeito fade-in
    } catch (error) {
        resultado.textContent = "Erro na conversão. Tente novamente.";
        console.error(error);
    } finally {
        // Remover o efeito de loading
        btnConverter.classList.remove("loading");
    }
}

// Adicionar evento ao botão
btnConverter.addEventListener("click", converterMoeda);

// Adicionar o evento de alternância do modo escuro
if (localStorage.getItem("modo-escuro") === "true") {
    document.body.classList.add("dark-mode");
    btnModoEscuro.textContent = "Modo Claro";  // Muda o texto para "Modo Claro"
}

btnModoEscuro.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Alterar o texto do botão
    if (document.body.classList.contains("dark-mode")) {
        btnModoEscuro.textContent = "Modo Claro";  // Muda para "Modo Claro"
        localStorage.setItem("modo-escuro", "true");
    } else {
        btnModoEscuro.textContent = "Modo Escuro";  // Muda para "Modo Escuro"
        localStorage.setItem("modo-escuro", "false");
    }
});