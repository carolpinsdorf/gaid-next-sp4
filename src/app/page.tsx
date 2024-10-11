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

      <div id="cardiag" className="section"> <CarDiag/> </div>

      <div id="galdi" className="section"> <Galdi/> </div>

      <div id="cdscanner" className="section"> <CDScanner/> </div>

      <div id="empresa" className="section"> <Empresa/> </div>

      <div id="suporte" className="section"> <Suporte/> </div>

      <VoltarAoTopo/>

    </HomeContainer>

  );
}
