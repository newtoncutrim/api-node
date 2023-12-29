Claro, aqui está a documentação em formato Markdown:

# Documentação da API

## Visão Geral

Esta API fornece endpoints para gerenciar casas para aluguel, reservas e autenticação de usuários.

- **Base URL:** `/api`

## Autenticação

- **Criar ou recuperar usuário:**
  - **Endpoint:** `POST /sessions`
  - **Corpo da Requisição:**
    ```json
    {
      "email": "exemplo@dominio.com"
    }
    ```
  - **Resposta Bem-Sucedida:**
    ```json
    {
      "message": "Usuário criado/recuperado com sucesso",
      "user": {
        "_id": "id_do_usuario",
        "email": "exemplo@dominio.com"
      }
    }
    ```

## Gerenciamento de Casas

- **Listar todas as casas:**
  - **Endpoint:** `GET /houses`
  - **Parâmetros de Consulta (Opcionais):**
    - `status`: Filtra as casas pelo status (opcional)
  - **Resposta Bem-Sucedida:**
    ```json
    [
      {
        "_id": "id_da_casa",
        "thumbnail": "nome_da_imagem.jpg",
        "description": "Descrição da casa",
        "price": 1000,
        "status": true,
        "location": "Localização da casa",
        "user": "id_do_usuario"
      },
      // ... outras casas
    ]
    ```

- **Criar uma nova casa:**
  - **Endpoint:** `POST /houses`
  - **Corpo da Requisição:**
    - `description`: Descrição da casa
    - `price`: Preço da casa
    - `status`: Status da casa (booleano)
    - `location`: Localização da casa
  - **Cabeçalhos:**
    - `user_id`: ID do usuário autenticado
  - **Resposta Bem-Sucedida:**
    ```json
    {
      "_id": "id_da_casa",
      "thumbnail": "nome_da_imagem.jpg",
      "description": "Descrição da casa",
      "price": 1000,
      "status": true,
      "location": "Localização da casa",
      "user": "id_do_usuario"
    }
    ```

- **Atualizar uma casa existente:**
  - **Endpoint:** `PUT /houses/:id_house`
  - **Corpo da Requisição:**
    - Mesmos campos que na criação
  - **Cabeçalhos:**
    - `user_id`: ID do usuário autenticado
  - **Resposta Bem-Sucedida:**
    ```json
    {
      "_id": "id_da_casa",
      "thumbnail": "nome_da_imagem.jpg",
      "description": "Nova descrição da casa",
      "price": 1200,
      "status": true,
      "location": "Nova localização da casa",
      "user": "id_do_usuario"
    }
    ```

- **Excluir uma casa:**
  - **Endpoint:** `DELETE /houses/:id_house`
  - **Cabeçalhos:**
    - `user_id`: ID do usuário autenticado
  - **Resposta Bem-Sucedida:**
    ```json
    {
      "message": "Casa deletada com sucesso!"
    }
    ```

## Reservas

- **Listar reservas do usuário:**
  - **Endpoint:** `GET /house/reserve`
  - **Cabeçalhos:**
    - `id_user`: ID do usuário autenticado
  - **Resposta Bem-Sucedida:**
    ```json
    [
      {
        "_id": "id_da_reserva",
        "data": "2023-01-01",
        "user": {
          "_id": "id_do_usuario",
          "email": "exemplo@dominio.com"
        },
        "house": {
          "_id": "id_da_casa",
          "thumbnail": "nome_da_imagem.jpg",
          "description": "Descrição da casa",
          "price": 1000,
          "status": true,
          "location": "Localização da casa",
          "user": "id_do_usuario"
        }
      },
      // ... outras reservas
    ]
    ```

- **Criar uma nova reserva:**
  - **Endpoint:** `POST /house/:id_house/reserve`
  - **Parâmetros da URL:**
    - `id_house`: ID da casa
  - **Corpo da Requisição:**
    - `data`: Data da reserva
  - **Cabeçalhos:**
    - `id_user`: ID do usuário autenticado
  - **Resposta Bem-Sucedida:**
    ```json
    {
      "_id": "id_da_reserva",
      "data": "2023-01-01",
      "user": {
        "_id": "id_do_usuario",
        "email": "exemplo@dominio.com"
      },
      "house": {
        "_id": "id_da_casa",
        "thumbnail": "nome_da_imagem.jpg",
        "description": "Descrição da casa",
        "price": 1000,
        "status": true,
        "location": "Localização da casa",
        "user": "id_do_usuario"
      }
    }
    ```

- **Excluir uma reserva:**
  - **Endpoint:** `DELETE /house/delete`
  - **Corpo da Requisição:**
    - `id_house`: ID da reserva
  - **Resposta Bem-Sucedida:**
    ```json
    {
      "message": "Reserva deletada com sucesso!"
    }
    ```
