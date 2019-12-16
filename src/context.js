import React, { Component } from 'react';
import defaultImg from './img/keg.png';
const ProductContext = React.createContext();

class ProductsProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            modalIsOpen: false,
            modalProduct: '',
            cart: '',
            totalAmount: 0,
            pageLimit: 12,
            currentPage: 1,
            productNumber: 325,
            searchPhrase: '',
            showOptions: false,
            prices: [],
            productsUpdate: false,
        }
    }

    fetchData = (url) => {
        
        return fetch(url)
            .then(data => data.json())
            .then(data => {
                return (
                
                    data.map(({id, image_url, name, description}) => {
                        
                        image_url =  image_url || defaultImg;
                        const index = this.state.prices.findIndex(item => item.id === id);
                        const price = index !== -1 ? this.state.prices[index].price : Math.floor(Math.random()*(51 - 5) + 5);
                        index === -1 && this.state.prices.push({id, price});

                        return (
                            {
                                id,
                                image_url,
                                name: name,
                                text: description,
                                price,
                                size:  {height: 199.469, width: image_url.indexOf('keg') !== -1 ? 100 : 70},
                                inCart: this.state.cart.length > 0 ? (this.state.cart.findIndex(item => item.id === id) !== -1 ? true : false) : false,
                                count: 0,
                                total: 0,
                                avaliableProducts: 9,
                            }
                        )
                    })
                )
            })
            .catch(err => console.log('Błąd', err))
    }

    getProducts= () => {
        console.log('get products')
        const {pageLimit, currentPage} = this.state;

        const url = `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${pageLimit}`;

        this.fetchData(url).then(data => {
            const products = data;
            
            this.setState({
                products,
                productsUpdate: true,
            }, () => this.setState({productsUpdate: false}))
        },);
    }

    getSearchOptions = (value) => {

        let phrase = value;
        [' ', '#', '&'].forEach(item => phrase = phrase.split(item).join(item === ' ' ? '_' : ''));

        const url = `https://api.punkapi.com/v2/beers?beer_name=${phrase}`;

        this.fetchData(url).then(data => {

            this.setState({
                searchPhrase: value,
                products: [...data],
                showOptions: true,
            })
        })
    }

    resetProducts = () => {
        this.setState({
            products: [],
            currentPage: 1,
        })
    }

    resetShowOptions = () => {
        this.setState({
            showOptions: false,
        })
    }

    openModal = (id) => {

        const {products} = this.state;
        const product = products.find(item => item.id === id);
        this.setState({
            modalIsOpen: true,
            modalProduct: product,
        })
    }

    closeModal = () => {

        this.setState({
            modalIsOpen: false,
            modalProduct: '',
        })
    }

    changeProductCount = (id, decrement) => {
        
        const {cart} = this.state;
        const index = cart.findIndex(item => item.id === id)
        const product = cart[index];
        decrement ? product.count-- : product.count++;
        product.total = product.count * product.price;
        
        this.setState({
            cart: this.state.cart,
        }, () => this.changeTotalAmount());
    }

    changeTotalAmount = () => {

        let total = 0;
        const cart = [...this.state.cart];
        cart.forEach(item => total += item.total);
        this.setState({
            totalAmount: total,
        })
    }

    addToCart = (id) => {

        const products = [...this.state.products];
        const index = products.findIndex(item => item.id === id);
        const product = products[index];
        product.inCart = true;
        product.count = 1;
        product.total = product.price;
        this.setState({
            cart: [...this.state.cart, product],
            products: products,
        }, () => this.changeTotalAmount());
    }

    removeItemFromCart = (id) => {
        const {cart, products} = this.state;
        const productInCart = cart.find(item => item.id === id);
        const indexInCart = cart.indexOf(productInCart);
        cart.splice(indexInCart, 1);

        const productInProducts = products.find(item => item.id === id);
        if (productInProducts) {
            productInProducts.inCart = false;
            productInProducts.count = 0;
            productInProducts.total = 0;
        }

        this.setState({
            products: products,
            cart: cart,
        }, () => this.changeTotalAmount());
    }

    removeAllFromCart = () => {

        let products = [...this.state.products];
        const select = products.filter(item => item.inCart === true);
        select.map(item => item.inCart = false);

        this.setState({
            products: products,
            cart: '',
        }, () => this.changeTotalAmount())
    }

    changePage = (number) => {

        if (number === "previous") {
            this.setState({
                currentPage: this.state.currentPage - 2,
            }, () => this.getProducts());
        } else if (number === "next") {
            this.setState({
                currentPage: this.state.currentPage + 2,
            }, () => this.getProducts());
        } else {
            this.setState({
                currentPage: number,
            }, () => this.getProducts());
        }
        
    }

    render() {
        console.log(this.state.productsUpdate)
        return ( 
            <ProductContext.Provider value={{
                ...this.state,
                getProducts: this.getProducts,
                openModal: this.openModal,
                closeModal: this.closeModal,
                addToCart: this.addToCart,
                changeProductCount: this.changeProductCount,
                changeTotalAmount: this.changeTotalAmount,
                removeItemFromCart: this.removeItemFromCart,
                removeAllFromCart: this.removeAllFromCart,
                changePage: this.changePage,
                getSearchOptions: this.getSearchOptions,
                resetShowOptions: this.resetShowOptions,
                resetProducts: this.resetProducts,
            }}
            >
                {this.props.children}
            </ProductContext.Provider>
         );
    }
}

const ProductsConsumer = ProductContext.Consumer;

export {ProductsProvider, ProductsConsumer, ProductContext};