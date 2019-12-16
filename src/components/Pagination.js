import React, {Component} from 'react';
import {ProductsConsumer} from '../context';
import {ProductContext} from '../context'

class Pagination extends Component {

    constructor(props) {
        super(props);
        this.divContainer = React.createRef();
        this.state = {}
    }

    middleButtons = (start, end) => {
        const numbs = [];
        for (let i = start; i <= end; i++) {
            numbs.push(i);
        }
        return numbs;
    } 

    getPageList = data => {

        const {productNumber, pageLimit, currentPage} = data;

        const lastPage = Math.ceil(productNumber/pageLimit);
        const middleLeft = Math.max(2, currentPage - 1);
        const middleRight = Math.min(lastPage - 1, currentPage + 1);
        const prevBtn = 'previous';
        const nextBtn = 'next';
        let buttons = [];

        const leftAligned = middleLeft === 2 ;
        const rightAligned = middleRight === lastPage - 1;

        if (leftAligned) {

            buttons = [1, ...this.middleButtons(middleLeft, middleLeft + 2), nextBtn, lastPage];

        } else if (rightAligned) {

            buttons = [1, prevBtn, ...this.middleButtons(middleRight - 2, middleRight), lastPage];

        } else {

            buttons = [1, prevBtn, ...this.middleButtons(middleLeft, middleRight), nextBtn, lastPage];

        }

        return (
            buttons.map(item => <PageItem key={item} number={item} currentPage={currentPage} handleClick={this.handleClick}/>)
        )
    }

    handleClick = (name) => {
        this.context.changePage(name);
    }

    componentDidUpdate() {
        if(this.context.productsUpdate) {
            this.divContainer.current.scrollIntoView();   
        }
    }

    render() {
        console.log('render pagination')
        return ( 
            <div className="container">
                <div className="row justify-content-center my-5">
                    <div className="pagination" ref={this.divContainer}>
                        <ProductsConsumer>
                            {data => {
                                return (
                                    <>
                                        {this.getPageList(data)}
                                    </>
                                )
                            }}
                        </ProductsConsumer>
                    </div>
                </div>
            </div>
         );
    }
}

Pagination.contextType = ProductContext;
export default Pagination;

const PageItem = ({number, currentPage, handleClick}) => {

    if (number === "previous") return (
        <li className="page-item">
            <div onClick={() => handleClick(number)} className="page-link" style={{cursor: 'pointer'}}><i className="fas fa-angle-double-left"></i></div>
        </li>
    );

    if (number === "next") return (
        <li className="page-item">
            <div onClick={() => handleClick(number)} className="page-link" style={{cursor: 'pointer'}}><i className="fas fa-angle-double-right"></i></div>
        </li>
    );

    return ( 
        <li className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <div onClick={() => handleClick(number)} className="page-link font-weight-bolder" style={{cursor: 'pointer'}}>{number}</div>
        </li>
     );
}
 