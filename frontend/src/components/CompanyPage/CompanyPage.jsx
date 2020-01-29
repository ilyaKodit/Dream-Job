import React, {Component} from 'react';

import './CompanyPage.css'
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

class CompanyPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null
        }
    }

    onClick = async (event) => {
        event.stopPropagation();

        this.setState({
            id: event.target.dataset.id
        })
    };

    onMouseOver = (event) => {
        let allImage = document.querySelectorAll('.image');
        allImage.forEach((image) => {
            if (image.dataset.id === event.target.dataset.id){
                image.classList.toggle('imageColor');
            }
        });
    };
    onMouseOut = (event) => {
        let allImage = document.querySelectorAll('.image');
        allImage.forEach((image) => {
            if (image.dataset.id === event.target.dataset.id){
                image.classList.toggle('imageColor');
            }
        });
    };

    render() {
        return (
            <div onClick={this.onClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} className={'company'} data-id={this.props.company.id}>
                <div data-id={this.props.company.id} className={'image_cont'}>
                    <img className={'image'} data-id={this.props.company.id} src={this.props.company.image} alt=""/>
                </div>
                <p data-id={this.props.company.id}>{this.props.company.name}</p>
                <p data-id={this.props.company.id}>Рейтинг: {this.props.company.averageRating}/5</p>
                <p data-id={this.props.company.id}>Комментарии: {this.props.company.count}</p>

                {this.state.id && <Redirect to={`company/${this.state.id}`}/>}
                {!sessionStorage.user && <Redirect to="/login"/>}
            </div>
        );
    }
}

export default connect()(CompanyPage)
