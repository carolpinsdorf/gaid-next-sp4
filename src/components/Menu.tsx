"use client";
import {NavContainer} from './styled'
import Link from 'next/link';

export default function Menu(){

    const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
        event.preventDefault(); // Previne o comportamento padrão do link
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' }); // Rolagem suave
          element.classList.add('animate'); // Adiciona a classe de animação
        }
      };

    return(
        
        <NavContainer>
        <ul>
          <li>
            <a href="#cardiag" onClick={(e) => handleScroll(e, 'cardiag')}>CarDiag</a>
          </li>
          <li>
            <a href="#galdi" onClick={(e) => handleScroll(e, 'galdi')}>Galdí</a>
          </li>
          <li>
            <a href="#cdscanner" onClick={(e) => handleScroll(e, 'cdscanner')}>CDScanner</a>
          </li>
          <li>
            <a href="#empresa" onClick={(e) => handleScroll(e, 'empresa')}>Empresa</a>
          </li>
          <li>
            <a href="#suporte" onClick={(e) => handleScroll(e, 'suporte')}>Suporte</a>
          </li>
        </ul>
      </NavContainer>
    )
}