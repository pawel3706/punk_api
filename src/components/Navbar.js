import React from 'react';
import {Link} from 'react-router-dom';
import {ProductsConsumer} from '../context'

const Navbar = (props) => {
    const {pathname} = props.history.location;
    return ( 
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
            <div className="container">
                <ul className="navbar-nav w-100 flex-row justify-content-between">
                    <li className="nav-item d-flex align-items-center">
                        {pathname === '/' ? 
                            <span className="nav-link" style={{cursor: 'pointer'}}>Strona Główna</span>
                        :
                            <Link to="/" className="nav-link">Strona Główna</Link>
                        }
                    </li>
                    <li className="nav-item d-flex align-items-center">
                        <Link to="/cart" className="nav-link mr-2">
                            <i className="fas fa-shopping-cart" style={{fontSize: '1.5rem'}}></i>
                        </Link>
                            <ProductsConsumer>
                                {({totalAmount}) => {
                                    return (
                                        <span className="text-white-50">
                                            <span className="mr-1">{`${totalAmount},00`}</span>
                                            PLN
                                        </span>  
                                    )
                                }}
                            </ProductsConsumer>
                    </li>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;