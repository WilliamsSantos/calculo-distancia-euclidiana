## Crud de Clientes + algoritimo de calculo Vizinho mais próximo

#### Requisitos
Requisito
Sistema de Gerenciamento de Clientes

- <b>Parte 1:</b> Uma empresa que realiza limpeza em residências enfrenta desafios no gerenciamento de seus clientes e busca uma solução eficiente para cadastrar e visualizar as informações que hoje são controladas em planilhas. Para centralizar as informações e ajudar na expansão da empresa, ela deseja uma plataforma onde seja possível gerenciar os seus clientes. O sistema deve ser composto por um backend em Node.js utilizando PostgreSQL como banco de dados, e um frontend em React.

A empresa utiliza as seguintes informações para gerenciar seus clientes: nome, email e telefone.

Na plataforma criada deve ser possível:
Listar os seus clientes e filtrar com base nas informações cadastradas
Cadastrar clientes novos

- <b>Parte 2:</b>
Suponha que, além de cadastrar e visualizar clientes, a empresa deseja otimizar as rotas de atendimento para maximizar a eficiência na visitação dos clientes. Considere um mapa bidimensional representando a localização dos clientes, onde cada ponto cartesiano possui um cliente. Cada cliente cadastrado possui uma coordenada X e uma coordenada Y nesse mapa.

O objetivo é calcular a rota partindo da empresa (0,0) e que passe pela localização de todos os clientes cadastrados no banco de dados e retorne à empresa no final. A rota deve ser calculada para ter a menor distância possível.

O algoritmo para calcular essa rota deve estar disponibilizado via rota da api para ser chamado pelo front quando necessário.

Implemente um botão na tela de clientes que, ao ser clicado, abre uma modal e mostra a ordem de visitação dos clientes na rota calculada. A visualização pode ser a mais simples possível mostrando uma lista dos clientes na ordem que devem ser visitados do primeiro ao último cliente da rota.

Ao desenvolver essa segunda parte, altere a rota de cadastro e visualização para que seja possível cadastrar e visualizar as coordenadas X e Y dos clientes da empresa.


### O banco já vem com os seguintes clientes cadastrados:

- <b>Cliente 1:</b> lat: -82.818109, lon: -104.43985
- <b>Cliente 2:</b> lat: 80.328724, lon: -30.252611
- <b>Cliente 3:</b> lat: 7.739834, lon: -99.528469
- <b>Cliente 4:</b> lat: -67.440864, lon: 73.50029
- <b>Cliente 5:</b> lat: -11.923512, lon: 86.964128
- <b>Cliente 6:</b> lat: 64.969462, lon: 22.523953
- <b>Cliente 7:</b> lat: -59.391267, lon: 6.872184
- <b>Cliente 8:</b> lat: 88.602851, lon: -131.924709
- <b>Cliente 9:</b> lat: 29.48827, lon: -135.976354
- <b>Cliente 10:</b> lat: -34.969988, lon: 82.992786
- <b>Cliente 11:</b> lat: -81.830663, lon: -125.059108
- <b>Cliente 12:</b> lat: -7.834339, lon: -164.674915
- <b>Cliente 13:</b> lat: 26.86666, lon: 62.195281
- <b>Cliente 14:</b> lat: -55.895173, lon: -0.344419
- <b>Cliente 15:</b> lat: -56.306492, lon: 92.128855

### resultado esperado:

<ol>
<li>Cliente 14 </li>
 <li>Cliente 7 </li>
 <li>Cliente 4 </li>
 <li>Cliente 15 </li>
 <li>Cliente 10 </li>
 <li>Cliente 5 </li>
 <li>Cliente 13 </li>
 <li>Cliente 6 </li>
 <li>Cliente 2 </li>
 <li>Cliente 3 </li>
 <li>Cliente 9 </li>
 <li>Cliente 12 </li>
 <li>Cliente 11 </li>
 <li>Cliente 1 </li>
 <li>Cliente 8 </li>
</ol>

#### Info sobre o projeto
- Você pode ter acesso ao sql aqui: [SQL INICIAL](server/database/init.sql)

- O sistema roda dentro do docker então na pasta raiz do projeto execute:
    - cp .env.example .env
    - docker-compose up -d

