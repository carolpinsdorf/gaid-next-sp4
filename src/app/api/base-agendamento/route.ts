
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
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
        const filePath = path.join(process.cwd(), 'src/data/agendamento.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const agendamentos = JSON.parse(fileContent);

        // Filtra os agendamentos pertencentes ao cliente logado
        const agendamentosDoCliente = agendamentos.filter((agendamento: any) => {
            return agendamento.carro.cliente.id === Number(clienteId);
        });

        return NextResponse.json(agendamentosDoCliente, { status: 200 });
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        return NextResponse.json({ success: false, message: 'Erro ao buscar agendamentos.' }, { status: 500 });
    }
}

