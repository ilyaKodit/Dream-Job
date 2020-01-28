import React, {Component} from 'react';

import './MainPage.css'
import CompanyPage from "../CompanyPage/CompanyPage";
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {LoadingCompanies} from "../../redux/creators";

const styles = {
    button: {
        background: '#CC4E46',
        color: 'white',
        fontSize: '16px',
        marginLeft: '40px'
    },
    input: {
        textAlign: 'center'
    }
};

class MainPage extends Component {

    componentDidMount = async () => {
        let resp = await fetch('/companies');
        let data = await resp.json();

        this.props.loading(data);
    };

    render() {
        return (
            <>
                <div className={'mainPage_cont'}>
                    <div className="ui icon input">
                        <input style={styles.input} type="text" placeholder="Поиск компании"/>
                        <i className="search icon"></i>
                    </div>
                    <Link to={'/add/employer/'} className="ui animated button" style={styles.button} tabIndex="0">
                        <div className="visible content">Add company</div>
                        <div className="hidden content">
                            <i className="right plus icon"></i>
                        </div>
                    </Link>

                    {/*<Link to={'/add/employer/'}>Employer</Link>*/}
                </div>
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
            </>

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

