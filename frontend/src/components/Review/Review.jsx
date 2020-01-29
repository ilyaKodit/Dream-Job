import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Review.css'

const styles = {
    cont: {
        marginTop: '20px'
    },
    group1: {
        marginTop: '-3px',
    },
    group1_item: {
        width: '33%'
    },
    heading: {
        fontSize: '18px',
        color: '#CC4E46',
        // textAlign: 'center',
        marginBottom: '-16px',
        marginTop: '30px',
        fontWeight: '600',
    },
    text: {
        fontSize: '16px',
        color: '#434343',
    },
    title_text: {
        fontSize: '18px',
        color: 'black',
    }
};

class Review extends Component {

    onClick = (event) => {
        document.querySelector(`.id${event.target.dataset.id}`).classList.toggle('open');
    };

    render() {
        return (
            <div>
                <div onClick={this.onClick} data-id={this.props.data._id} style={styles.cont} className={`ui segment review_cont id${this.props.data._id}`}>


                    <div style={styles.group1} className="ui horizontal segments">

                        <div data-id={this.props.data._id} style={styles.group1_item} className="ui segment">
                            <p style={styles.title_text} data-id={this.props.data._id}>{this.props.data.userName}</p>
                        </div>

                        <div data-id={this.props.data._id} style={styles.group1_item} className="ui segment">
                            <p style={styles.title_text} data-id={this.props.data._id}>Rating: {this.props.data.rating}/5</p>
                        </div>

                        <div data-id={this.props.data._id} style={styles.group1_item} className="ui segment">
                            <p style={styles.title_text} data-id={this.props.data._id}>{this.props.data.interviewDate}</p>
                        </div>

                    </div>

                    <p style={styles.heading} data-id={this.props.data._id}>Отзыв</p>
                    <div className="ui segments">
                        <div data-id={this.props.data._id} className="ui segment">
                            <p style={styles.text} data-id={this.props.data._id}>{this.props.data.contentText}</p>
                        </div>
                    </div>

                    <p style={styles.heading} data-id={this.props.data._id}>Вопросы на собеседовании</p>
                    <div className="ui segments">
                        <div data-id={this.props.data._id} className="ui segment">
                            <p style={styles.text} data-id={this.props.data._id}>{this.props.data.questions}</p>
                        </div>
                    </div>

                    <p style={styles.heading} data-id={this.props.data._id}>Задачи на собеседовании</p>
                    <div className="ui segments">
                        <div data-id={this.props.data._id} className="ui segment">
                            <p style={styles.text} data-id={this.props.data._id}>{this.props.data.tasks}</p>
                        </div>
                    </div>


                </div>


            </div>
        );
    }
}

export default connect()(Review)
