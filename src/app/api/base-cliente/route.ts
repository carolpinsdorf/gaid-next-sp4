import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import { Cliente } from '@/types'; // Importa o tipo Cliente

export async function POST(req: Request) {
    try {
        // Recebe os dados enviados pelo cliente no corpo da requisição
        const { cpfCliente, nomeCliente, dataNascimento, acesso } = await req.json();

        // Lê o arquivo cliente.json
        const filePath = process.cwd() + '/src/data/cliente.json';
        const file = await fs.readFile(filePath, 'utf-8');
        const clientes: Cliente[] = JSON.parse(file); // Usa o tipo Cliente

        // Verifica se o CPF já existe
        const clienteExistente = clientes.find((cliente: Cliente) => cliente.cpfCliente === cpfCliente);
        if (clienteExistente) {
            return NextResponse.json({ success: false, message: 'CPF já cadastrado!' });
        }

        // Gera um ID único com base na data
        const novoClienteId = Number(Date.now());

        // Cria o objeto cliente com ID gerado, utilizando o tipo Cliente
        const novoCliente: Cliente = {
            id: novoClienteId, // Adiciona o ID gerado
            cpfCliente,
            nomeCliente,
            dataNascimento,
            acesso: {
                emailAcesso: acesso.emailAcesso,
                username: acesso.username,
                senha: acesso.senha
            }
        };

        // Adiciona o novo cliente ao array de clientes
        clientes.push(novoCliente);

        // Salva o arquivo cliente.json atualizado
        await fs.writeFile(filePath, JSON.stringify(clientes, null, 2), 'utf-8');

        // Retorna sucesso
        return NextResponse.json({ success: true, message: 'Cliente cadastrado com sucesso!', cliente: novoCliente });
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        return NextResponse.json({ success: false, message: 'Erro ao cadastrar cliente.' });
    }
}




