import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { Carro, Cliente } from '@/types'; 
import path from 'path';

export async function PUT(req: Request) {
    try {
        const url = new URL(req.url);
        const carroId = url.pathname.split('/').pop(); // Obter o ID do carro da URL

        // Verifica se o ID do carro foi passado
        if (!carroId) {
            return NextResponse.json({ success: false, message: 'ID do carro é necessário.' }, { status: 400 });
        }

        // Recebe os dados do carro no corpo da requisição
        const updatedCarro: Carro = await req.json();

        // Lê o arquivo carro.json
        const filePath = path.join(process.cwd(), 'src/data/carro.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const carros: Carro[] = JSON.parse(fileContent);

        // Busca o índice do carro que será atualizado
        const index = carros.findIndex(carro => carro.id === Number(carroId));
        if (index === -1) {
            return NextResponse.json({ success: false, message: 'Carro não encontrado.' }, { status: 404 });
        }

        // Atualiza o carro
        carros[index] = { ...carros[index], ...updatedCarro };

        // Salva o arquivo atualizado
        await fs.writeFile(filePath, JSON.stringify(carros, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Carro atualizado com sucesso!', carro: carros[index] });
    } catch (error) {
        console.error('Erro ao atualizar carro:', error);
        return NextResponse.json({ success: false, message: 'Erro ao atualizar carro.' }, { status: 500 });
    }
}