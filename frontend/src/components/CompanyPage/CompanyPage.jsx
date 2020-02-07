import React, {Component} from 'react';

import './CompanyPage.css'
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

class CompanyPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reload: false
        }
    }

    onClick = async (event) => {
        if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'I'){
            this.props.history.push(`company/${this.props.company.id}`);
        }
    };

    deleteCompany = async (event) => {
        const resp = await fetch('/companies', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event.target.dataset.id
            })
        });
        const data = resp.json();

        window.location.reload()
        // this.props.history.reload();
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

                {
                    sessionStorage.user === '5e3312905fdb3b46083ffdd9' &&

                    <button onClick={this.deleteCompany} data-id={this.props.company.id} className="ui icon button delete">
                        <i data-id={this.props.company.id} className="close icon"></i>
                    </button>
                }

                <div data-id={this.props.company.id} className={'image_cont'}>
                    <img className={'image'} data-id={this.props.company.id} src={this.props.company.image} alt=""/>
                </div>
                <p data-id={this.props.company.id}>{this.props.company.name}</p>
                <p data-id={this.props.company.id}>Рейтинг: {this.props.company.averageRating}/5</p>
                <p data-id={this.props.company.id}>Комментарии: {this.props.company.count}</p>

                {!sessionStorage.user && <Redirect to="/login"/>}
            </div>
        );
    }
}

export default connect()(CompanyPage)
