"use client";
import {HeaderContainer} from './styled'
import Image from 'next/image'; 
import Link from 'next/link';
import logoGaid from '../app/assets/logohr.png';
import loginIcon from '../app/assets/iconLogin.png';



export default function Cabecalho() {
  return (
    <HeaderContainer>
      <div className='div-logoGaid'>
        <Link href="/">
            <Image src={logoGaid} alt="Logo da empresa"/>
        </Link>
      
      </div>
      
      <div>
        <Link href="/login">
            <Image src={loginIcon} alt="Login"/>
        </Link>
      </div>
    </HeaderContainer>
  );
}
