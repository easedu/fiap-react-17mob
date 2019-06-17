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

        // http://localhost:3000/product/MLB1165400089

        // axios.get(`https://api.mercadolibre.com/items/${this.state.id}/description`)
        //     .then(({ description }) => {
        //         this.setState({ description })
        //     })
    }

    render() {
        const { data } = this.state;
        console.log(this.state.data);
        let picture;
        if (data.pictures) {
            picture = <img src={data.pictures[0].url} />;
        }
        return (
            <Fragment>
                <Helmet bodyAttributes={{ style: 'background-color : #ebebeb' }} />
                <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--6-col">
                            <div>{picture}</div>
                        </div>
                        <div className="mdl-cell mdl-cell--6-col">
                            <div>#{data.id}</div>
                            <div className="short-description .item-conditions">{data.sold_quantity} vendidos</div>
                            <div className="item-title__primary">{data.title}</div>
                            <div className="price-tag-fraction">R${data.price},00</div>
                            <div className="dropdown-quantity-available">({data.initial_quantity} disponíveis)</div>
                            <div>{data.warranty}</div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Product;