import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import './CompanyDetails.css'

import Spinner from "../spinner/spinner";
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';

const styles = {
  button: {
    background: '#CC4E46',
    display: 'block',
    color: 'white',
    fontSize: '16px',
    marginTop: '10px',
    marginLeft: 'auto',
    width: '100px'
  },
  mock: {
    fontSize: '20px',
    color: 'grey'
  }
};

export default class CompanyDetails extends Component {

  state = {
    company: null,
    loading: false,
    loadingDB: false,
    error: false,
    // errorText: '',
  };

  // componentDidMount() {
  //   this.updateCompany();
  // }

  componentDidUpdate(prevProps) {
    if (this.props.companyId !== prevProps.companyId){
      this.updateCompany();
    }
  }

  onCompanyLoaded = (company) => {
    this.setState({
      company,
      loading: false,
      error: false,
    })
  };

  onError = () => {
    this.setState({
      error: true,
      // errorText: err,
      loading: false,
    })
  };

  updateCompany() {
    const {companyId} = this.props;

    if (!companyId) {
      return;
    }
    this.setState({
      loading: true,
    });

    fetch(`https://api.hh.ru/employers/${companyId}`)
      .then(response => response.json())
      .then(this.onCompanyLoaded)
      .catch(this.onError)
  }

  onAddClick = async (obj) => {
    try {
      let resp = await fetch('/add/employer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      });
      await resp.json();
      this.setState({
        error: false,
        loadingDB: true,
      });
    } catch (e) {
      this.onError();
    }
  };

  render() {
    if (this.state.error) {
      return <ErrorIndicator/>
    }

    if (this.state.loading) {
      return <Spinner/>
    }

    if (!this.state.company) {
      return <span style={styles.mock}>Selected a company from a list</span>
    }

    let {company: {
      id, name, logo_urls = null, area = null, site_url = null
    }} = this.state;

    const image = (logo_urls ? logo_urls["240"] : '') || '';
    const city = (area ? area["name"] : '') || '';
    site_url = site_url || '';

    const newCompany = {
      id,
      name,
      image,
      site_url,
      city,
      averageRating: 0,
      count: 0,
    };

    const viewLogo = image ?
      <img className="item-image"
           src={image}
           alt="logo company"
      />:
      null;

    const viewCity = city ?
      <div className="city-block">
        {city}
      </div> :
      null;

    const viewSite = site_url ?
      <div className="site-block">
        <a href={site_url} rel="noopener noreferrer">{site_url}</a>
      </div> :
      null;

    return (
      <div className="company-details card">
        {this.state.loadingDB && <Redirect to={`/company/${id}`}/>}
        <div className="wrapper-card">
          {viewLogo}
          <h2 className="">{name}</h2>
          {viewCity}
          {viewSite}
          <div
            className="ui animated button"
            tabIndex="0"
            onClick={() => this.onAddClick(newCompany)}
            style={styles.button}
          >
            <div className="visible content">Submit</div>
            <div className="hidden content">
              <i className="check icon"></i>
            </div>
          </div>
        </div>
      </div>

    )
  };
}
