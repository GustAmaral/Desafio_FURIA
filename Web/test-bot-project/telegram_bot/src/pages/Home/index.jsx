import { useState } from 'react'
import { useEffect } from 'react'
import './style.css'

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

export default App
