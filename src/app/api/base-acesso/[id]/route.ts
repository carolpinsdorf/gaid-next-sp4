import { Acesso } from '@/types';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';


export async function DELETE(request: Request, { params }: { params: { id: number } }) {
    try {
        const file = await fs.readFile(process.cwd() + '/src/data/acesso.json', 'utf-8')
        const acessos: Acesso[] = JSON.parse(file)
        const index = acessos.findIndex(p => p.id == params.id)

        if (index != -1) {
            acessos.splice(index, 1)

            await fs.writeFile(process.cwd() + '/src/data/acesso.json', JSON.stringify(acessos))

            return NextResponse.json({ msg: 'Produto apagado com sucesso!' })
        }

    } catch (error) {
        return NextResponse.json({ msg: "Erro ao deletar o produto" + error })
    }

}
