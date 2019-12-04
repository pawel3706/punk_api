import React, {Component} from 'react';

class OptionList extends Component {

    render() { 
        const {inputValue, searchRes, options} = this.props.data;

        return (
            <>
                {(inputValue && searchRes.length !== 0 && options.length !== 0) && 
                    <>
                        <ul className="list-group position-absolute">
                            {searchRes.map(item => <li key={item} className="list-group-item" onClick={this.props.handleClick}>{item}</li>)}
                        </ul>              
                    </>
                }
            </>
            
        );
    }
}
 
export default OptionList;
