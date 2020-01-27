import React from 'react';

import CompanyList from "./CompanyList";
import {withRouter} from "react-router-dom";
import CompanyDeatiils from "./CompanyDetails";

const AddCompanyPage = ({history, match}) => {

  const {id} = match.params;

  return (
    <div className="row mb2">
      <div className="col-md-6">
        <CompanyList onCompanySelected={(id) => history.push(id)}/>
      </div>
      <div className="col-md-6">
        <CompanyDeatiils companyId={id}/>
      </div>
    </div>
  );
};

export default withRouter(AddCompanyPage);
