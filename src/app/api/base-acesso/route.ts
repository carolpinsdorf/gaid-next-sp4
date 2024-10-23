
import { Acesso } from '@/types';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Lê o banco de dados (arquivo acesso.json)
    const file = await fs.readFile(process.cwd() + '/src/data/acesso.json', 'utf-8');

    // Transforma os elementos em JSON
    const acesso = JSON.parse(file);

    // Retorna os dados como JSON
    return NextResponse.json(acesso);
  } catch (error) {
    // Retorna um erro em caso de falha na leitura do arquivo
    return NextResponse.json({ error: 'Erro ao ler o arquivo acesso.json' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Recebe os dados enviados na requisição
    const { emailAcesso, username, senha } = await request.json();

    // Lê o arquivo acesso.json
    const filePath = process.cwd() + '/src/data/acesso.json';
    const file = await fs.readFile(filePath, 'utf-8');
    const acessos: Acesso[] = JSON.parse(file);

    // Verifica se o e-mail já existe
    const emailExistente = acessos.find((acesso) => acesso.emailAcesso === emailAcesso);
    if (emailExistente) {
      return NextResponse.json({ success: false, message: 'E-mail já cadastrado!' });
    }

    // Verifica se o username já existe
    const usernameExistente = acessos.find((acesso) => acesso.username === username);
    if (usernameExistente) {
      return NextResponse.json({ success: false, message: 'Username já cadastrado!' });
    }

    // Gera um novo ID unico
    const newId = acessos.length > 0 ? acessos[acessos.length - 1].id + 1 : 1;

    // Cria o novo acesso
    const novoAcesso : Acesso = {
      id: newId,
      emailAcesso,
      username,
      senha,
    };

    // Adiciona o novo acesso à lista
    acessos.push(novoAcesso);

    // Escreve o arquivo JSON atualizado
    await fs.writeFile(filePath, JSON.stringify(acessos, null, 2), 'utf-8');

    // Retorna sucesso
    return NextResponse.json({ success: true, message: 'Acesso criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar acesso:', error);
    return NextResponse.json({ success: false, message: 'Erro ao criar acesso.' });
  }
}


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