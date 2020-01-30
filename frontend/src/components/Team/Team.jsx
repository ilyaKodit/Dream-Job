import React from 'react';
import './Team.css';
import { SocialIcon } from 'react-social-icons';

import photo1 from './Ilya.jpg';
import photo2 from './Batyr.jpg';
import photo3 from './Mike.jpg';
import photo4 from './Mikhail.jpg';

export default function Team() {
  return (
    <div className="team-section">
      <div className="inner-width">
        <div className="pers">
          <div className="pe">

            <img src={photo1} alt="Ilya" />

            <div className="p-name">Ilya Makhovskiy</div>
            <div className="p-des">Developer</div>
            <div className="p-sm">
              <SocialIcon
                url="https://github.com/ilyaKodit"
                network="github"
                bgColor="#666666"
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </div>
          </div>

          <div className="pe">

            <img src={photo3} alt=""/>
            <div className="p-name">Mike</div>
            <div className="p-des">Человек-идея</div>
            <div className="p-sm">
              <SocialIcon
                url="https://github.com/mikeAvdeev12"
                network="github"
                bgColor="#666666"
                style={{
                  height: 20,
                  width: 20,
                }}
              />

            </div>
          </div>

          <div className="pe">

            <img src={photo4} alt="Mikhail" />
            <div className="p-name">Mikhail Grozov</div>

            <div className="p-des">Developer</div>
            <div className="p-sm">
              <SocialIcon
                url="https://github.com/magroz"
                network="github"
                bgColor="#666666"
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </div>
          </div>

          <div className="pe">

            <img src={photo2} alt="Batyr" />

            <div className="p-name">Batyrkhan Zhaparov</div>
            <div className="p-des">Developer</div>
            <div className="p-sm">
              <SocialIcon
                url="https://www.linkedin.com/in/batyrqh/"
                network="linkedin"
                bgColor="#0270b2"
                style={{
                  height: 20,
                  width: 20,
                }}
              />
              <SocialIcon
                url="https://github.com/batyr-qhan"
                network="github"
                bgColor="#666666"
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
