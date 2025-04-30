import { useState } from 'react'
import { useEffect } from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Home() {
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
    <div className='container'>
      <h1>Olá, Telegram!</h1>
      <button onClick={sendData}>Enviar mensagem para o Bot</button>
      <Link to='/about'>
        <button>Sobre</button>
      </Link>
    </div>
  );
}

export default Home
