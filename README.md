# App

GymPass style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

# SCRIPT
  ## PRISMA
  `npx prisma generate` - Gera um tipagem TS do schema.prisma

  ## DOCKER
  `docker run --name api-solid-pg bitnami/postgresql:latest` Criando uma image pg
  `docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest`

  ## DOCKER COMPOSE
   - Serve para como um tipo de configuração para criação do docker,
      basicamente seria como uma tradução para o comando: 
        `docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest`
    ```yml
    version: '3'

    services:
      api-solid-pg:
        image: bitnami/postgresql
        ports:
          - 5432:5432
        environment:
          - POSTGRESQL_USERNAME=docker
          - POSTGRESQL_PASSWORD=docker
          - POSTGRESQL_DATABASE=apisolid
    ```

# CRIPTOGRAFIA
  `npm i bcryptjs`

  - Criar um hash da senha
  - Segundo paramentro: Numero de rounds que será encriptado ( 1- Criando a hash da senha,
    2- o hash do hash da senha, 3 - o hash do has do hash da senha ... )
    ```ts
      const password_hash = await hash(password, 6)
    ```

# Repository Pattern

  - Vantagem é que nos repositories podemos separa contexto da propria biblioteca, e fica totalmente desacoplado 
    dos use-cases, desta forma, se no futura mudarmos o ORM Prisma, por outro, alteramos apenas o `prisma-users-repository.ts` 

# Inversão de dependências
    S
    O
    L
    I
    D - Dependecy Inversion Pricipie

# TESTS
  `npm i vitest vite-tsconfig-paths -D`
  - vite-tsconfig-path para entender as importações com "@"


# Gerando coverage de testes



