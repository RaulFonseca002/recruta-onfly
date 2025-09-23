# Desafio Recruta Onfly - Custom Node n8n

Este repositório contém a solução para o desafio técnico do processo seletivo Recruta Onfly.

O objetivo foi criar um node customizado para o n8n que se integra com a API pública do `Random.org` para gerar números aleatórios, rodando em um ambiente Docker com PostgreSQL.

## Como Executar

### Pré-requisitos
* Git
* Node.js (v22 LTS recomendado)
* Docker
* Docker Compose

### Passos para Execução
Todos os comandos devem ser executados a partir da pasta raiz do projeto.

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/RaulFonseca002/recruta-onfly.git
    cd recruta-onfly
    ```

2.  **Instale, Compile e Inicie:**
    ```bash
    npm run start
    ```

3.  **Acesse o n8n:**
    Aguarde a inicialização dos serviços e acesse a interface do n8n em:
    [http://localhost:5678](http://localhost:5678)

    O node **"Random"** estará disponível na lista de integrações.

---
## Script NPM

### `npm run setup`
Instala as dependências do projeto do node customizado (`n8n-nodes-random`).

### `npm run build`
Compila o código TypeScript do node para JavaScript

### `npm run start:docker`
**Este comando manterá o terminal ocupado com os logs dos serviços.**
Inicia os contêineres do n8n e do PostgreSQL usando `docker-compose up`. 

### `npm run start`
Executa `setup`, `build` e `start:docker` em sequência.

### `npm run dev`
Executa `build` e reinicia o docker
