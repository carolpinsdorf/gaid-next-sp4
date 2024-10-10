"use client";
import { useState } from 'react';
import { NavContainer } from './styled';
import Link from 'next/link';

export default function Menu() {
  // Estado para controlar a exibição do menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para alternar a visibilidade do menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Função para realizar a rolagem suave
  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    event.preventDefault(); // Previne o comportamento padrão do link
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); // Rolagem suave
      element.classList.add('animate'); // Adiciona a classe de animação (se necessário)
    }
    setMenuOpen(false); // Fecha o menu após clicar em um item
  };

  return (
    <NavContainer>
      {/* Botão do Menu Hamburguer */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Lista de Links */}
      <ul className={menuOpen ? 'show-menu' : ''}>
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
  );
}
