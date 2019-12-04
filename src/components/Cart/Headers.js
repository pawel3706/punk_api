import React from 'react';

const Headers = () => {
    return ( 
        <div className="cart-headers container-fluid d-none d-md-block">
            <div className="row">
                <div className="col-md-2"><p className="text-center text-uppercase text-secondary">Produkt</p></div>
                <div className="col-md-2"><p className="text-center text-uppercase text-secondary"> Nazwa</p></div>
                <div className="col-md-2"><p className="text-center text-uppercase text-secondary">Cena</p></div>
                <div className="col-md-2"><p className="text-center text-uppercase text-secondary">Ilość</p></div>
                <div className="col-md-2"><p className="text-center text-uppercase text-secondary">Usuń</p></div>
                <div className="col-md-2"><p className="text-center text-uppercase text-secondary">Wartość</p></div>
            </div>
        </div>
     );
}
 
export default Headers;