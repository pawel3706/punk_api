import React from 'react';
import {ProductsConsumer} from '../../context';

const Counter = ({id, count, avaliableProducts}) => {
    return ( 
        <ProductsConsumer>
            {({changeProductCount}) => {
                return (
                    <ul className="pagination mb-2 mb-md-0">
                        <li className="page-item"><button disabled={!count ? true : false} onClick={() => changeProductCount(id, "decrement")} className="page-link text-body">-</button></li>
                        <li className="page-item"><span className="page-link text-body">{count}</span></li>
                        <li className="page-item"><button disabled={count === avaliableProducts ? true : false} onClick={() => changeProductCount(id)} className="page-link text-body">+</button></li>
                    </ul>
                )
            }}
        </ProductsConsumer>
    );
}
 
export default Counter;