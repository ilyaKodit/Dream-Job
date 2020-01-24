import React, { Component } from 'react';

import './AddCompany.css';

class AddCompany extends Component {

  state = {
    searchString: '',
    data: '',
  };

  onTextChanged = async (e) => {
    const text = e.target.value.trim();   // удаляем пробелы
    await this.setState({ searchString: text });
    this.getData();
  };

  getData = async () => {
    await this.setState({ data: '' });
    fetch(`https://api.hh.ru/employers?text=${this.state.searchString}`)
      .then(response => response.json())
      .then(responseData => {

        this.state.searchString && this.setState({
          data: responseData.items,
        });
      });
  };

  render() {
    const viewData = this.state.data.length > 0 ? <ItemList data={this.state.data}/> : <div>Нет данных</div>;
    return (
      <>
        <input placeholder="Поиск" onChange={this.onTextChanged} value={this.state.searchString}/>
        {viewData}
        {/*{notData}*/}
      </>
    );
  }
}

export default AddCompany;


function ItemList({data}) {
  const elements = data.map((item) => {
    const {id, name} = item;
    return (
      <li key={id}>
        {name}
      </li>
    );

  });
  return (
    <ul>{elements}</ul>
  );
}
