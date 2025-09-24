# Desafio Recruta Onfly - Custom Node n8n

Este repositório contém a solução para o desafio técnico do processo seletivo Recruta Onfly.

O objetivo foi criar um node customizado para o n8n que se integra com a API pública do `Random.org` para gerar números aleatórios, rodando em um ambiente Docker com PostgreSQL.

## Como Executar

### Pré-requisitos
* Git
* Node.js (v22 LTS recomendado)
* Docker
* Docker Compose

## Execução Inicial

Siga estes passos para instalar as dependências, compilar o node e iniciar a aplicação.

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/RaulFonseca002/recruta-onfly.git
    cd recruta-onfly
    ```

2.  **Instale as dependências e compile o node:**
    ```bash
    cd n8n-nodes-random
    npm install
    npm run build
    ```

3.  **Inicie o servidor n8n:**
    ```bash
    cd ..
    docker-compose up --build
    ```

4.  **Acesse a aplicação:**
    Aguarde a inicialização dos serviços (você verá os logs no terminal) e acesse o n8n no localhost 
    que aparecer 

## Desenvolvimento

Este é o fluxo de trabalho para aplicar mudanças no código-fonte do node.

1.  **Pare a Execução Atual:**
    No terminal onde o `docker-compose up` está rodando, pressione `Ctrl+C`.

2.  **Recompile o Node:**
    Em outro terminal, ou no mesmo, navegue até a pasta do node e execute o build.
    ```bash
    cd n8n-nodes-random
    npm run build
    cd ..
    ```

3.  **Inicie o Servidor Novamente:**
    Com o código já compilado, inicie o Docker novamente.
    ```bash
    docker-compose up
    ```

---

## Finalizando o Uso (Comando Down)

Quando terminar de usar e quiser desligar e remover completamente os contêineres e a rede, use o comando `down`.

1.  Se o `docker-compose up` estiver rodando, pare-o com `Ctrl+C`.
2.  Execute o comando `down` na pasta raiz:
    ```bash
    docker-compose down
    ```