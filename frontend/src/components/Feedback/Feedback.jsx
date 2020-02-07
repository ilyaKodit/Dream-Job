import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Feedback.css';

const styled1 = {
  button: {
    color: 'white',
    background: '#CC4E46',
    fontSize: '16px',
  },
  button2: {
    color: 'white',
    background: 'rgb(185, 185, 185)',
    fontSize: '16px',
  },
  input1: {
    fontSize: '16px',
  },
  input2: {
    fontSize: '16px',
    width: '180px',
  }
};

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interView: '',
      quest: '',
      task: '',
      contentText: '',
      rating: '',
      result: false,
      correct: false,
      buttonBack: false,
    }
  };

  onChangeGlobal = (name) => (event) => {
    const newState = {};
    // console.log(newState);
    newState[name] = event.target.value;
    this.setState(newState);
  };

  toPressButton = async () => {
    if (
      this.state.interView &&
      this.state.quest &&
      this.state.task &&
      this.state.contentText &&
      this.state.rating
    ) {
      let resp = await fetch('/feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: sessionStorage.user,

          companyId: this.props.match.params.id,
          interView: this.state.interView,
          quest: this.state.quest,
          task: this.state.task,
          contentText: this.state.contentText,
          rating: this.state.rating,
        })
      });
      let data = await resp.json();

      console.log(data);

      this.setState({
        interView: '',
        quest: '',
        task: '',
        contentText: '',
        rating: '',
        result: true,
      });

    } else {
      this.setState({
        correct: true
      })
    }
  };

  toPressButtonBack = () => {
    this.setState({
      buttonBack: true,
    })
  }

  render() {
    return (
      <div>
        <div className='div_feedback'>
          <div className='div_feedback_title'>Новый отзыв</div>
          <div className="ui labeled input">
            <div className="ui label div_feedback_color">Дата собеседования
        </div>
            <input style={styled1.input2} className="input_feedback" onChange={this.onChangeGlobal('interView')} type="date" value={this.state.interView}>
            </input>
          </div>
          <div className="ui labeled input">
            <div className="ui label div_feedback_color">Вопросы на собеседование
        </div>
            <textarea id='123' className="input_feedback input_feedback_big" onChange={this.onChangeGlobal('quest')} value={this.state.quest} />
          </div>
          <div className="ui labeled input">
            <div className="ui label div_feedback_color">Задания на собеседование
        </div>
            <textarea className="input_feedback input_feedback_big" onChange={this.onChangeGlobal('task')} value={this.state.task} />
          </div>
          <div className="ui labeled input">
            <div className="ui label div_feedback_color">Впечатление о компании
        </div>
            <textarea className="input_feedback input_feedback_big" onChange={this.onChangeGlobal('contentText')} value={this.state.contentText} />
          </div>
          <div className="ui labeled input">
            <div className="ui label div_feedback_color">Оценка компании
        </div>
            <select style={styled1.input1} className="input_feedback" onChange={this.onChangeGlobal('rating')} value={this.state.rating} >
              <option></option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <div className='div_feedback_allbutton'>
          <div className="div_feedback_button">
            <div style={styled1.button} onClick={this.toPressButton} className="ui animated button" tabIndex="0">
              <div className="visible content">Добавить отзыв</div>
              <div className="hidden content">
                <i className="plus icon"></i>
              </div>
            </div>
          </div>
          <div className="div_feedback_button">
            <div style={styled1.button2} onClick={this.toPressButtonBack}className="ui animated button" tabIndex="0">
              <div className="visible content">Назад</div>
              <div className="hidden content">
                <i className="left arrow icon"></i>
              </div>
            </div>
          </div>
        </div>
        {this.state.correct && <div className="ui negative message div_feedback_error">
          <div className="header">
            Перед отправкой заполните все поля формы
        </div>
        </div>}
        {this.state.buttonBack && <Redirect to={`/company/${this.props.match.params.id}`} />}
        {this.state.result && <Redirect to={`/company/${this.props.match.params.id}`} />}
        {!sessionStorage.user && <Redirect to="/main" />}
      </div>

    )
  }
};

export default Feedback;