Com isso será disponibilizado 4 containers:

1) <b>API node:</b> facilita_juridico_app
2) <b>Banco de Dados (postgresql):</b> facilita_juridico_postgres
3) <b>Client React:</b> facilita_juridico_react
4) <b>PgAdmin:</b> facilita_juridico_pgadmin

O sistema está rodando na porta:
```curl
http://localhost:3000/clients
```

</br>

# Endpoint da API

## Customers

#### LISTAGEM

Request:

> Sem filtro
```curl
GET: http://localhost:5000/api/clients
```

> Com filtro
```curl
GET: http://localhost:5000/api/clients?search=Jose
```

<i>obs: A busca do filtro é feito por nome, email ou telefone</i> 

Response:

```json
{
    "success": true,
    "data": [
        {
            "id": 4,
            "name": "Cliente 4",
            "email": "email4@example.com",
            "phone": "7116064719",
            "lat": "-67.440864",
            "lon": "73.500290"
        },
        {
            "id": 5,
            "name": "Cliente 5",
            "email": "email5@example.com",
            "phone": "9284780837",
            "lat": "-11.923512",
            "lon": "86.964128"
        },
        {
            "id": 6,
            "name": "Cliente 6",
            "email": "email6@example.com",
            "phone": "6216727223",
            "lat": "64.969462",
            "lon": "22.523953"
        }
    ]
}
```

#### CREATE

```curl
POST: http://localhost:5000/api/clients
```

Body:

```json
{
    "email": "email102@example.com",
    "name": "Cliente 101",
    "phone": "7385153081",
    "lat": "7.739834",
    "lon": "-99.528469",
}
```

Response:

```json
{
    "success": true,
    "data": {
        "id": 3,
        "email": "email102@example.com",
        "name": "Cliente 101",
        "phone": "7385153081",
        "lat": "7.739834",
        "lon": "-99.528469",
        "created_at": "2024-01-22T17:54:42.652Z",
        "updated_at": "2024-01-22T17:54:42.652Z"
    }
}
```

#### UPDATE

```curl
PUT: http://localhost:5000/api/clients/3
```

Body:

```json
{
    "email": "email102@example.com",
    "name": "Cliente 101",
    "phone": "7385153081",
    "lat": "7.739834",
    "lon": "-99.528469",
}
```

Response:

```json
{
    "success": true,
    "data": {
        "id": 3,
        "email": "email102@example.com",
        "name": "Cliente 101",
        "phone": "7385153081",
        "lat": "7.739834",
        "lon": "-99.528469",
        "created_at": "2024-01-22T17:54:42.652Z",
        "updated_at": "2024-01-22T17:54:42.652Z"
    }
}
```

#### GET ONE BY ID

```curl
GET: http://localhost:5000/api/clients/3
```

#### ENDPOINT DO CALCULO

```curl
GET: http://localhost:5000/api/clients/calculate-route
```

Response:

```json
{
    "success": true,
    "data": [
        {
            "id": 16,
            "name": "Ccc",
            "email": "ccc@gmail.com",
            "phone": "62662626226",
            "lat": "10.000000",
            "lon": "12.000000"
        },
        {
            "id": 13,
            "name": "Cliente 13",
            "email": "email13@example.com",
            "phone": "8093660685",
            "lat": "26.866660",
            "lon": "62.195281"
        },
        {
            "id": 5,
            "name": "Cliente 5",
            "email": "email5@example.com",
            "phone": "9284780837",
            "lat": "-11.923512",
            "lon": "86.964128"
        },
        ...
    ]
}
```
</br>

<h1>Documentação Técnica: Cálculo de Rota para Clientes</h1>
<h2>Visão Geral</h2>
<p>
  O módulo <code>nearestNeighbor</code> fornece uma funcionalidade para calcular
  a rota ótima através de um conjunto de pontos (clientes), partindo de uma
  localização inicial. O objetivo é visitar todos os clientes no menor caminho
  possível, com base na distância euclidiana entre os pontos.
