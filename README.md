♻️ EcoColeta

Sistema de Gestão de Pontos de Coleta Seletiva

Projeto Integrador II – Curso de Análise e Desenvolvimento de Sistemas (PUC Goiás)

📌 Descrição

O EcoColeta é um sistema simples em arquitetura cliente-servidor desenvolvido em Java para auxiliar na gestão e consulta de pontos de coleta seletiva.

O sistema permite que cidadãos encontrem pontos de coleta próximos, de acordo com o tipo de resíduo, e que administradores cadastrem e atualizem informações sobre locais de descarte.

Esse projeto integra os conhecimentos de Engenharia de Requisitos e Desenvolvimento de Sistemas Cliente-Servidor, além de promover a conscientização sobre sustentabilidade e meio ambiente.

🚀 Funcionalidades

Consulta de pontos de coleta por tipo de material aceito.

Exibição de informações como endereço, horário de funcionamento e resíduos coletados.

Comunicação cliente-servidor via sockets em Java.

Cadastro e atualização de pontos de coleta (lado servidor).

Execução simples sem necessidade de banco de dados.

📂 Estrutura do Repositório
EcoColeta/
 ├── servidor/
 │     └── EcoColetaServer.java
 ├── cliente/
 │     └── EcoColetaClient.java
 ├── requisitos/
 │     └── requisitos.txt
 └── README.md

⚙️ Requisitos Técnicos

Java 11+

Não há necessidade de banco de dados ou arquivos de persistência.

Arquitetura baseada em Sockets TCP.

▶️ Como Executar
1. Compilar os arquivos

No terminal, dentro da pasta raiz:

javac servidor/EcoColetaServer.java
javac cliente/EcoColetaClient.java

2. Iniciar o servidor
java servidor.EcoColetaServer

3. Iniciar o cliente (em outro terminal)
java cliente.EcoColetaClient

📑 Requisitos Implementados
Requisitos Funcionais (RF)

Cadastrar novos pontos de coleta.

Listar pontos de coleta cadastrados.

Consultar pontos por tipo de resíduo.

Exibir informações detalhadas de cada ponto.

Comunicação cliente-servidor para troca de mensagens.

Requisitos Não Funcionais (RNF)

Implementação em Java.

Uso de arquitetura cliente-servidor.

Simplicidade (sem persistência de dados).

Tempo de resposta inferior a 2 segundos em consultas.

Interface de linha de comando (CLI).

🎯 Objetivos
Objetivo Geral

Desenvolver um sistema cliente-servidor simples e funcional para gerenciar e consultar pontos de coleta seletiva.

Objetivos Específicos

Documentar e levantar requisitos.

Implementar comunicação cliente-servidor em Java.

Aplicar conceitos de Engenharia de Software.

Promover a conscientização ambiental.
