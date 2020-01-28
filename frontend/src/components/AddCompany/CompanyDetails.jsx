import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import './CompanyDetails.css'

import Spinner from "../spinner/spinner";

export default class CompanyDetails extends Component {

  state = {
    company: null,
    loading: false,
    loadingDB: false,
    error: false,
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
    })
  };

  onError = (err) => {
    this.setState({
      error: true,
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
    let resp = await fetch('/add/employer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    let data = await resp.json();
    this.setState({
      loadingDB: true,
    });
    console.log(data);
  };

  render() {

    if (this.state.loading) {
      return <Spinner/>
    }

    if (!this.state.company) {
      return <span>Selected a company from a list</span>
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
      <div className="content">
        {city}
      </div> :
      null;

    const viewSite = site_url ?
      <div className="content">
        {`Сайт: ${site_url}`}
      </div> :
      null;

    return (
      <div className="company-details card">
        {/*<div className="card-body">*/}
        {/*  <h4>{name}</h4>*/}
        {/*  <ul className="list-group list-group-flush">*/}
        {/*    {viewCity}*/}
        {/*    {viewSite}*/}
        {/*  </ul>*/}
        {/*</div>*/}

        <div className="ui raised very padded text container segment">
          {viewLogo}
          <h2 className="ui header">{name}</h2>
          {viewCity}
          {viewSite}
          <button className='ui primary button' onClick={() => this.onAddClick(newCompany)}>Отправить</button>

        </div>

        {this.state.loadingDB && <Redirect to={`/company/${id}`}/>}
      </div>
    )
  };
}
