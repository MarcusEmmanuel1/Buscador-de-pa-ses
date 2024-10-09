// Função para pegar o parâmetro 'id' da URL
function getPaisId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id'); // Pega o valor do parâmetro 'id'
}

// Função para buscar os detalhes do país
async function buscarPaisDetalhes() {
    const paisId = getPaisId(); // Obtenha o ID do país
    const resposta = await fetch(`https://restcountries.com/v3.1/alpha/${paisId}`);
    const pais = await resposta.json();
    
    // Exibir as informações no HTML
    mostrarDetalhesDoPais(pais[0]); // O retorno é uma lista com um item
}

// Função para mostrar os detalhes do país
function mostrarDetalhesDoPais(pais) {
    const paisDetalhes = document.getElementById("paisDetalhes");
    paisDetalhes.innerHTML = `
        <h2>${pais.translations.por.official}</h2>
        <img src="${pais.flags.png}" alt="Bandeira de ${pais.translations.por.common}" style="width: 200px;">
        <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : 'N/A'}</p>
        <p><strong>Língua:</strong> ${Object.values(pais.languages).join(", ")}</p>
        <p><strong>Moeda:</strong> ${Object.values(pais.currencies)[0].name} - ${Object.values(pais.currencies)[0].symbol}</p>
        <p><strong>Continente:</strong> ${pais.continents[0]}</p>
        <p><strong>População:</strong> ${pais.population.toLocaleString()}</p>
        <p><strong>Área Geográfica:</strong> ${pais.area.toLocaleString()} km²</p>
        <p><strong>Link para o mapa:</strong> <a href="https://www.google.com/maps/search/?api=1&query=${pais.translations.por.common}" target="_blank">Ver no Google Maps</a></p>
    `;

    // Adicionando o mapa com a localização da capital
    const map = L.map('map').setView(pais.capitalInfo.latlng || [-54.4285, -36.5861], 5); // Usando coordenadas da API, se disponíveis

    // Adicionando a camada do mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Marcando a localização da capital
    const capital = pais.capital ? pais.capital[0] : 'N/A';
    const [lat, lng] = pais.capitalInfo.latlng || [-54.4285, -36.5861]; // Coordenadas padrão, se não disponíveis
    L.marker([lat, lng]).addTo(map).bindPopup(`${capital}`).openPopup();
}

// Inicializa a busca de detalhes do país ao carregar a página
buscarPaisDetalhes();
