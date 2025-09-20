# Desafio Recruta Onfly - Custom Node Random.org

Este repositório contém o desafio técnico para a criação de um node customizado do n8n.

## Desenvolvimento (Testando Mudanças)

O servidor n8n (rodando no Docker) carrega os nodes customizados apenas na inicialização. Portanto, o fluxo para testar uma mudança no código é o seguinte:

1.  Com o `docker-compose up` (Terminal 1) e o `npm run build:watch` (Terminal 2) rodando, faça sua mudança no código (ex: em `n8n-nodes-random/nodes/Random/Random.node.ts`).

2.  Se o `watch` (Terminal 2) não funcionar, compile seu código manualmente:
    ```bash
    # (Dentro da pasta 'n8n-nodes-random')
    npm run build
    ```

3.  Reinicie o servidor Docker (Terminal 1):
    ```bash
    # (Dentro da pasta raiz 'recruta-onfly')
    # Pressione Ctrl+C para parar
    docker-compose up
    ```

4.  Recarregue a interface do n8n no navegador (`http://localhost:5678`).