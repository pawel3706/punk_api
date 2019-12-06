import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Cart from './Cart';
import SearchEngine from './SearchEngine';
import Home from './Home';
import Search from './Search';
import Default from './Default';
import Modal from './Modal';
import {ProductsProvider} from '../context'


class App extends Component {

  render() { 
    return (
      <ProductsProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <Route exact path={["/", "/search", "/cart"]} component={Navbar}/>
          <Route exact path={["/", "/search"]} component={SearchEngine}/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/search' component={Search}/>
            <Route exact path='/cart' component={Cart}/>
            <Route component={Default}/>
          </Switch>
          <Modal/>
        </Router>
      </ProductsProvider>
     );
  }
}
 
export default App;
