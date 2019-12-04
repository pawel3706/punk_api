import React from 'react';
import {ProductsConsumer} from '../../context'

const Footer = ({totalAmount}) => {
    return ( 
        <div className="cart__footer container-fluid">
            <div className="row">
                <div className="col-10 col-md-12 d-flex flex-column align-items-center align-items-md-end mt-4 mx-auto">
                    <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center text-uppercase mr-md-5 mb-2 text-center">
                        <h6 className="mb-0">Razem do zapłaty:</h6>
                        <span className="h4 text-danger font-weight-bolder ml-2 mb-0">{totalAmount},00 PLN</span>
                    </div>
                    <ProductsConsumer>
                        {({removeAllFromCart}) => {
                            return (
                                <div onClick={removeAllFromCart} className="btn btn-danger text-uppercase mr-md-5 mb-3">Opróżnij koszyk</div>
                            )
                        }}
                    </ProductsConsumer>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;