import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Search extends Component {
    constructor(){
        super();

        this.onSearch = this.onSearch.bind(this);
        this.state = {
            results: [],
        };
    }

    onSearch(event) {
        const value = event.currentTarget.value;

        axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${value}`)
            .then(({ data }) => {
                this.setState({ results: data.results, redirect: true })
            })
    }

    renderIds(resultId){
        return (
            <div key={ resultId.id }>
                <ul className="mdl-list">
                    <li className="mdl-list__item mdl-list__item--two-line">
                        <span className="mdl-list__item-primary-content">
                            <span>{ resultId.title }</span>
                        </span>
                        <span className="mdl-list__item-secondary-content">
                            <Link to={ `/product/${resultId.id}`}> 
                                Abrir
                            </Link>
                        </span>
                    </li>
                </ul>    
            </div>
            
        )
    }

    render() {
        const { results } = this.state;
        return (
            <div>
                <div>
                    <div className="mdl-cell mdl-cell--12-col mdl-cell--N-col-phone">
                        <div className="mdl-cell--middle">
                            <input type="text" placeholder="Buscar" onChange={ this.onSearch } />
                            <ul>
                                { results.map(this.renderIds) }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;