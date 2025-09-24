FROM n8nio/n8n:latest

WORKDIR /home/node/.n8n

COPY ./n8n-nodes-random ./custom/n8n-nodes-random

USER root

RUN cd ./custom/n8n-nodes-random && npm install --omit=dev

RUN chown -R node:node /home/node/.n8n

USER node
