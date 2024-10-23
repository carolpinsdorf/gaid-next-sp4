import { useState, useEffect } from 'react';
import { FormStyled } from './styledGaragem'; 
import { Carro } from '@/types';

type Props = {
    aoCadastrarCarro: (carro: Carro) => Promise<void>; // Presumindo que seja uma chamada assíncrona
    carroEditado: Carro | null;
    setCarroEditado: (carro: Carro | null) => void;
}

export default function FormularioCarro({ aoCadastrarCarro, carroEditado, setCarroEditado }: Props) {
    const [placa, setPlaca] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [anoFabricacao, setAnoFabricacao] = useState<number | ''>('');

    useEffect(() => {
        if (carroEditado) {
            setPlaca(carroEditado.placa);
            setMarca(carroEditado.marca);
            setModelo(carroEditado.modelo);
            setAnoFabricacao(carroEditado.anoFabricacao);
        }
    }, [carroEditado]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (placa && marca && modelo && anoFabricacao) {
            const novoCarro: Carro = {
                id: carroEditado?.id || 0, // Se for edição, mantém o ID, caso contrário é um novo carro
                placa,
                marca,
                modelo,
                anoFabricacao: Number(anoFabricacao),
                cliente: carroEditado?.cliente || {
                    id: 0, // Ajuste conforme necessário
                    cpfCliente: '', 
                    nomeCliente: '', 
                    dataNascimento: '', 
                    acesso: { 
                        emailAcesso: '', 
                        username: '', 
                        senha: '' }
                }
            };

            aoCadastrarCarro(novoCarro); // Chama a função de cadastro ou edição
            resetForm();
        }
    };

    const resetForm = () => {
        setPlaca('');
        setMarca('');
        setModelo('');
        setAnoFabricacao('');
        setCarroEditado(null); // Reseta o formulário
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <h2>{carroEditado ? 'Editar Carro' : 'Cadastrar Carro'}</h2>
            <div className="div-campo">
                <input type="text" placeholder="Placa" value={placa} onChange={e => setPlaca(e.target.value)} required />
            </div>
            <div className="div-campo">
                <input type="text" placeholder="Marca" value={marca} onChange={e => setMarca(e.target.value)} required />
            </div>
            <div className="div-campo">
                <input type="text" placeholder="Modelo" value={modelo} onChange={e => setModelo(e.target.value)} required />
            </div>
            <div className="div-campo">
                <input type="number" placeholder="Ano de Fabricação" value={anoFabricacao} onChange={e => setAnoFabricacao(Number(e.target.value))} required />
            </div>
            <button type="submit">{carroEditado ? 'Salvar' : 'Cadastrar'}</button>
        </FormStyled>
    );
}
