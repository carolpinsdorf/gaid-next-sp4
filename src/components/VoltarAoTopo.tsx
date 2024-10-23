import React, { useState, useEffect } from "react";
import { TopoButton } from "./styled";

// Função que rola a página para o topo
export default function VoltarAoTopo() {
  const [visible, setVisible] = useState(false);

  // Monitora a rolagem da página
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <TopoButton onClick={scrollToTop} $visible={visible}>
      ↑ Topo
    </TopoButton>
  );
}




