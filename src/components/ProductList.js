import React, { Component } from 'react';
import Product from './Product'
import {ProductsConsumer} from '../context';

class ProductList extends Component {
    state = { 
        screenWidth: window.innerWidth,
        colNumb: '',
    }

    setColNum = () => {
        this.state.screenWidth >= 992 ? this.setState({colNumb: 3}) : this.setState({colNumb: 2});
    }

    handleResolutionChange = () => {
        const condition = this.state.screenWidth >= 992 ? window.innerWidth < 992 : window.innerWidth >= 992;
        if(condition) {
            this.setState({screenWidth: window.innerWidth});
            this.setColNum();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResolutionChange);
    }

    componentDidMount() {
        this.setColNum();
        window.addEventListener('resize', this.handleResolutionChange);
    }

    render() {

        return ( 
            <ProductsConsumer>
                {({products}) => {
                    return (
                        <div className="product-list container">
                            {products.length > 0 && this.state.colNumb && 
                                <>
                                    {products.map(product => <Product key={product.id} data={product}/>)
                                        .reduce((prevEl, el, index) => {
                                            index%this.state.colNumb === 0 && prevEl.push([]);
                                            prevEl[prevEl.length-1].push(el);
                                            return prevEl
                                        }, [])
                                        .map((children, index) => <div key={index} className='row'>{children}</div>)}
                                </>
                            }
                        </div>
                    )
                }}
            </ProductsConsumer>
         );
    }
}
 
export default ProductList;