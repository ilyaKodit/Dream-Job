import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css'

function Footer(props) {
  return (
    <div id="footer">
      <ul id="horizontal-list">
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
          <Link to="/team">Team</Link>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
