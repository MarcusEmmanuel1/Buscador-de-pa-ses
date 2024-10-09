var todosPaises = [];
var todosPaisesDiv = document.querySelector(".todosPaises");
var qtPaises = document.querySelector("#qtPaises");

async function consultarPaises() {
    var resposta = await fetch("https://restcountries.com/v3.1/all");
    var dados = await resposta.json();
    todosPaises = dados;
    mostrarPaises(todosPaises);
}

function filtroPaises() {
    var botoes = document.querySelectorAll("input[name='filtros']");
    var paisBuscado = [];
    
    for (pais of todosPaises) {
        for (let i = 0; i < botoes.length; i++) {
            if (botoes[i].checked) {
                if (botoes[i].value == "all") {
                    paisBuscado.push(pais);
                } else if (botoes[i].value == "Central America" && pais.subregion == "Central America") {
                    paisBuscado.push(pais);
                } else if (pais.continents && pais.continents[0] == botoes[i].value) {
                    paisBuscado.push(pais);
                }
            }
        }
    }

    qtPaises.innerHTML = paisBuscado.length;
    todosPaisesDiv.innerHTML = "";
    mostrarPaises(paisBuscado);
}

function mostrarPaises(paises) {
    for (pais of paises) {
        var paisDiv = document.createElement("div");
        paisDiv.classList.add("pais");
        paisDiv.innerHTML = `
            <a style="text-decoration: none; color: inherit" href="info.html?id=${pais.cca2}" target="_blank">
                <img style="width: 120px" src="${pais.flags.png}" alt="${pais.flags.alt}"/>
                <p>${pais.translations.por.common}</p>
            </a>
        `;
        todosPaisesDiv.appendChild(paisDiv);
    }
}

function buscarPaises(value) {
    var paisBuscado = [];
    var botoes = document.querySelectorAll("input[name='filtros']");
    var continenteSelecionado = null;

    for (let i = 0; i < botoes.length; i++) {
        if (botoes[i].checked) {
            continenteSelecionado = botoes[i].value;
            break;
        }
    }

    for (pais of todosPaises) {
        var nome = pais.translations.por.common.toLowerCase();
        
        if (nome.startsWith(value.toLowerCase())) {
            if (continenteSelecionado == "all" || 
                (continenteSelecionado == "Central America" && pais.subregion == "Central America") ||
                (pais.continents && pais.continents[0] == continenteSelecionado)) {
                paisBuscado.push(pais);
            }
        }
    }

    todosPaisesDiv.innerHTML = "";
    qtPaises.innerHTML = paisBuscado.length;
    mostrarPaises(paisBuscado);
}

// Inicializa a consulta de países ao carregar a página
consultarPaises();
