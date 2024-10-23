"use client";
import { useState, useEffect } from 'react';
import { NavContainer } from './styled';

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Ajuste este valor conforme necessário para compensar a altura do menu
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && !(event.target as Element).closest('.NavContainer')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <NavContainer className={menuOpen ? 'open' : ''}>
      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? 'show-menu' : ''}>
        <li><a href="#cardiag" onClick={(e) => handleScroll(e, 'cardiag')}>CarDiag</a></li>
        <li><a href="#galdi" onClick={(e) => handleScroll(e, 'galdi')}>Galdí</a></li>
        <li><a href="#cdscanner" onClick={(e) => handleScroll(e, 'cdscanner')}>CDScanner</a></li>
        <li><a href="#empresa" onClick={(e) => handleScroll(e, 'empresa')}>Empresa</a></li>
        <li><a href="#suporte" onClick={(e) => handleScroll(e, 'suporte')}>Suporte</a></li>
      </ul>
    </NavContainer>
  );
}
