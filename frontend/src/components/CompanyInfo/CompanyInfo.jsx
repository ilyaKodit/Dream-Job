import React, { Component } from 'react';
import './CompanyInfo.css';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoadingCompanies, LoadingFeedback } from "../../redux/creators";
import Review from "../Review/Review";
import Spinner from '../spinner/spinner';

const styles = {
  image: {
    maxHeight: '150px',
    maxWidth: '150px',
    display: 'block',
    margin: '0 auto 20px auto'
  },
  title: {
    color: '#b0352c',
    fontSize: '22px',
    marginBottom: '30px'
  },
  a: {
    textAlign: 'center',
    fontSize: '16px',
    color: 'grey',
    marginBottom: '30px'
  },
  text: {
    color: '#CC4E46',
    fontSize: '26px',
    textAlign: 'center',
    lineHeight: '10px'
  },
  button: {
    background: '#CC4E46',
    color: 'white',
    fontSize: '16px',
    width: '150px',
    display: 'block'
  },
  button2: {
    color: 'white',
    background: 'rgb(185, 185, 185)',
    fontSize: '16px',
  }
};

class CompanyInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      company: null,
      feeds: null,
      checked: false,
      buttonBack: false
    }
  }

  componentDidMount = async () => {

    let respComp = await fetch('/companies');
    let dataComp = await respComp.json();
    this.props.loadingComp(dataComp);

    let respFeed = await fetch('/feed');
    let dataFeed = await respFeed.json();
    this.props.loadingFeed(dataFeed);

    const companyD = this.props.companies.find((company) => company.id === this.props.match.params.id);

    const userFeedback = this.props.feedback.filter((feed) => feed.companyId === this.props.match.params.id);

    this.setState({
      company: companyD,
      feeds: userFeedback,
      checked: this.state.checked
    });

  };

  onClick = (event) => {

    this.setState({
      company: this.state.company,
      feeds: this.state.feeds,
      checked: !this.state.checked
    })
  };

  toPressButtonBack = () => {
    this.setState({
      buttonBack: true,
    })
  };

  render() {
    return (
      <div className={'companyInfo_cont'}>

        {
          this.state.company ?
            <div>

              <h4 style={styles.title} className="ui horizontal divider header">
                {this.state.company.name}
              </h4>
              <img style={styles.image} src={this.state.company.image} alt="" />

              <p style={styles.a}><a style={styles.a} href={this.state.company.site_url}>{this.state.company.site_url}</a></p>
              <p style={styles.text}>Рейтинг: {this.state.company.averageRating}/5</p>
              <p style={styles.text}>Отзывов: {this.state.company.count}</p>
              <div className="container_button">
                <div style={styles.button} onClick={this.onClick} className="ui vertical animated button" tabIndex="0">
                  <div className="visible content">Оставить отзыв</div>
                  <div className="hidden content">
                    <i className="right arrow icon"></i>
                  </div>
                </div>
                <div style={styles.button2} onClick={this.toPressButtonBack} className="ui animated button" tabIndex="0">
                  <div className="visible content">Назад</div>
                  <div className="hidden content">
                    <i className="left arrow icon"></i>
                  </div>
                </div>
              </div>
              {this.state.buttonBack && <Redirect to="/main" />}
              {
                this.state.feeds ?
                  this.state.feeds.map((feed) => {

                    return <Review key={feed._id} data={feed} />
                  })
                  : <Spinner />
              }

            </div>
            : <Spinner />
        }

        {this.state.checked && <Redirect to={`/feedback/${this.state.company.id}`} />}
        {!sessionStorage.user && <Redirect to="/login" />}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    companies: store.companies,
    feedback: store.feedback
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadingComp: (data) => {
      dispatch(LoadingCompanies(data))
    },
    loadingFeed: (data) => {
      dispatch(LoadingFeedback(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfo)

