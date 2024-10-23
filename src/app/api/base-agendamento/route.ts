
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Agendamento } from '@/types';


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


export async function POST(req: Request) {
    try {
        const novoAgendamento: Agendamento = await req.json();

        // Lê o arquivo de agendamentos existentes
        const filePath = path.join(process.cwd(), 'src/data/agendamento.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const agendamentos: Agendamento[] = JSON.parse(fileContent);

        // Gera um ID único com base na data
        const novoAgendamentoId = Number(Date.now());
        
        // Cria um novo objeto de agendamento
        const agendamentoComId: Agendamento = {
            id: novoAgendamentoId, // Usando o ID gerado
            dthoraAgendamento: novoAgendamento.dthoraAgendamento, // Corrigido o nome da propriedade
            statusAgendamento: novoAgendamento.statusAgendamento,
            oficina: {
                id: novoAgendamento.oficina.id,
                nome: novoAgendamento.oficina.nome,
                cnpj: novoAgendamento.oficina.cnpj,
                acesso: {
                    emailAcesso: novoAgendamento.oficina.acesso.emailAcesso,
                    username: novoAgendamento.oficina.acesso.username,
                    senha: novoAgendamento.oficina.acesso.senha,
                }
            },
            carro: {
                id: novoAgendamento.carro.id,
                placa: novoAgendamento.carro.placa,
                marca: novoAgendamento.carro.marca,
                modelo: novoAgendamento.carro.modelo,
                anoFabricacao: novoAgendamento.carro.anoFabricacao,
                cliente: {
                    id: novoAgendamento.carro.cliente.id,
                    cpfCliente: novoAgendamento.carro.cliente.cpfCliente,
                    nomeCliente: novoAgendamento.carro.cliente.nomeCliente,
                    dataNascimento: novoAgendamento.carro.cliente.dataNascimento,
                    acesso: {
                        emailAcesso: novoAgendamento.carro.cliente.acesso.emailAcesso,
                        username: novoAgendamento.carro.cliente.acesso.username,
                        senha: novoAgendamento.carro.cliente.acesso.senha,
                    }
                }
            }
        };

        // Adiciona o novo agendamento ao array de agendamentos
        agendamentos.push(agendamentoComId);

        // Salva o arquivo de agendamentos atualizado
        await fs.writeFile(filePath, JSON.stringify(agendamentos, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Agendamento criado com sucesso!', agendamento: agendamentoComId });
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        return NextResponse.json({ success: false, message: 'Erro ao criar agendamento.' }, { status: 500 });
    }
}
