import React, { Component, Fragment } from 'react';
import axios from 'axios'
import { Helmet } from 'react-helmet';
import './style.css'

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            data: {},
        };
    }

    componentDidMount() {
        axios.get(`https://api.mercadolibre.com/items/${this.state.id}`)
            .then(({ data }) => {
                this.setState({ data })
            })
    }

    render() {
        const { data } = this.state;
        console.log(this.state.data);
        let picture;
        let address;
        if (data.pictures) {
            picture = <img src={data.pictures[0].url} />;
        }
        if (data.seller_address) {
            address = <div>
                <div className="short-description item-conditions item-title__secundary">Informação da loja</div>
                <div className="short-description item-conditions">Cidade: {data.seller_address.city.name}</div>
                <div className="short-description item-conditions">Estado: {data.seller_address.state.name}</div>
                <div className="short-description item-conditions">País: {data.seller_address.country.name}</div>
            </div>;
        }
        return (
            <Fragment>
                <Helmet bodyAttributes={{ style: 'background-color : #ebebeb' }} />
                <div className="demo-card-wide mdl-card mdl-shadow--2dp">

                    <div className="mdl-cell mdl-cell--6-col">
                        <div className="image">
                            {picture}
                        </div>
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                        <div>#{data.id}</div>
                        <div className="short-description item-conditions">{data.sold_quantity} vendidos</div>
                        <div className="item-title__primary">{data.title}</div>
                        <div className="price-tag-fraction">R${data.price}</div>
                        <div className="dropdown-quantity-available">({data.initial_quantity} disponíveis)</div>
                        <div>{data.warranty}</div>
                        <br />
                        <div>{address}</div>
                    </div>

                </div>
            </Fragment>
        );
    }
}

export default Product;