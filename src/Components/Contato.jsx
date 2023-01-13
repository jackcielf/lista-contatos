import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons';
//import './Contato.css';

export default function Contato(props) {

    const styleItem = {
        'display': 'grid',
        'place-items': 'center'
    }

    return (
        <>
            {/* Apresentação da lista de contatos */}
            <div className='d-flex align-items-center justify-content-between bg-primary p-3 m-2 rounded' style={{ 'height': "55px" }}>
                <div className='item' style={ styleItem }>
                    <FontAwesomeIcon icon={faUser} />
                    <p className='m-0 text-light'>{props.nome}</p>
                </div>
                <div className='item' style={ styleItem }>
                    <FontAwesomeIcon icon={faPhone} />
                    <p className='m-0 text-light'>{props.telefone}</p>
                </div>
                <button onClick={ () => { props.remover(props.id) } } className='btn'>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </>
    )
}