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