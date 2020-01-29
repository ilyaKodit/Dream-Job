import React, { Component } from 'react';

import './CompanyList.css';
// import SwapiService from "../../services/swapi-service";
import Spinner from '../spinner/spinner';

export default class CompanyList extends Component {
  // swapiService = new SwapiService();

  state = {
    searchString: '',
    companiesList: null,
  };

  onTextChanged = async (e) => {
    const text = e.target.value;
    await this.setState({ searchString: text });
    this.getData();
  };

  getData = async () => {
    await this.setState({ companiesList: null });
    this.state.searchString.trim() && fetch(`https://api.hh.ru/employers?text=${this.state.searchString}`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          companiesList: responseData.items,
        });
      });
  };

  renderCompanies = (arr) => {
    return arr.map(({ id, name }) => {
      return (
        <li
          key={id}
          className="item"
          onClick={() => this.props.onCompanySelected(id)}
        >
          {name}
        </li>
      );
    });
  };

  render() {
    const { companiesList } = this.state;

    // if (!companiesList) {
    //   return <Spinner/>;
    // }

    const items = companiesList ?
      this.renderCompanies(companiesList) :
      <p>Not</p>;
    return (
      <div>
        {/*<input className='' placeholder="Поиск" onChange={this.onTextChanged} value={this.state.searchString}/>*/}
        <div className="ui input icon large">
          <input className='prompt' type="text" placeholder="Search for a company by name..." onChange={this.onTextChanged} value={this.state.searchString}/>
          <i className="circular search link icon"></i>
        </div>
        <ul className="ui middle aligned selection list animated large">
          {items}
        </ul>




      </div>
    );
  }
}
