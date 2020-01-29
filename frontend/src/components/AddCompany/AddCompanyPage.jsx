import React from 'react';

import './AddCompanyPage.css'

import CompanyList from "./CompanyList";
import {withRouter, Redirect} from "react-router-dom";
import CompanyDeatiils from "./CompanyDetails";

const AddCompanyPage = ({history, match}) => {

  const {id} = match.params;

  return (
    <div className="ui two column grid">
      {!sessionStorage.user && <Redirect to={'/login'}/>}
      <div className="column">
        <CompanyList onCompanySelected={(id) => history.push(id)}/>
      </div>
      <div className="column">
        <CompanyDeatiils companyId={id}/>
      </div>
    </div>
  );
};

export default withRouter(AddCompanyPage);
