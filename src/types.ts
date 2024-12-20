
export type Acesso = {
    id: number;
    emailAcesso: string;
    username: string;
    senha: string;
}
  
export type Cliente = {
    id: number;
    cpfCliente: string; // CPF representado como string para lidar melhor com formatos
    nomeCliente: string;
    dataNascimento: string; // A data pode ser manipulada como string no formato ISO (yyyy-mm-dd)
    acesso: Acesso
}
  
export type ApiResponse = {
    success: boolean;
    message: string;
}

export type Carro = {
    id: number;
    placa: string,
    marca: string,
    modelo: string,
    anoFabricacao: number,
    cliente: Cliente
}

export type Oficina = {
    id: number;
    nome: string,
    cnpj: string,
    acesso: Acesso
}

export type Agendamento = {
    id: number;
    dthoraAgendamento: string;
    statusAgendamento: string;
    oficina?: {
        id: number;
        nome: string;
    };
    carro?: {
        id: number;
        placa: string;
    };
}
  
