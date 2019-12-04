import React from 'react';
import CartItem from './CartItem';

const CartList = ({data}) => {

    return ( 
        <div className="cart-list container-fluid">
            {data && data.map(({id, image_url, name, price, count, total, avaliableProducts}, index) => {
                return (
                    <CartItem 
                        key={id}
                        id={id}
                        img={image_url} 
                        name={name}
                        price={price} 
                        count={count} 
                        total={total}
                        avaliableProducts={avaliableProducts}
                    />
                )
            })}
        </div>
     );
}
 
export default CartList;