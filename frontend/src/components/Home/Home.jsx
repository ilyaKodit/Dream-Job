import React from 'react';

import './Home.css';
import cloudPic from './ic-Cloud-red.png';

export default function Home() {
  return (
    <div className="home">
      {/*<img className="cloudPic" src={cloudPic} alt="cloud" />*/}
      <p className="sloganLine1 slogan">
        Заканчиваешь буткемп и не знаешь что дальше?
      </p>
      <p className="sloganLine2 slogan">Мы здесь, чтобы помочь!</p>
    </div>
  );
}
