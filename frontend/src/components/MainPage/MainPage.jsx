import React, {Component} from 'react';

import './MainPage.css'
import CompanyPage from "../CompanyPage/CompanyPage";
import { Link, Redirect, Route } from 'react-router-dom';
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

    state = {
        searchString: "",
    };

    componentDidMount = async () => {
        await this.getData();
    };

    getData = async () => {
        let resp = await fetch('/companies');
        let data = await resp.json();

        this.props.loading(data);
    };

    onChangeInputSearch = async (e) => {
        const text = e.target.value;
        await this.setState({ searchString: text });
        const {searchString} = this.state;
        if (searchString) {
            this.getFilteredData();
        } else {
            this.getData();
        }

    };

    getFilteredData = async () => {
        try {
            const {searchString} = this.state;
            console.log(JSON.stringify(searchString));
            let resp = await fetch('/search/companies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({searchString: searchString})
            });

            let data = await resp.json();
            this.props.loading(data);
        } catch (e) {
            alert(e);
        }
    };

    render() {
        return (
            <>
                <div className={'mainPage_cont'}>
                    <div className="ui icon input">
                        <input style={styles.input} type="text" placeholder="Поиск компании" onChange={this.onChangeInputSearch}/>
                        <i className="search icon"></i>
                    </div>
                    <Link to={'/add/employer/'} className="ui animated button" style={styles.button} tabIndex="0">
                        <div className="visible content">Add company</div>
                        <div className="hidden content">
                            <i className="right plus icon"></i>
                        </div>
                    </Link>
                </div>
                <div className={'container'}>

                    {
                        this.props.companies ?
                            this.props.companies.map((company) => {
                                return <Route key={company.id}
                                    render={(props) => <CompanyPage {...props} company={company}/>}
                                />
                            })
                            : <div>Не добавлено ни одной компании</div>
                    }

                    {!sessionStorage.user && <Redirect to={`/login`}/>}
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

