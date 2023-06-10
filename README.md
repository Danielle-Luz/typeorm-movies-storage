<h1 align="center">Typeorm Movies Storage</h1>

<p align="center">
    <img alt="Badge indicando que o projeto foi criado em fevereiro de 2023" src="https://img.shields.io/badge/Data%20de%20cria%C3%A7%C3%A3o-Fevereiro%2F2023-blue">
    <img alt="Badge indicando que o status do projeto é 'concluído'" src="https://img.shields.io/badge/Status-Concluído-yellow">
</p>

## Índice

• <a href="#descricao">Descrição</a>
<br>
• <a href="#tecnologias">Tecnologias</a>
<br>
• <a href="#bd">Banco de dados</a>
<br>
• <a href="#endpoints">Endpoints do serviço</a>
<br>
• <a href="#entradas-responses">Endpoints, entradas e responses</a>
<br>
• <a href="#Desenvolvedora">Desenvolvedora</a>
<br>
<p align="center">
</p>


<h2 id="descricao">Descrição</h2>
CRUD de filmes feito com Typescript e Express, com o uso de TypeORM para construção e manipulação da base de dados, serialização de entradas/saídas e paginação.

<h2 id="tecnologias">Tecnologias</h2>

- Typescript
- Express
- NodeJS
- PostgreSQL
- TypeORM

<h2 id="bd">Banco de dados</h2>

| SGBD | MER |
|------|-----|
| PostgreSQL | [Diagrama MER da base de dados](movies-mer.png) |

### Especificações da tabela `movies`
* **Nome da tabela**: movies
* **Colunas da tabela**
  * **id**: inteiro, sequencial e chave primária.
  * **name**: caractere, tamanho máximo de 20 e obrigatório.
  * **email**: caractere, tamanho máximo de 100, único e obrigatório.
  * **password**: caractere, tamanho máximo de 120 e obrigatório.
  * **admin**: booleano, obrigatório e falso por padrão.
  * **active**: booleano, obrigatório e verdadeiro por padrão.

<h2 id="endpoints">Endpoints do serviço</h2>

| Método | Endpoint        | Responsabilidade               |
| ------ | --------------- | ------------------------------ |
| POST   | /movies         | Criação de filmes.             |
| GET    | /movies         | Lista todos os movies.         |
| PATCH  | /movies/:id     | Atualiza o filme passado por id.|
| DELETE | /movies/:id     | Deleta o filme passado por id.  |


<h2 id="entradas-responses">Endpoints, entradas e responses</h2>

### **POST `/movies`**
### *Regras de negócio*
* Caso de sucesso:
  * **Envio**: Um objeto contendo os dados do filme a ser criado.
  * **Retorno**: Um objeto contendo os dados do filme criado.
  * **Status**: 201 CREATED.

**Exemplo de envio**:

```json
{
  "duration": 60,
  "name": "Out of bounds",
  "price": 200
}
```

**Exemplo de retorno**:

```json
{
  "id": 1,
  "duration": 60,
  "name": "Out of bounds",
  "description": null,
  "price": 200
}
```

### *Casos de erro*
* **Envio**: Um objeto contendo o nome de um filme já existente.
* **Retorno**: Um objeto contendo uma mensagem de erro.
* **Status**: 409 UNIQUE.

**Exemplo de envio**:

```json
{
  "duration": 60,
  "name": "Out of bounds",
  "price": 200
}
```

**Exemplo de retorno**:

```json
{
  "message": "Movie already exists."
}
```

* **Envio**: Um objeto contendo dados em formato inválido.
* **Retorno**: Um objeto indicando em quais campos os dados têm formato inválido.
* **Status**: 400 BAD REQUEST.

**Exemplo de envio**:

```json
{
  "duration": "60",
  "name": 123,
  "price": 200
}
```

**Exemplo de retorno**:

```json
{
  "name": [ "Expected string, received number" ],
  "duration": [ "Expected number, received string" ],
}
```

### **GET `/movies`**
### *Regras de negócio*
* Contém paginação utilizando os query params **page** e **perPage**.
* Contém ordenação utilizando os query params **sort** e **order**.

* Query Params:
  * **page** e **perPage**:
    * Por padrão, **page** é **1** e **perPage** é **5**.
    * Se **page** ou **perPage** forem valores negativos ou não forem números, utiliza os valores padrões.
    * Se **perPage** for maior que **5**, utiliza o valor padrão.
  * **sort** e **order**:
    * Valores possíveis para **sort**: "**price**" e "**duration**".
    * Valores possíveis para **order**: "**asc**" e "**desc**". Padrão é **asc**,
    * Se apenas **order** é enviado, a ordenação não é feita.
    * Se apenas **sort** é enviado, a ordenação é feita seguindo o padrão de **order**.
    * Se o valor enviado de **sort** e **order** não são os valores possíveis, a ordenação não é feita.
    * Caso os valores enviados sejam os valores possíveis, ordena seguindo a coluna e a cláusula.
