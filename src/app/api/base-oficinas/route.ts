import { NextResponse } from 'next/server';
import oficinas from '@/data/oficina.json';



export async function GET() {
    try {
        return NextResponse.json(oficinas);
    } catch (error) {
        console.error('Erro ao buscar oficinas:', error);
        return NextResponse.json({ message: 'Erro ao buscar oficinas' }, { status: 500 });
    }
}