import React, {Component} from 'react';
import {ProductsConsumer} from '../context';

class Pagination extends Component {

    getPageList = ({productNumber, pageLimit,  changePage}) => {
        
        const pages = [];

        for(let i = 1; i <= Math.ceil(productNumber/pageLimit); i++) {
            pages.push(i)
        }

        return (
            pages.map(item => <PageItem key={item} number={item}  changePage={changePage}/>)
        )
    }

    render() { 

        return ( 
            <div className="container">
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

const PageItem = ({number, changePage}) => {
    return ( 
        <li className="page-item">
            <div onClick={() => changePage(number)} className="page-link" style={{cursor: 'pointer'}}>{number}</div>
        </li>
     );
}
 