"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Acesso, ApiResponse } from '@/types';
import Link from 'next/link';
import { MainLogin } from './styledLogin';
import imgLogin from '@/../public/assets/hero2.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Login() {

    const navigate = useRouter()

    const [acesso, setAcesso] = useState<Acesso>({
        emailAcesso: '', // Não vai ser usado no login
        username: '',
        senha: '',
    });
    
    const [mensagem, setMensagem] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAcesso({ ...acesso, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            // Faz uma requisição para obter os dados de acesso
            const response = await axios.get<Acesso[]>(`http://localhost:3000/api/base-acesso`);
            const acessos = response.data; // Os dados que vêm do JSON
    
            // Verifica se existe um acesso que corresponde ao username e senha
            const usuarioValido = acessos.find((item) => 
                item.username === acesso.username && item.senha === acesso.senha // Comparação correta
            );
    
            if (usuarioValido) {
                setMensagem('Login realizado com sucesso!');
                navigate.push('/areacliente');
            } else {
                setMensagem('Login não existe. Por favor, cadastre-se.');
            }
        } catch (error) {
            setMensagem('Erro ao conectar com a API.');
        }
    };
    

    return (
        <MainLogin>
            <div className='div-login'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={acesso.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        name="senha"
                        value={acesso.senha}
                        onChange={handleInputChange}
                        placeholder="Senha"
                        required
                    />
                    <button type="submit">Entrar</button>
                </form>
                {mensagem && <p>{mensagem}</p>}
                <div className='div-cadastro'>
                    <p>Não tem uma conta?</p>
                    <Link href={'/cadastro'}>Cadastre-se</Link>
                </div>
            </div>
            <div className='div-img'>
                <Image src={imgLogin} priority alt="Imagem de uma mulher do lado de seu carro numa garagem"></Image>
            </div>
        </MainLogin>
    );
}

