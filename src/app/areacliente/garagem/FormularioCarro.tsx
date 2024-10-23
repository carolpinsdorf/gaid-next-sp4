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

    const handleEdit = async (id: number, carro: Carro) => {
        try {
            // Aqui você pode fazer a chamada para a API para editar o carro
            const response = await fetch(`http://localhost:3000/api/base-carro/${id}`, { // Substitua pela URL correta da API
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carro),
            });

            if (!response.ok) {
                throw new Error('Erro ao editar carro');
            }

            const updatedCar = await response.json();
            console.log('Carro editado com sucesso:', updatedCar);
            resetForm();
        } catch (error) {
            console.error('Erro ao editar carro:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (placa && marca && modelo && anoFabricacao) {
            const novoCarro: Carro = {
                placa,
                marca,
                modelo,
                anoFabricacao: Number(anoFabricacao),
                cliente: {
                    id: 0, // Ajustar conforme necessário
                    cpfCliente: '', // Exemplo
                    nomeCliente: '', // Exemplo
                    dataNascimento: '', // Exemplo
                    acesso: { 
                        id: 0, 
                        emailAcesso: '', 
                        username: '', 
                        senha: '' }
                }
            };

            if (carroEditado) {
                handleEdit(carroEditado.id, novoCarro); // Chama o método de edição
            } else {
                aoCadastrarCarro(novoCarro); // Chama o método de cadastro
            }
        }
    };

    const resetForm = () => {
        setPlaca('');
        setMarca('');
        setModelo('');
        setAnoFabricacao('');
        setCarroEditado(null); // Reseta a edição
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
