import React, { useState } from 'react';
import { Carro } from '@/types';
import { ListaCarro } from './styledGaragem';
import Image from 'next/image';
import iconCarro from '@/../public/assets/iconAreaDoCliente2.png';
import Modal from '@/components/Modal'; 

type Props = {
    carros: Carro[];
    onEdit: (carro: Carro) => void;
    onDelete: (id: number) => void;
};

export default function ListaCarros({ carros, onEdit, onDelete }: Props) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [carroSelecionado, setCarroSelecionado] = useState<number | null>(null);

    // Função para abrir o modal de confirmação e definir qual carro será excluído
    const confirmarExclusao = (id: number) => {
        setCarroSelecionado(id);
        setModalOpen(true);
    };

    // Função que será chamada ao confirmar a exclusão
    const handleDeleteCarro = () => {
        if (carroSelecionado !== null) {
            onDelete(carroSelecionado); // Chama a função de exclusão com o ID do carro
            setModalOpen(false); // Fecha o modal
        }
    };

    return (
        <ListaCarro>
            <div className="div-icon-carro">
                <Image src={iconCarro} alt="icone de carro" />
            </div>
            <h2>Meus Carros</h2>
            {carros.length > 0 ? (
                carros.map(carro => (
                    <div className="div-desc" key={carro.id}>
                        <p>Placa: {carro.placa}</p>
                        <p>Marca: {carro.marca}</p>
                        <p>Modelo: {carro.modelo}</p>
                        <p>Ano de Fabricação: {carro.anoFabricacao}</p>
                        <div className="box-botoes">
                            <button onClick={(handleEdit) => onEdit(carro)}>Editar</button>
                            <button onClick={() => confirmarExclusao(carro.id)}>Excluir</button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="div-desc">
                    <p>Nenhum carro cadastrado.</p>
                </div>
            )}

            {/* Modal de confirmação de exclusão */}
            <Modal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDeleteCarro}
            >
                <p>Tem certeza que deseja excluir este carro?</p>
            </Modal>
        </ListaCarro>
    );
}