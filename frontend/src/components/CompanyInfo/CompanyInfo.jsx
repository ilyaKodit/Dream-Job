import React, {Component} from 'react';
import './CompanyInfo.css';

import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {LoadingCompanies, LoadingFeedback} from "../../redux/creators";

class CompanyInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            company: null,
            feeds: null,
            checked: false
        }
    }

    componentDidMount = async () => {

        let respComp = await fetch('/companies');
        let dataComp = await respComp.json();
        this.props.loadingComp(dataComp);

        let respFeed = await fetch('/feed');
        let dataFeed = await respFeed.json();
        this.props.loadingFeed(dataFeed);

        this.props.companies.map((company) => {

            if (company.id === this.props.match.params.id) {
                this.setState({
                    company: company,
                    feeds: this.state.feeds,
                    input: this.state.input
                })
            }
        });

        let userFeedback = this.props.feedback.filter((feed) => {

            if (feed.companyId === this.props.match.params.id) {
                return feed;
            }
        });

        this.setState({
            company: this.state.company,
            feeds: userFeedback,
            input: this.state.input
        });

    };

    onClick = (event) => {

        this.setState({
            company: this.state.company,
            feeds: this.state.feeds,
            input: !this.state.input
        })
    };

    render() {
        return (
            <div className={'companyInfo_cont'}>

                {
                    this.state.company ?
                        <div>
                            <div>
                                <img className={'companyInfo_img'} src={this.state.company.image} alt=""/>
                            </div>

                            <p>{this.state.company.name}</p>
                            {this.state.company.site_url && <p><Link to={this.state.company.site_url}>Сайт</Link></p>}
                            <p>Рейтинг: {this.state.company.averageRating}/5</p>
                            <p>Отзывов: {this.state.company.count}</p>
                            <br/>
                            <input onClick={this.onClick} type="submit" value={'Написать отзыв'}/>

                            {
                                this.state.feeds ?
                                    this.state.feeds.map((feed) => {

                                        // Тут нужно вовращать компонент с отзывом
                                        return (<div key={feed._id}>
                                            <p>{feed.questions}</p>
                                        </div>)
                                    })
                                    : <div>Spiner</div>
                            }

                        </div>
                        : <div>Spiner</div>
                }

                {this.state.input && <Redirect to={`/feedback/${this.state.company.id}`}/>}
                {!sessionStorage.user && <Redirect to="/login"/>}
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        companies: store.companies,
        feedback: store.feedback
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadingComp: (data) => {
            dispatch(LoadingCompanies(data))
        },
        loadingFeed: (data) => {
            dispatch(LoadingFeedback(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfo)

