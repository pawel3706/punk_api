import React, { Component } from 'react';
import OptionList from './OptionList';
import '../../styles/SearchEngine.scss';
import {ProductContext} from '../../context';

class SearchEngine extends Component {
    state = { 
        productNumber: 325,
        perPage: 25,
        inputValue: '',
        searchRes: '',
        options: [],
    }

    handleSubmit = e => {

        e.preventDefault();

        if(this.state.inputValue === '') return;

        const phrase = this.state.inputValue;
        this.context.getSearchOptions(phrase);
        this.props.history.location.pathname !== '/search' && this.props.history.push('/search');

        this.setState({
            inputValue: '',
        })
    }

    handleInput = e => {

        const result = this.state.options.filter(option => option.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);

        this.setState({
            searchRes: result,
            inputValue: e.target.value,
        })
    }

    handleClick = e => {
        const text = e.target.innerText;
        this.context.getSearchOptions(text);
        this.props.history.location.pathname !== '/search' && this.props.history.push('/search');

        this.setState({
            inputValue: '',
        })
    }

    getOptionNames = () => {
        const {productNumber, perPage, options} = this.state

        for (let i = 1; i <= productNumber/perPage; i++) {

            const url = `https://api.punkapi.com/v2/beers?page=${i}`

            fetch(url)
                .then(data => data.json())
                .then(data => data.map(item => options.push(item.name)))
                .catch(err => console.log('Błąd', err));
        }

        this.setState({
            options,
        });
    }

    componentDidMount() {
        this.getOptionNames();
    }

    render() { 
        return ( 
            <div className='search-engine container my-3 my-md-5 pt-2'>
                <div className="row">
                    <div className="col-12 col-md-9 col-lg-7 px-2 mx-auto position-relative">
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group">
                                <input value={this.state.inputValue} onChange={this.handleInput} className='form-control' placeholder='Wyszukaj piwo...' type="text"/>
                                <div className="input-group-append">
                                    <button className='btn btn-warning' type='submit'>Wyszukaj</button>
                                </div>
                            </div>
                        </form>
                        <OptionList data={this.state} handleClick={this.handleClick}/>
                    </div>
                </div>
            </div>
         );
    }
}

SearchEngine.contextType = ProductContext;
export default SearchEngine;