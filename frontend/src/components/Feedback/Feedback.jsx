import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import styled from 'styled-components';

const Div = styled.div`
  margin: 20px;
  color: green;
`
const Input = styled.input`
  color: red;
`
const Button = styled.button`
  color: red;
  background-color: yellow;
`
const Div1 = styled.div`
  font-size: 25px;
  margin: 20px;
  color: red;
`

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
      correct: false
    }
  };

  onChangeGlobal = (name) => (event) => {
    const newState = {};
    // console.log(newState);
    newState[name] = event.target.value;
    this.setState(newState);
  };

  toPressButton = async () => {

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
    if (
      !this.state.interView.length == 0 &&
      !this.state.quest.length == 0 &&
      !this.state.task.length == 0 &&
      !this.state.contentText.length == 0 &&
      !this.state.rating.length == 0
    ) {
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
        correct: !this.state.correct
      })
    }
=
  };

  render() {
    return (
      <>
        <div>Добавить отзыв:</div>
        <Div>
          Дата собеседования <Input onChange={this.onChangeGlobal('interView')} type="date" value={this.state.interView}>
          </Input>
        </Div>
        <Div>
          Вопросы на собеседование <textarea onChange={this.onChangeGlobal('quest')} placeholder='questions' value={this.state.quest} />
        </Div>
        <Div>
          Задания на собеседование <textarea onChange={this.onChangeGlobal('task')} placeholder='tasks' value={this.state.task} />
        </Div>
        <Div>
          Общее впечатление о компании <textarea onChange={this.onChangeGlobal('contentText')} placeholder='tasks' value={this.state.contentText} />
        </Div>
        <Div>
          Оценка компании <input onChange={this.onChangeGlobal('rating')} type='number' placeholder='tasks' value={this.state.rating} />
        </Div>
        <Button onClick={this.toPressButton}>Оставить отзыв</Button>
        {this.state.correct && <Div1>Заполните все поля</Div1>}
        {this.state.result && <Redirect to={`/company/${this.props.match.params.id}`} />}
        {!sessionStorage.user && <Redirect to="/main" />}
      </>
    )
  }
};

export default Feedback;

