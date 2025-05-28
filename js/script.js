const pokemonName = document.querySelector('.pokemon__name'); // Elemento para exibir o nome do Pokémon
const pokemonNumber = document.querySelector('.pokemon__number'); // Elemento para exibir o número (ID) do Pokémon
const pokemonImage = document.querySelector('.pokemon__image'); // Elemento <img> para a imagem do Pokémon

const form = document.querySelector('.form'); // Formulário de busca
const input = document.querySelector('.input__search'); // Campo de input para busca
const buttonPrev = document.querySelector('.btn-prev'); // Botão para Pokémon anterior
const buttonNext = document.querySelector('.btn-next'); // Botão para próximo Pokémon

let searchPokemon = 1; // Variável de estado: armazena o ID do Pokémon atual/a ser buscado. Inicia em 1.

// Função ASYNC para buscar dados da PokeAPI.
const fetchPokemon = async (pokemon) => {
  // Requisição HTTP GET para a API, usando o nome/ID do Pokémon.
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  // VERIFICAÇÃO CRUCIAL: Checa se a requisição foi bem-sucedida (status 200).
  if (APIResponse.status === 200) {
    const data = await APIResponse.json(); // Converte a resposta para JSON.
    return data; // Retorna os dados do Pokémon.
  }
  // Se o status não for 200, a função retorna undefined implicitamente (Pokémon não encontrado ou erro).
}

// Função ASYNC para renderizar (exibir) os dados do Pokémon na tela.
const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...'; // Feedback visual durante o carregamento.
  pokemonNumber.innerHTML = ''; // Limpa o número anterior.

  const data = await fetchPokemon(pokemon); // Chama a função de busca.

  // LÓGICA DE RENDERIZAÇÃO: Se 'data' existir (Pokémon encontrado).
  if (data) {
    pokemonImage.style.display = 'block'; // Mostra a imagem.
    pokemonName.innerHTML = data.name; // Atualiza o nome.
    pokemonNumber.innerHTML = data.id; // Atualiza o número.
    // PONTO IMPORTANTE: Caminho específico para o sprite animado desejado.
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = ''; // Limpa o campo de busca após sucesso.
    searchPokemon = data.id; // ATUALIZAÇÃO DE ESTADO: Sincroniza 'searchPokemon' com o ID do Pokémon exibido.
  } else {
    // Se 'data' for undefined (Pokémon não encontrado).
    pokemonImage.style.display = 'none'; // Esconde a imagem.
    pokemonName.innerHTML = 'Not found :c'; // Mensagem de erro.
    pokemonNumber.innerHTML = ''; // Limpa o número.
  }
}

// EVENT LISTENER: Captura a submissão do formulário.
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Previne o recarregamento da página.
  // Chama renderPokemon com o valor do input em minúsculas (padronização para a API).
  renderPokemon(input.value.toLowerCase());
});

// EVENT LISTENER: Botão "Anterior".
buttonPrev.addEventListener('click', () => {
  // LÓGICA DE NAVEGAÇÃO: Só permite voltar se não for o primeiro Pokémon.
  if (searchPokemon > 1) {
    searchPokemon -= 1; // Decrementa o ID.
    renderPokemon(searchPokemon); // Renderiza o Pokémon anterior.
  }
});

// EVENT LISTENER: Botão "Próximo".
buttonNext.addEventListener('click', () => {
  searchPokemon += 1; // Incrementa o ID.
  renderPokemon(searchPokemon); // Renderiza o próximo Pokémon.
});

// EXECUÇÃO INICIAL: Renderiza o primeiro Pokémon (ID 1) quando a página carrega.
renderPokemon(searchPokemon);
