import React, {Component} from 'react';
import ProductList from './ProductList';
import { ProductsConsumer, ProductContext} from '../context';

class Search extends Component {

    componentWillUnmount() {
        this.context.resetShowOptions();
        this.context.resetProducts();
    }
    
    render() { 
        return ( 
            <>
                <ProductsConsumer>
                    {({searchPhrase, showOptions, products}) => {
                        return (
                            <>
                                {products.length > 0 && showOptions && 
                                    <>
                                        <h3 className="text-center py-4">{`Wyniki wyszukiwania dla: ${searchPhrase}`}</h3>
                                        <ProductList/>
                                    </>
                                }
                                {products.length === 0 && showOptions &&
                                    <>
                                        <h3 className="text-center py-4">{`Wyniki wyszukiwania dla: ${searchPhrase}`}</h3>
                                        <p className="text-center py-4">Brak produktów spełniających kryteria wyświetlania</p> }
                                    </>
                                }       
                            </>
                        )
                    }}
                </ProductsConsumer>
            </>
         );
    }
}

Search.contextType = ProductContext;
export default Search;