* Objeto de paginação:
  * previousPage: Uma string representando qual a URL da página anterior.
    * Caso não exista, retorna **null**.
  * nextPage: Uma string representando qual a URL da próxima página.
    * Caso não exista, retorna **null**.
  * count: Quantidade de valores retornados.
  * data: Um array contendo os filmes armazenados no banco de dados.

* Caso de sucesso:
  * **Rota**: `/movies/?sort=price&order=desc&page=2&perPage=3`` 
  * **Retorno**: Objeto com os filmes correspondentes de acordo com os parâmetros passados na URL.
  * **Status**: 200 OK.

**Exemplo de retorno**:

```json
{
 "previousPage": null,
 "nextPage": "http://localhost:3000/movies?page=2&perPage5",
 "count": 5,
 "data": [
    {
      "id": 1,
      "name": "exemplo",
      "duration": 120,
      "description": null,
      "price": 50,
      "discount": 0,
      "stock": 0
    },
    {
      "id": 2,
      "name": "exemplo 2",
      "duration": 180,
      "description": "exemplo",
      "price": 200,
      "discount": 5,
      "stock": 5
    }
  ]
}
```

### **PATCH `/movies/:id`**
### *Regras de negócio*
* Caso de sucesso:
  * **Rota**: `/movies/1`
  * **Envio**: Um objeto contendo os dados atualizados do filme.
  * **Retorno**: Um objeto contendo todos os dados do filme, inclusive os que não foram atualizados.
  * **Status**: 200 OK.

**Exemplo de envio**:

```json
{
  "duration": 130,
  "price": 200
}
```

**Exemplo de retorno**:

```json
{
  "id": 1,
  "name": "Out of Bounds",
  "description": null,
  "duration": 130,
  "price": 200
}
```

### *Casos de erro*
* Não é possível atualizar um filme usando um ID não existente na URL:
  * **Rota**: `/movies/100000000`
  * **Envio**: Um objeto contendo os dados atualizados do filme.
  * **Retorno**: Um objeto contendo uma mensagem de erro.
  * **Status**: 404 NOT FOUND.

**Exemplo de envio**:

```json
{
  "duration": 130,
  "price": 200
}
```

**Exemplo de retorno**:

```json
{
  "message": "Movie not found"
}
```

* **Rota**: `/movies/1`
* **Envio**: Um objeto contendo o nome de um filme já existente.
* **Retorno**: Um objeto contendo uma mensagem de erro.
* **Status**: 409 UNIQUE.

**Exemplo de envio**:

```json
{
  "duration": 60,
  "name": "Out of bounds",
  "price": 200
}
```

**Exemplo de retorno**:

```json
{
  "message": "Movie already exists."
}
```

* **URL da requisição**: `/movies/1`
* **Envio**: Um objeto contendo dados em formato inválido.
* **Retorno**: Um objeto indicando em quais campos os dados têm formato inválido.
* **Status**: 400 BAD REQUEST.

**Exemplo de envio**:

```json
{
  "duration": "60",
  "name": 123,
  "price": 200
}
```

**Exemplo de retorno**:

```json
{
  "name": [ "Expected string, received number" ],
  "duration": [ "Expected number, received string" ],
}
```

### **DELETE `/movies/:id`**
### *Regras de negócio*
* Caso de sucesso:
  * **Rota**: `/movies/1`
  * **Status**: 204 NO CONTENT.

### *Casos de erro*
* Não é possível atualizar um filme usando um ID não existente na URL:
  * **Rota**: `/movies/100000000`
  * **Retorno**: Um objeto contendo uma mensagem de erro.
  * **Status**: 404 NOT FOUND.

**Exemplo de retorno**:

```json
{
  "message": "Movie not found"
}
```

<h2 id="Desenvolvedora">Desenvolvedora</h2>

<p align="center">
  <a href="https://github.com/Danielle-Luz">
    <img width="120px" src="https://avatars.githubusercontent.com/u/99164019?v=4" alt="foto de uma mulher parda com o cabelo castanho, sorrindo levemente na frente de um fundo verde com bits">
  </a>
</p>

<p align="center">
Danielle da Luz Nascimento
</p>

<p align="center">
<a href="https://www.linkedin.com/in/danielle-da-luz-nascimento/">@Linkedin</a>
</p>
