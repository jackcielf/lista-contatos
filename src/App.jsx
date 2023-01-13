import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { v4 as chave } from 'uuid';
import Contato from './Components/Contato';

export default function App() {
    // State
    const [contato, setContato] = useState({ id: '', nome: '', telefone: '' });
    const [listaContatos, setListaContatos] = useState([]);

    // Ref
    const inputNome = useRef();
    const inputTelefone = useRef();

    // METODOS
    const definirNome = (e) => {
        setContato({ ...contato, nome: e.target.value });
    }

    const definirTelefone = (e) => {
        setContato({ ...contato, telefone: e.target.value });
    }

    const addContato = () => {
        // Validação dos campos
        if (contato.nome === "") {
            inputNome.current.focus();
            return
        } else if (contato.telefone === "") {
            inputTelefone.current.focus();
            return
        }

        // Verificar se o contato já existe
        let duplicado = listaContatos.find((ctt) => ctt.nome === contato.nome && ctt.telefone === contato.telefone);
        if (typeof duplicado !== 'undefined') {
            inputTelefone.current.focus();
            return;
        }

        // Adiciona um novo contato a lista
        setListaContatos([ ...listaContatos, { ...contato, id: chave() }]);

        // Limpar inputs
        setContato({ nome: '', telefone: ''});

        // Focar no input nome
        inputNome.current.focus();
    }

    // Ao clicar no Enter ao contato será adicionado (caso o input de telefone esteja com focus)
    function enterAddContato(e) {
        if (e.code === 'Enter') addContato();
    }

    function enterProximoCampo(e) {
        if (e.code === 'Enter') inputTelefone.current.focus();
    }

    //  Persistência do state
    // Carregar o array listaContatos no localStorage
    useEffect(() => {
        if (localStorage.getItem('meus_contatos') !== null) {
            setListaContatos(JSON.parse(localStorage.getItem('meus_contatos')))
        }
    }, []);

    // Atualizar a lista de contatos nno localStorage
    useEffect(() => {
        localStorage.setItem("meus_contatos", JSON.stringify(listaContatos))
    }, [listaContatos]);

    // Limpar a listfa do localStorage
    const limparStorage = () => {
        setListaContatos([]);
    }

    // Remover um elemento especifico
    const removerContato = (id) => {
        let tmp = listaContatos.filter(contato => contato.id !== id);
        setListaContatos(tmp);
    }

    return (
        <>
            <h1 className='h1 p-3 text-light text-center'><FontAwesomeIcon icon={faList} className='me-2' /> Lista de contatos</h1>

                <div className='container-sm ps-4 pe-4 pt-5 pb-5'>
                    <div className='card text-light'>
                        <div className='card-body'>
                            <div className='box_input'>
                                <label>Nome</label><br />
                                <input type="text" ref={ inputNome } value={ contato.nome } onKeyUp={ enterProximoCampo }  onChange={ definirNome } placeholder='Nome' className='input-control p-1 text-light' />
                            </div>
                            <div className='box_input mt-3'>
                                <label>Telefone</label><br />
                                <input type="text" ref={ inputTelefone } value={ contato.telefone } onKeyUp={ enterAddContato } onChange={ definirTelefone } placeholder='Telefone' className='input-control p-1 text-light' />
                            </div>
                            <div className='d-flex justify-content-between mt-3'>
                                <button onClick={ addContato } className='btn btn-primary'>
                                    <FontAwesomeIcon icon={faCirclePlus} className='me-2' />
                                    Adicionar
                                </button>
                                <button onClick={ limparStorage } className='btn btn-outline-warning ms-3'>
                                    <FontAwesomeIcon icon={faTrash} className='me-2' />
                                    Limpar Lista
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr style={{ "border": ".5px solid #263C9E" }} />

                <div className='container'>
                    <h4 className='text-center text-light'>Contatos adicionados</h4>
                    
                    {/* Somente percorrendo a lista de contatos */}
                    { listaContatos.map(contato => {
                        return <Contato key={ contato.id } id={ contato.id } nome={ contato.nome } telefone={ contato.telefone } remover={ removerContato } />
                    }) }
                </div>
        </>
    )
}