import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import cloudPic from './ic-Cloud-red.png';

export default function Home() {
  return (
    <div className="home">
      <img className="cloudPic" src={cloudPic} alt="" />
      <p className="sloganLine1">
        Заканчиваешь буткемп и не знаешь что дальше?
      </p>
      <p className="sloganLine2">Мы здесь, чтобы помочь!</p>
      <br />
      <br />
      <div>
        <Link className={'registr_item'} to={'/registration'}>
          Узнать больше
        </Link>
      </div>
    </div>
  );
}
