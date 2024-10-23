import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { Carro, Cliente } from '@/types'; 
import path from 'path';

export async function GET(req: Request) {
    try {
        // Obtém o clienteId da query string
        const url = new URL(req.url);
        const clienteId = url.searchParams.get('clienteId');

        // Verifica se clienteId foi passado
        if (!clienteId) {
            return NextResponse.json({ success: false, message: 'Cliente ID é necessário.' }, { status: 400 });
        }

        // Caminho correto para o arquivo JSON com os dados
        const filePath = path.join(process.cwd(), 'src/data/carro.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const carros = JSON.parse(fileContent);  // Parse o conteúdo JSON corretamente

        // Filtra os carros pertencentes ao cliente logado
        const carrosDoCliente = carros.filter((carro: any) => carro.cliente.id === Number(clienteId));

        return NextResponse.json(carrosDoCliente, { status: 200 });
    } catch (error) {
        console.error('Erro ao buscar carros:', error);
        return NextResponse.json({ success: false, message: 'Erro ao buscar carros.' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        // Obtém o clienteId da query string
        const url = new URL(req.url);
        const clienteId = url.searchParams.get('clienteId');

        // Verifica se clienteId foi passado
        if (!clienteId) {
            return NextResponse.json({ success: false, message: 'Cliente ID é necessário.' }, { status: 400 });
        }

        // Recebe os dados enviados pelo cliente no corpo da requisição
        const { placa, marca, modelo, anoFabricacao } = await req.json();

        // Lê o arquivo carro.json
        const filePath = path.join(process.cwd(), 'src/data/carro.json');
        const file = await fs.readFile(filePath, 'utf-8');
        const carros: Carro[] = JSON.parse(file); // Usa o tipo Carro

        // Lê o arquivo cliente.json para obter os dados do cliente
        const clienteFilePath = path.join(process.cwd(), 'src/data/cliente.json');
        const clienteFile = await fs.readFile(clienteFilePath, 'utf-8');
        const clientes = JSON.parse(clienteFile);
        
        // Busca o cliente pelo ID
        const clienteLogado = clientes.find((cliente: { id: number; }) => cliente.id === Number(clienteId));

        // Verifica se o cliente foi encontrado
        if (!clienteLogado) {
            return NextResponse.json({ success: false, message: 'Cliente não encontrado.' }, { status: 404 });
        }

        // Gera um ID único com base na data
        const novoCarroId = Number(Date.now());

        // Cria o objeto carro com ID gerado, utilizando o tipo Carro
        const novoCarro: Carro = {
            id: novoCarroId, // Adiciona o ID gerado
            placa,
            marca,
            modelo,
            anoFabricacao,
            cliente: {
                id: clienteLogado.id,
                cpfCliente: clienteLogado.cpfCliente,
                nomeCliente: clienteLogado.nomeCliente,
                dataNascimento: clienteLogado.dataNascimento,
                acesso: {
                    emailAcesso: clienteLogado.acesso.emailAcesso,
                    username: clienteLogado.acesso.username,
                    senha: clienteLogado.acesso.senha
                }
            }
        };

        // Adiciona o novo carro ao array de carros
        carros.push(novoCarro);

        // Salva o arquivo carro.json atualizado
        await fs.writeFile(filePath, JSON.stringify(carros, null, 2), 'utf-8');

        // Retorna sucesso
        return NextResponse.json({ success: true, message: 'Carro cadastrado com sucesso!', carro: novoCarro });
    } catch (error) {
        console.error('Erro ao cadastrar carro:', error);
        return NextResponse.json({ success: false, message: 'Erro ao cadastrar carro.' });
    }
}





export async function DELETE(req: Request) {
    try {
        // Obtém o ID do carro a partir dos parâmetros da URL
        const url = new URL(req.url);
        const carroId = url.searchParams.get('id');  // Extrai o carroId da query string

        // Verifica se o ID do carro foi passado
        if (!carroId) {
            return NextResponse.json({ success: false, message: 'ID do carro é necessário.' }, { status: 400 });
        }

        // Lê o arquivo carro.json
        const filePath = path.join(process.cwd(), 'src/data/carro.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const carros: Carro[] = JSON.parse(fileContent);

        // Filtra o carro que será removido
        const carrosFiltrados = carros.filter(carro => carro.id !== Number(carroId));

        // Se não houver mudanças, o carro não foi encontrado
        if (carrosFiltrados.length === carros.length) {
            return NextResponse.json({ success: false, message: 'Carro não encontrado.' }, { status: 404 });
        }

        // Salva o arquivo atualizado
        await fs.writeFile(filePath, JSON.stringify(carrosFiltrados, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Carro excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir carro:', error);
        return NextResponse.json({ success: false, message: 'Erro ao excluir carro.' }, { status: 500 });
    }
}