</p>
<h2>Funções</h2>
<h3>1. <code>calculateDistance</code></h3>
<ul>
  <li>
    <p>
      <strong>Descrição:</strong> Calcula a distância euclidiana entre dois
      pontos.
    </p>
  </li>
  <li>
    <p><strong>Entradas:</strong></p>
    <ul>
      <li>
        <code>pointA</code>: Um objeto representando um ponto (cliente) com
        latitude (<code>lat</code>) e longitude (<code>lon</code>).
      </li>
      <li><code>pointB</code>: Um objeto similar ao <code>pointA</code>.</li>
    </ul>
  </li>
  <li>
    <p>
      <strong>Retorno:</strong> A distância euclidiana entre
      <code>pointA</code> e <code>pointB</code>.
    </p>
  </li>
  <li>
    <p>
      <strong>Cálculo:</strong> A função calcula a raiz quadrada da soma dos
      quadrados da diferença entre as latitudes e as longitudes dos dois pontos.
      A fórmula é a seguinte:
    </p>

![Cálculo](image-1.png)

  </li>
</ul>
<h3>2. <code>findClosestClientIndex</code></h3>
<ul>
  <li>
    <strong>Descrição:</strong> Encontra o índice do cliente mais próximo da
    localização atual.
  </li>
  <li>
    <strong>Entradas:</strong>
    <ul>
      <li>
        <code>currentLocation</code>: A localização atual com latitude e
        longitude.
      </li>
      <li>
        <code>clientsToVisit</code>: Um array de clientes ainda não visitados.
      </li>
    </ul>
  </li>
  <li>
    <strong>Retorno:</strong> O índice do cliente mais próximo no array
    <code>clientsToVisit</code>.
  </li>
  <li>
    <strong>Funcionamento:</strong> A função percorre o array
    <code>clientsToVisit</code>, utilizando <code>calculateDistance</code> para
    encontrar o cliente mais próximo da <code>currentLocation</code>. Se o
    cliente mais próximo for encontrado, seu índice no array é retornado.
  </li>
</ul>
<h3>3. <code>calculateRoute</code></h3>
<ul>
  <li>
    <strong>Descrição:</strong> Calcula a rota ótima para visitar um conjunto de
    clientes.
  </li>
  <li>
    <strong>Entradas:</strong>
    <ul>
      <li>
        <code>startX</code> e <code>startY</code>: Coordenadas iniciais
        (latitude e longitude) de onde começar a rota.
      </li>
      <li>
        <code>clients</code>: Um array de objetos cliente, cada um com latitude
        (<code>lat</code>) e longitude (<code>lon</code>).
      </li>
    </ul>
  </li>
  <li>
    <strong>Retorno:</strong> Um array representando a rota ótima, com cada
    elemento sendo um cliente do array <code>clients</code>.
  </li>
  <li>
    <strong>Funcionamento:</strong> A função inicia na localização definida por
    <code>startX</code> e <code>startY</code>, e em cada passo, utiliza
    <code>findClosestClientIndex</code> para encontrar o cliente mais próximo
    ainda não visitado. Esse cliente é então adicionado à rota, e a localização
    atual é atualizada para a localização desse cliente. O processo se repete
    até que todos os clientes tenham sido visitados.
  </li>
</ul>
<h2>Exemplo de Uso</h2>

```javascript

const clients = [
{ lat: 40.7128, lon: -74.0060 }, // Cliente em Nova York
{ lat: 34.0522, lon: -118.2437 }, // Cliente em Los Angeles
// ...outros clientes
];

const startingPoint = { lat: 41.8781, lon: -87.6298 }; // Iniciar em Chicago

const route = calculateRoute(startingPoint.lat, startingPoint.lon, clients)
```

<p>
  Neste exemplo, <code>route</code> será um array dos clientes ordenados pela
  sequência ótima de visitação partindo de Chicago.
</p>


### Página listagem clientes:
![Alt text](image.png)

### Modal Rotas Otimizadas:
![Alt text](image-2.png)

### Atualiza Cliente:
![Alt text](image-3.png)

### Cria Cliente
![Alt text](image-4.png)

### Excluir Cliente
![Alt text](image-5.png)

### Visualiza 1 client:
![Alt text](image-6.png)

### Busca:
![Alt text](image-7.png)