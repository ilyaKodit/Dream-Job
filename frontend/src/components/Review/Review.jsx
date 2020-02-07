import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Review.css'

const styles = {
    cont: {
        marginTop: '20px'
    },
    group1: {
        marginTop: '-4px',
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
        textAlign: 'center',
    },
    button: {
        background: '#CC4E46',
        color: 'white',
        fontSize: '16px',
        width: '120px',
        margin: '0 auto 20px auto',
        display: 'block',
    },
};

class Review extends Component {

    onClick = (event) => {
        if (event.target.className !== '' && event.target.className.split(' ').includes('Btn')){

        } else {
            document.querySelector(`.id${event.target.dataset.id}`).classList.toggle('open');
        }

    };

    deleteReview = async (event) => {
        const resp = await fetch('/feed', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event.target.dataset.id,
                companyId: this.props.data.companyId
            })
        });
        const data = await resp.json();

        window.location.reload()
    };

    getDate = () => {
        let date = new Date(this.props.data.interviewDate);

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (day < 10) {
            day = `0${day}`;
        }

        if (month < 10) {
            month = `0${month}`;
        }

        return `${day}.${month}.${year}`;
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
                            <p style={styles.title_text} data-id={this.props.data._id}>{this.getDate()}</p>
                        </div>

                    </div>

                    <p style={styles.heading} data-id={this.props.data._id}>Отзыв</p>
                    <div className="ui segments">
                        <div data-id={this.props.data._id} className="ui segment">
                            <p className='text-wrap' style={styles.text} data-id={this.props.data._id}>{this.props.data.contentText}</p>
                        </div>
                    </div>

                    <p style={styles.heading} data-id={this.props.data._id}>Вопросы на собеседовании</p>
                    <div className="ui segments">
                        <div data-id={this.props.data._id} className="ui segment">
                            <p className='text-wrap' style={styles.text} data-id={this.props.data._id}>{this.props.data.questions}</p>
                        </div>
                    </div>

                    <p style={styles.heading} data-id={this.props.data._id}>Задачи на собеседовании</p>
                    <div className="ui segments">
                        <div data-id={this.props.data._id} className="ui segment">
                            <p className='text-wrap' style={styles.text} data-id={this.props.data._id}>{this.props.data.tasks}</p>
                        </div>
                    </div>

                    {
                        sessionStorage.user === '5e3312905fdb3b46083ffdd9' &&

                        <div onClick={this.deleteReview} data-id={this.props.data._id} style={styles.button} className="ui vertical animated button Btn" tabIndex="0">
                            <div data-id={this.props.data._id} className="hidden content Btn">
                                <i data-id={this.props.data._id} className="close icon Btn"></i>
                            </div>
                            <div data-id={this.props.data._id} className="visible content Btn">Удалить</div>
                        </div>
                    }

                </div>


            </div>
        );
    }
}

export default connect()(Review)

