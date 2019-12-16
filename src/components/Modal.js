import React from 'react';
import {ProductsConsumer} from '../context';
import {NavLink} from 'react-router-dom';
import '../styles/Modal.scss'


const Modal = () => {
    return ( 
        <>
            <ProductsConsumer>
                {value => {
                    const {image_url, name, price, size} = value.modalProduct;

                    if(value.modalIsOpen) {
                        return (
                            <div className="modal-window">
                                <div className="container">
                                    <div className="row">
                                        <div className="modal-window__content col-8 col-md-6 col-lg-4 mx-auto p-4 d-flex flex-column align-items-center">
                                            <h5 className="p-2 text-center">Dodano produkt do koszyka</h5>
                                            <img className='modal-window__image' style={{height: `${size.height}px`, width: `${size.width}px`}} src={image_url} alt={name}/>
                                            <h5 className="pt-2 text-center" >{name}</h5>
                                            <h5 className="text-muted">{`Cena: ${price} zł`}</h5>
                                            <button onClick={value.closeModal} className="btn btn-primary mb-2">Wróć do zakupów</button>
                                            <NavLink to="/cart">
                                                <button onClick={value.closeModal} className="btn btn-warning mb-3">Przejdz do koszyka</button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )  
                    }
                }}
            </ProductsConsumer>
            
        </>
     );
}
 
export default Modal;