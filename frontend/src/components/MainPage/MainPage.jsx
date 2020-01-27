import React, {Component} from 'react';

import './MainPage.css'
import CompanyPage from "../CompanyPage/CompanyPage";
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {LoadingCompanies} from "../../redux/creators";


class MainPage extends Component {

    componentDidMount = async () => {
        let resp = await fetch('/companies');
        let data = await resp.json();

        this.props.loading(data);
    };

    render() {
        return (
            <div className={'container'}>
                {
                    this.props.companies ?
                        this.props.companies.map((company) => {
                            return <CompanyPage key={company.id} company={company}/>
                        })
                        : <div>Не добавлено ни одной компании</div>
                }

                {!sessionStorage.user && <Redirect to="/login"/>}
            </div>
        );
    }
}


function mapStateToProps(store) {
    return {
        companies: store.companies
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loading: (data) => {
            dispatch(LoadingCompanies(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

