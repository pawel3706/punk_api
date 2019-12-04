import React from 'react';
import Counter from './Counter'
import {ProductsConsumer} from '../../context'

const CartItem = ({id, img, name, price, count, total, avaliableProducts}) => {
    return ( 
        <div className="row">
            <div className="col-10 col-md-2 d-flex justify-content-center align-items-center mx-auto p-1"><img src={img} style={{height: '65px'}} alt={name}/></div>
            <div className="col-10 col-md-2 d-flex justify-content-center align-items-center mx-auto"><h5 className='text-center'>{name}</h5></div>
            <div className="col-10 col-md-2 d-flex justify-content-center align-items-center mx-auto"><h5 className='text-center'>{`${price} PLN`}</h5></div>
            <div className="col-10 col-md-2 d-flex justify-content-center align-items-center mx-auto"><Counter id={id} count={count} avaliableProducts={avaliableProducts}/></div>
            <ProductsConsumer>
                {({removeItemFromCart}) => {
                    return (
                        <div className="col-10 col-md-2 d-flex justify-content-center align-items-center mx-auto"><div onClick={() => removeItemFromCart(id)} style={{cursor: "pointer"}}className='trash-icon'><i className="fas fa-trash text-warning"></i></div></div>
                    )
                }}
            </ProductsConsumer>
            <div className="col-10 col-md-2 d-flex justify-content-center align-items-center mx-auto"><h5 className='text-center'>Razem: <span>{total}</span>,00 PLN</h5></div>
        </div>
     );
}
 
export default CartItem;