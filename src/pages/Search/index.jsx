import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Search extends Component {
    constructor() {
        super();

        this.onSearch = this.onSearch.bind(this);
    }

    state = {
        results:[],
        redirect: false
    }

    onSearch(event) {
        const value = event.currentTarget.value;

        axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${value}`)
            .then(({ data }) => {
                this.setState({ results: data.results, redirect: true })
                console.log(this.state.results);
            })
    }

    renderRedirect = (id) => {
        if (this.state.redirect) {
            return <Redirect to={`/product/${id}`} />
        }
    }

    render() {
        const { results } = this.state;
        console.log(this.state.results);
        let resultId;
        if (results[0]) {
            console.log(results[0].id);
            resultId = results[0].id;
            console.log(resultId);
        }
        return (
            <div>
                <input type="text" onChange={this.onSearch} />
                <div>
                    {this.renderRedirect(resultId)}
                    <button onClick={this.setRedirect}>Redirect</button>
                </div>
            </div>
        )
    }
};

export default Search;