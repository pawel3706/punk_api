import React from 'react';
import {ProductsConsumer} from '../context'

const Product = (props) => {
    
    const {id, image_url:url, name, text, price, size, inCart} = props.data;

    const cutText = text.slice(0, 150);

    return (
        <div className="col-md-6 col-lg-4 d-flex align-items-stretch p-2">
            <div className="card">
                <div className="row flex-grow-1 no-gutters">
                    <div className="col-4 d-flex flex-column align-items-center justify-content-around pl-3 py-2">
                        <img className="card-img" style={{height: `${size.height}px`, width: `${size.width}px`}} src={url} alt={name}/>
                        <span className='price pt-1'><i>{price} zł</i></span>
                    </div>
                    <div className="col-8 d-flex align-items-stretch">
                        <div className="card-body d-flex flex-column justify-content-between align-items-start">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{cutText.length !== 150 ? cutText : `${cutText}...`}</p>
                            <ProductsConsumer>
                                {value => {
                                    return (
                                        <button disabled={inCart ? true : false} onClick={() => {value.openModal(id); value.addToCart(id)}} className="btn btn-primary">{inCart ? "Dodano do koszyka" : "Dodaj do koszyka"}</button>
                                    )}
                                }
                            </ProductsConsumer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}           

 
export default Product;