"use client";
import Menu from "@/components/Menu";
import {HomeContainer} from './home/styledHome'
import CarDiag from "./home/CarDiag";
import Galdi from "./home/Galdi";
import CDScanner from "./home/CDScanner";
import Empresa from "./home/Empresa";
import Suporte from "./home/Suporte";
import VoltarAoTopo from "@/components/VoltarAoTopo";

export default function Home() {
  return (
    <HomeContainer>
      <Menu/>
      <div id="cardiag"><CarDiag /></div>
      <div id="galdi"><Galdi /></div>
      <div id="cdscanner"><CDScanner /></div>
      <div id="empresa"><Empresa /></div>
      <div id="suporte"><Suporte /></div>
      <VoltarAoTopo/>
    </HomeContainer>
  );
}
