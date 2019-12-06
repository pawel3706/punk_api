import React, {Component} from 'react';
import {ProductsConsumer} from '../context';

class Pagination extends Component {

    constructor(props) {
        super(props);
        this.divContainer = React.createRef();
    }

    middleButtons = (start, end) => {
        const numbs = [];
        for (let i = start; i <= end; i++) {
            numbs.push(i);
        }
        return numbs;
    } 

    getPageList = data => {

        const {productNumber, pageLimit, currentPage, changePage} = data;

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
            buttons.map(item => <PageItem key={item} name={item} currentPage={currentPage} changePage={changePage}/>)
        )
    }

    componentDidUpdate() {
        this.divContainer.current.scrollIntoView();
    }

    render() { 
        return ( 
            <div className="container" ref={this.divContainer}>
                <div className="row justify-content-center my-5">
                    <div className="pagination">
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

export default Pagination;

const PageItem = ({name, changePage, currentPage}) => {

    if (name === "previous") return (
        <li className="page-item">
            <div onClick={() => changePage(name)} className="page-link" style={{cursor: 'pointer'}}><i className="fas fa-angle-double-left"></i></div>
        </li>
    );

    if (name === "next") return (
        <li className="page-item">
            <div onClick={() => changePage(name)} className="page-link" style={{cursor: 'pointer'}}><i className="fas fa-angle-double-right"></i></div>
        </li>
    );

    return ( 
        <li className={`page-item ${name === currentPage ? 'active' : ''}`}>
            <div onClick={() => changePage(name)} className="page-link font-weight-bolder" style={{cursor: 'pointer'}}>{name}</div>
        </li>
     );
}
 