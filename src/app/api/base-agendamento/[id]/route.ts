import { Agendamento } from "@/types";
import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs/promises';


export async function PUT(req: Request,{ params }: { params: { id: string } }) {
    try {
        const agendamentoId = Number(params.id);
        const agendamentoAtualizado: Agendamento = await req.json();

        const filePath = path.join(process.cwd(), 'src/data/agendamento.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const agendamentos: Agendamento[] = JSON.parse(fileContent);

        const index = agendamentos.findIndex(a => a.id === agendamentoId);
        if (index === -1) {
            return NextResponse.json({ success: false, message: 'Agendamento não encontrado.' }, { status: 404 });
        }

        // Mantém o ID original e atualiza os outros campos
        agendamentos[index] = { 
            ...agendamentos[index], 
            ...agendamentoAtualizado, 
            id: agendamentoId 
        };

        await fs.writeFile(filePath, JSON.stringify(agendamentos, null, 2), 'utf-8');

        return NextResponse.json({ 
            success: true, 
            message: 'Agendamento atualizado com sucesso!', 
            agendamento: agendamentos[index] 
        });
    } catch (error) {
        console.error('Erro ao atualizar agendamento:', error);
        return NextResponse.json({ success: false, message: 'Erro ao atualizar agendamento.' }, { status: 500 });
    }
}



export async function DELETE(req: Request,{ params }: { params: { id: string } }) {
    try {
        const agendamentoId = Number(params.id);

        if (isNaN(agendamentoId)) {
            return NextResponse.json({ success: false, message: 'ID do agendamento inválido.' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'src/data/agendamento.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const agendamentos: Agendamento[] = JSON.parse(fileContent);

        const agendamentosFiltrados = agendamentos.filter(agendamento => agendamento.id !== agendamentoId);

        if (agendamentosFiltrados.length === agendamentos.length) {
            return NextResponse.json({ success: false, message: 'Agendamento não encontrado.' }, { status: 404 });
        }

        await fs.writeFile(filePath, JSON.stringify(agendamentosFiltrados, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Agendamento excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir agendamento:', error);
        return NextResponse.json({ success: false, message: 'Erro ao excluir agendamento.' }, { status: 500 });
    }
}
