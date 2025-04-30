import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css'

function About() {

  return (
    <div className='container'>
      <h1>Teste da segunda página</h1>
      <Link to='/'>
        <button>Sobre</button>
      </Link>
    </div>
  );
}

export default About
