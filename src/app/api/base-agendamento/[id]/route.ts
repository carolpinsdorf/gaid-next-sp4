import { Agendamento } from "@/types";
import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs/promises';


export async function PUT(req: Request) {
    try {
        const url = new URL(req.url);
        const agendamentoId = url.pathname.split('/').pop(); // Obter o ID do agendamento da URL

        if (!agendamentoId) {
            return NextResponse.json({ success: false, message: 'ID do agendamento é necessário.' }, { status: 400 });
        }

        const updatedAgendamento: Agendamento = await req.json();

        const filePath = path.join(process.cwd(), 'src/data/agendamento.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const agendamentos: Agendamento[] = JSON.parse(fileContent);

        const index = agendamentos.findIndex(agendamento => agendamento.id === Number(agendamentoId));
        if (index === -1) {
            return NextResponse.json({ success: false, message: 'Agendamento não encontrado.' }, { status: 404 });
        }

        // Atualiza o agendamento
        agendamentos[index] = { ...agendamentos[index], ...updatedAgendamento };

        // Salva o arquivo atualizado
        await fs.writeFile(filePath, JSON.stringify(agendamentos, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Agendamento atualizado com sucesso!', agendamento: agendamentos[index] });
    } catch (error) {
        console.error('Erro ao atualizar agendamento:', error);
        return NextResponse.json({ success: false, message: 'Erro ao atualizar agendamento.' }, { status: 500 });
    }
}