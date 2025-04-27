### Estrutura do projeto:

telegram-bot-webapp/
├── backend/
│   ├── package.json
│   ├── index.js
│   └── .env
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.jsx
│       └── index.js
├── README.md


### Conteúdo dos arquivos:

# backend/package.json
{
  "name": "telegram-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "dotenv": "^16.0.0",
    "express": "^4.18.0",
    "node-telegram-bot-api": "^0.61.0"
  }
}


# backend/.env
BOT_TOKEN=seu-token-aqui
WEBAPP_URL=https://seu-webapp.vercel.app


# backend/index.js
require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Clique no botão para abrir o app:', {
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'Abrir WebApp',
          web_app: { url: process.env.WEBAPP_URL }
        }]
      ]
    }
  });
});

app.listen(3000, () => console.log('Servidor backend rodando na porta 3000'));



# frontend/package.json
{
  "name": "telegram-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "vite": "^4.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}


# frontend/public/index.html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WebApp Telegram</title>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>


# frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


# frontend/src/App.jsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
  }, []);

  function sendData() {
    const tg = window.Telegram.WebApp;
    tg.sendData('Mensagem enviada do WebApp!');
    tg.close();
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Olá, Telegram!</h1>
      <button onClick={sendData}>Enviar mensagem para o Bot</button>
    </div>
  );
}

export default App;


# README.md
# Telegram Bot + WebApp

Projeto de exemplo integrando Telegram Bot (Node.js) com WebApp (React).

## Como rodar

### Backend
```
cd backend
npm install
npm run start
```

### Frontend
```
cd frontend
npm install
npm run dev
```

Depois hospede o frontend em um serviço HTTPS (ex: Vercel) e configure o `WEBAPP_URL` no `.env` do backend.
