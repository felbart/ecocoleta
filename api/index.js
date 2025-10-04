  const express = require('express');
  const net = require('net');
  const cors = require('cors');

  const app = express();
  const PORT = 3001; 
  const JAVA_SERVER_PORT = 5000;
  const JAVA_SERVER_HOST = 'localhost';

  app.use(express.json());
  app.use(cors()); 

  const sendToJavaServer = (command, res) => {
    const client = new net.Socket();
    let data = '';

    client.connect(JAVA_SERVER_PORT, JAVA_SERVER_HOST, () => {
      client.write(command + '\n');
    });

    client.on('data', (chunk) => {
      data += chunk.toString();
    });

    client.on('end', () => {
      try {
        res.json({ success: true, response: data });
      } catch (e) {
        res.status(500).json({ success: false, error: 'Erro ao processar a resposta do servidor Java.' });
      } finally {
        client.destroy();
      }
    });

    client.on('error', (err) => {
      console.error('Erro na comunicação com o servidor Java:', err);
      res.status(500).json({ success: false, error: 'Não foi possível conectar ao servidor Java.' });
      client.destroy();
    });
  };

  app.get('/api/pontos', (req, res) => {
    sendToJavaServer('CONSULTAR_TODOS', res);
  });

  app.post('/api/pontos', (req, res) => {
    const { nome, endereco, horario, materiais } = req.body;
    const command = `CADASTRAR;${nome};${endereco};${horario};${materiais}`;
    sendToJavaServer(command, res);
  });

  app.get('/api/filtrar', (req, res) => {
    const { materiais } = req.query; // Pega o parâmetro da URL
    const command = `FILTRAR;${materiais}`;
    sendToJavaServer(command, res);
  });

  app.get('/api/estatisticas', (req, res) => {
    sendToJavaServer('ESTATISTICAS', res);
  });

  app.listen(PORT, () => {
    console.log(`API intermediária rodando em http://localhost:${PORT}`);
    console.log('Certifique-se de que o servidor Java está em execução na porta 5000.');
  });