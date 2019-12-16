import React, {Component} from 'react';
import ProductList from './ProductList';
import Pagination from './Pagination';

import {ProductsConsumer, ProductContext} from '../context';

class Home extends Component {

    componentDidMount() {
        this.context.getProducts();
    }

    componentWillUnmount() {
        this.context.resetProducts();
    }

    render() { 
        return ( 
            <ProductsConsumer>
                {({products}) => {
                    return (
                        <>
                            {products.length > 0 &&
                                <>
                                    <ProductList/>
                                    <Pagination/>
                                </>
                            }
                        </>
                    )
                }}
            </ProductsConsumer>
         );
    }
}

Home.contextType = ProductContext;
export default Home;