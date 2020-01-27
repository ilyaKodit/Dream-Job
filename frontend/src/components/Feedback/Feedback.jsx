import React, { Component } from 'react';

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

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interView: '',
      quest: '',
      task: '',
      contentText: '',
      rating: '',
    }
  };

  onChangeGlobal = (name) => (event) => {
    const newState = {};
    console.log(newState);
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
    // console.log(data);
    //   sessionStorage.user = data.id;
    //   sessionStorage.name = data.login;
    //   console.log(sessionStorage.user);
    //   this.setState({
    //     login: '',
    //     password: '',
    //   });
    //   window.location.reload();
    // };
  };

  render() {
    return (
      <>
        <div>Feed</div>
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
      </>
    )
  }
};

export default Feedback;

