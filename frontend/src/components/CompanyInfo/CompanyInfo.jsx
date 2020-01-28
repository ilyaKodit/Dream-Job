import React, {Component} from 'react';
import './CompanyInfo.css';

import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {LoadingCompanies, LoadingFeedback} from "../../redux/creators";

const styles = {
    image: {
        maxHeight: '150px',
        maxWidth: '150px',
        display: 'block',
        margin: '0 auto'
    },
    title: {
        color: '#CC4E46',
        fontSize: '20px'
    },
    text: {
        color: '#CC4E46',
    },
    button: {
        background: '#CC4E46',
        color: 'white',
        fontSize: '16px',
        width: '150px',
        margin: '0 auto',
        display: 'block'
    },
};

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

                            <h3 style={styles.title} className="ui horizontal divider header">
                                <i className="clipboard check icon"></i>
                                {this.state.company.name}
                            </h3>
                            <img style={styles.image} src={this.state.company.image} alt=""/>
                            <table className="ui definition table">
                                <tbody>

                                <tr>
                                    <td style={styles.text} className="two wide column">Site</td>
                                    <td><a href={this.state.company.site_url}>{this.state.company.site_url}</a></td>
                                </tr>
                                <tr>
                                    <td style={styles.text}>Rating</td>
                                    <td><p>{this.state.company.averageRating}/5</p></td>
                                </tr>
                                <tr>
                                    <td style={styles.text}>Reviews</td>
                                    <td><p>Отзывов: {this.state.company.count}</p></td>
                                </tr>
                                </tbody>
                            </table>

                            <div style={styles.button} onClick={this.onClick} className="ui vertical animated button" tabIndex="0">
                                <div className="visible content">Add review</div>
                                <div className="hidden content">
                                    <i className="plus icon"></i>
                                </div>
                            </div>

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

