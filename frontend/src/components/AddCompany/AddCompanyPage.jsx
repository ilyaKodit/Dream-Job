import React from 'react';

import './AddCompanyPage.css';

import CompanyList from './CompanyList';
import { withRouter, Redirect } from 'react-router-dom';
import CompanyDeatiils from './CompanyDetails';

const AddCompanyPage = ({ history, match }) => {

  const { id } = match.params;

  return (
    // <div className="ui two column centred grid">
    //   {!sessionStorage.user && <Redirect to={'/login'}/>}
    //   <div className="column centred">
    //     <CompanyList onCompanySelected={(id) => history.push(id)}/>
    //   </div>
    //   <div className="column centred">
    //     <CompanyDeatiils companyId={id}/>
    //   </div>
    // </div>
    <div className="ui two column centered grid">
      {!sessionStorage.user && <Redirect to={'/login'}/>}
      <div className="four column centered row">
        <div className="column">
          <CompanyList onCompanySelected={(id) => history.push(id)}/>
        </div>
        <div className="column">
          <CompanyDeatiils companyId={id}/>
        </div>
      </div>
    </div>

  );
};

export default withRouter(AddCompanyPage);
