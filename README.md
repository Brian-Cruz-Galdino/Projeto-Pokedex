# Pokédex Interativa

Uma aplicação web simples e interativa que simula uma Pokédex, permitindo aos usuários visualizar informações sobre diferentes Pokémon. Este projeto utiliza a [PokeAPI](https://pokeapi.co/) para buscar dados em tempo real.

## 📜 Sumário

* [Sobre o Projeto](#sobre-o-projeto)
* [✨ Funcionalidades](#-funcionalidades)
* [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
* [🚀 Como Executar](#-como-executar)
* [📂 Estrutura de Arquivos](#-estrutura-de-arquivos)
* [🧠 Lógica Principal](#-lógica-principal)

## Sobre o Projeto

Esta Pokédex foi criada para demonstrar a integração com APIs externas e a manipulação dinâmica do DOM com JavaScript. Ela exibe o nome, número (ID) e uma imagem animada do Pokémon pesquisado ou navegado.

## ✨ Funcionalidades

* **Visualização de Pokémon:** Exibe o nome, número e imagem do Pokémon.
* **Busca por Nome ou Número:** Permite ao usuário pesquisar um Pokémon específico digitando seu nome ou ID na barra de busca.
* **Navegação Sequencial:** Botões "Prev" e "Next" para navegar entre os Pokémon em ordem numérica.
* **Feedback Visual:** Mostra o estado de "Loading..." durante a busca e "Not found :c" caso o Pokémon não seja encontrado.
* **Sprites Animados:** Utiliza sprites animados da Geração V (Black & White) dos Pokémon.
* **Design Responsivo (Básico):** Estrutura HTML preparada para estilização responsiva.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura da página.
* **CSS3:** Estilização dos componentes (referenciado em `style.css`).
* **JavaScript (ES6+):** Lógica da aplicação, manipulação do DOM e requisições à API.
    * `async/await` para chamadas assíncronas.
    * `Fetch API` para buscar dados da PokeAPI.
* **PokeAPI:** Fonte de dados dos Pokémon.

## 🚀 Como Executar

1.  Clone este repositório:
    ```bash
    git clone <url-do-seu-repositorio>
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd <nome-do-diretorio-do-projeto>
    ```
3.  Abra o arquivo `index.html` em seu navegador de preferência.

Não são necessárias instalações de dependências adicionais para rodar este projeto, apenas um navegador web moderno.

## 📂 Estrutura de Arquivos

.
├── css/
│   └── style.css        # Folha de estilos principal
├── favicons/
│   └── favicon-16x16.png # Favicon da aplicação
├── images/
│   └── pokedex.png      # Imagem de fundo da Pokédex
├── js/
│   └── script.js        # Lógica principal da Pokédex
└── index.html           # Arquivo HTML principal da Pokédex

## 🧠 Lógica Principal (`script.js`)

O arquivo `script.js` é responsável por:
1.  Selecionar os elementos HTML necessários para manipulação (nome, número, imagem do Pokémon, formulário, botões).
2.  Manter uma variável (`searchPokemon`) para o ID do Pokémon atual, iniciando com `1`.
3.  **`fetchPokemon(pokemon)`:** Uma função assíncrona que faz uma requisição à PokeAPI (`https://pokeapi.co/api/v2/pokemon/{pokemon}`). Se a resposta for bem-sucedida (status 200), retorna os dados do Pokémon em JSON; caso contrário, retorna `undefined`.
4.  **`renderPokemon(pokemon)`:**
    * Exibe "Loading..." no nome do Pokémon.
    * Chama `fetchPokemon` para buscar os dados.
    * Se os dados forem recebidos:
        * Atualiza o nome, número e a imagem do Pokémon (especificamente o sprite animado de Black & White).
        * Limpa o campo de busca.
        * Atualiza `searchPokemon` com o ID do Pokémon exibido.
    * Se os dados não forem encontrados, exibe "Not found :c" e esconde a imagem.
5.  **Event Listeners:**
    * Para o `submit` do formulário: previne o comportamento padrão e chama `renderPokemon` com o valor do input (convertido para minúsculas).
    * Para o clique no botão "Prev": decrementa `searchPokemon` (se maior que 1) e chama `renderPokemon`.
    * Para o clique no botão "Next": incrementa `searchPokemon` e chama `renderPokemon`.
6.  **Execução Inicial:** Chama `renderPokemon(searchPokemon)` para carregar o primeiro Pokémon quando a página é aberta.
