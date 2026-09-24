# 🐱 Cat API

Aplicação web desenvolvida em **React** para explorar, analisar e visualizar dados sobre diferentes raças de gatos utilizando a [The Cat API](https://thecatapi.com/).

O projeto combina **consumo de API, processamento de dados, filtros, análise exploratória e visualização de informações** em uma interface interativa e responsiva.

Além da exploração individual das raças, a aplicação transforma os dados disponibilizados pela API em diferentes indicadores e visualizações, permitindo analisar características como origem, temperamento, nível de energia, inteligência, necessidades sociais e compatibilidade com diferentes ambientes.

## 🚀 Demo

**Acesse a aplicação:**
https://italomarcony.github.io/teste-catapi/

---

## ✨ Funcionalidades

### 🐱 Exploração de raças

A aplicação disponibiliza uma interface para consultar e explorar as raças retornadas pela API.

É possível:

* Pesquisar raças por **nome, origem ou temperamento**.
* Ordenar os resultados por diferentes características.
* Filtrar as raças de acordo com seus atributos.
* Visualizar informações detalhadas de cada raça.
* Consultar imagens associadas às raças.
* Navegar entre diferentes raças sem sair da aplicação.

Entre os filtros disponíveis estão:

* Nível de energia.
* Origem.
* Compatibilidade com crianças.
* Compatibilidade com cães.
* Adequação para ambientes internos.

---

## 📊 Dados e análise

Um dos principais objetivos do projeto é transformar os dados disponibilizados pela API em informações que possam ser exploradas de maneira mais intuitiva.

Os dados das raças possuem diversos atributos que podem ser utilizados para realizar análises e comparações, como:

* Origem.
* Temperamento.
* Inteligência.
* Nível de energia.
* Necessidade de exercícios.
* Sociabilidade.
* Adaptabilidade.
* Expectativa de vida.
* Peso.
* Compatibilidade com crianças.
* Compatibilidade com outros animais.
* Adequação para ambientes internos.

A aplicação utiliza esses atributos para criar filtros, classificações, comparações e indicadores.

Dessa forma, o projeto vai além de simplesmente exibir os dados recebidos da API: os dados são **organizados e utilizados como base para diferentes formas de exploração e visualização**.

---

## 📈 Dashboard

O projeto possui um dashboard dedicado à análise dos dados das raças.

Os dados coletados da API são utilizados para gerar diferentes visualizações, permitindo observar padrões e distribuições presentes no conjunto de dados.

Entre as análises disponíveis estão:

* Distribuição das raças por origem.
* Temperamentos mais frequentes.
* Distribuição dos níveis de energia.
* Necessidade de exercícios.
* Características sociais.
* Adequação para famílias.
* Características relacionadas à saúde e bem-estar.
* Relação entre diferentes atributos das raças.

Os gráficos são construídos utilizando **Chart.js**, permitindo transformar os dados estruturados em representações visuais mais fáceis de interpretar.

### 📊 Exemplos de análises

A partir dos dados disponíveis, é possível responder perguntas como:

> Quais origens possuem maior quantidade de raças cadastradas?

> Quais características de temperamento aparecem com maior frequência?

> Como os níveis de energia se distribuem entre as raças?

> Quais raças apresentam maior compatibilidade com crianças ou cães?

> Como diferentes características se relacionam dentro do conjunto de raças?

Essas análises demonstram uma aplicação prática de **exploração e visualização de dados dentro de uma aplicação web**.

---

## 🔎 Filtragem e exploração dos dados

A aplicação permite combinar diferentes filtros para explorar subconjuntos específicos dos dados.

Por exemplo, o usuário pode selecionar raças que:

* Possuam determinado nível de energia;
* Sejam adequadas para ambientes internos;
* Possuam determinada origem;
* Apresentem determinada compatibilidade com crianças;
* Possuam determinadas características de temperamento.

Além dos filtros, os dados podem ser ordenados por diferentes atributos, facilitando a identificação de raças com determinadas características.

Esse processo permite transformar um conjunto de dados relativamente grande em informações mais específicas de acordo com o objetivo da análise.

---

## 🔄 Comparação de dados

A funcionalidade de comparação permite analisar diferentes raças lado a lado.

Em vez de consultar cada raça individualmente, o usuário pode selecionar diferentes registros e comparar seus principais atributos.

Isso permite observar diferenças relacionadas a:

* Inteligência.
* Energia.
* Sociabilidade.
* Adaptabilidade.
* Expectativa de vida.
* Peso.
* Compatibilidade.
* Características comportamentais.

A comparação funciona como uma forma de **análise exploratória**, facilitando a identificação de diferenças e similaridades entre os registros.

---

## 🎯 Quiz

O projeto também possui um quiz interativo baseado nas características das raças.

As respostas do usuário são utilizadas para identificar quais características são mais compatíveis com suas preferências e apresentar raças relacionadas ao perfil selecionado.

Essa funcionalidade utiliza os próprios dados obtidos da API para criar uma experiência de interação diferente com o conjunto de dados.

---

## 🌐 Consumo da API

Os dados utilizados pela aplicação são obtidos através da **The Cat API**.

Endpoint principal:

```http
GET /breeds
```

Esse endpoint fornece informações estruturadas sobre as raças, incluindo seus diferentes atributos.

Para obter imagens relacionadas a uma determinada raça:

```http
GET /images/search?breed_ids={breedId}&limit={limit}
```

A comunicação com a API foi centralizada em um serviço específico da aplicação, separando a camada responsável pela obtenção dos dados da camada de apresentação.

---

## 🔄 Fluxo dos dados

O funcionamento do projeto pode ser representado de forma simplificada pelo seguinte fluxo:

```text
┌─────────────────┐
│   The Cat API   │
└────────┬────────┘
         │
         │ Dados das raças
         ▼
┌─────────────────┐
│ Serviço da API  │
└────────┬────────┘
         │
         │ Dados estruturados
         ▼
┌──────────────────────────┐
│ React / Processamento    │
│ e manipulação dos dados  │
└──────────┬───────────────┘
           │
     ┌─────┼─────────┐
     ▼     ▼         ▼
  Filtros  Busca   Comparação
     │     │         │
     └─────┼─────────┘
           ▼
   ┌───────────────┐
   │   Dashboard   │
   │  e Gráficos   │
   └───────────────┘
```

Esse fluxo representa uma arquitetura em que os dados são obtidos externamente, disponibilizados para a aplicação e posteriormente utilizados em diferentes processos de exploração e visualização.

---

## 🧮 Manipulação dos dados

Depois de obtidos da API, os registros são utilizados pela aplicação para diferentes operações, como:

* Filtragem de registros.
* Ordenação.
* Busca textual.
* Agrupamento por características.
* Comparação entre registros.
* Cálculo e apresentação de indicadores.
* Preparação dos dados para gráficos.

Essas operações permitem trabalhar com os dados de maneira semelhante a um processo de **análise exploratória**, porém integrado diretamente à interface da aplicação.

---

## 📊 Visualização de dados

Para representar os dados de forma visual, o projeto utiliza **Chart.js** através do **React Chart.js 2**.

A visualização facilita a interpretação de informações que seriam menos intuitivas quando apresentadas apenas em tabelas ou textos.

Os gráficos permitem observar:

* Distribuições;
* Frequências;
* Categorias;
* Comparações;
* Relações entre características.

A escolha da visualização depende do tipo de informação que está sendo analisada, permitindo apresentar diferentes perspectivas sobre o mesmo conjunto de dados.

---

## 🛠️ Tecnologias

### Frontend

* **React 18**
* **JavaScript**
* **React Router**
* **Tailwind CSS**

### Dados e visualização

* **The Cat API**
* **Chart.js**
* **React Chart.js 2**
* JavaScript para filtragem, ordenação e manipulação dos dados

### Desenvolvimento e deploy

* **Git**
* **GitHub**
* **GitHub Pages**
* **Create React App**

---

## 🌙 Interface

A interface foi desenvolvida com foco em responsividade e facilidade de exploração.

O projeto possui:

* Layout responsivo.
* Componentes reutilizáveis.
* Tema claro e escuro.
* Cards para apresentação das raças.
* Modais para informações detalhadas.
* Gráficos interativos.
* Navegação entre diferentes funcionalidades.

---

## 🎓 Objetivos do projeto

O projeto foi desenvolvido como uma forma prática de consolidar conhecimentos em **desenvolvimento web e manipulação de dados**.

Entre os principais objetivos estão:

### Desenvolvimento

* Construção de aplicações utilizando React.
* Desenvolvimento de componentes reutilizáveis.
* Implementação de rotas.
* Consumo de APIs REST.
* Criação de interfaces responsivas.
* Implementação de temas claro e escuro.

### Dados

* Consumo e interpretação de dados provenientes de uma API.
* Manipulação de dados estruturados.
* Filtragem e ordenação de registros.
* Exploração de diferentes atributos.
* Criação de indicadores.
* Comparação de conjuntos de dados.
* Visualização de dados através de gráficos.
* Desenvolvimento de uma interface para exploração de dados.

O projeto busca demonstrar como **dados obtidos através de uma API podem ser transformados em informações úteis por meio de processamento, análise e visualização**, utilizando uma aplicação web como interface.

---

## 📚 Aprendizados

Durante o desenvolvimento, foram trabalhados conceitos relacionados a:

* Consumo de APIs REST.
* Estruturação e manipulação de dados em JavaScript.
* React Hooks.
* Gerenciamento de estado.
* React Router.
* Filtragem e ordenação de dados.
* Visualização de dados.
* Construção de dashboards.
* Componentização.
* Design responsivo.
* Deploy de aplicações frontend.
* Integração entre dados e interface.

Um dos principais aprendizados foi compreender como uma aplicação pode atuar como uma camada de **exploração e visualização sobre dados obtidos de uma fonte externa**, conectando conceitos de desenvolvimento frontend e análise de dados.

---

## ⚙️ Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/italomarcony/cat-api.git
```

### 2. Entre no diretório

```bash
cd cat-api
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure a API Key

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_CAT_API_KEY=sua_api_key
```

Uma API Key pode ser obtida gratuitamente através da The Cat API.

### 5. Execute a aplicação

```bash
npm start
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

---

## 📦 Scripts

### Desenvolvimento

```bash
npm start
```

Executa a aplicação em modo de desenvolvimento.

### Build

```bash
npm run build
```

Gera a versão otimizada para produção.

### Testes

```bash
npm test
```

Executa os testes configurados no projeto.

### Deploy

```bash
npm run deploy
```

Realiza o deploy da aplicação através do GitHub Pages.

---

## 👨‍💻 Autor

**Italo Marcony**

Desenvolvedor de Software

* GitHub: https://github.com/italomarcony
* Portfólio: https://italomarcony.vercel.app/

---

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e portfólio.
