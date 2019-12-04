import React, { Component } from 'react';
import {ProductsConsumer} from '../../context'
import Headers from './Headers'
import CartList from './CartList'
import Footer from './Footer'

class Cart extends Component {
  state = {  }
  
  render() { 
    return ( 
      <ProductsConsumer>
        {value => {
          return (
            <>
              {value.cart.length === 0 
                  ? 
                    <h3 className="py-4 text-center">Twój koszyk jest pusty</h3> 
                  :
                    <>
                      <h3 className="py-4 text-center">Twój koszyk</h3>
                      <Headers/>
                      <CartList data={value.cart}/>
                      <Footer totalAmount={value.totalAmount}/>
                    </>
              }
            </>
          )
        }}
      </ProductsConsumer>
      
     );
  }
}
 
export default Cart;