
export type Acesso = {
    emailAcesso: string;
    username: string;
    senha: string;
}
  
export type Cliente = {
    cpfCliente: string; // CPF representado como string para lidar melhor com formatos
    nomeCliente: string;
    dataNascimento: string; // A data pode ser manipulada como string no formato ISO (yyyy-mm-dd)
    acesso: Acesso;
}
  
export type ApiResponse = {
    success: boolean;
    message: string;
}
  