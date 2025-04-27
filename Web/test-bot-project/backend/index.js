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