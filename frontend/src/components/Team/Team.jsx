import React from 'react';
import './Team.css';
import { SocialIcon } from 'react-social-icons';

import photo1 from './p1.png';
import photo2 from './DSC07922 copy2.jpg';
import photo3 from './p2.png';
import photo4 from './p3.png';

export default function Team() {
  return (
    <div className="team-section">
      <div className="inner-width">
        <h1>Meet Our Team</h1>
        <div className="pers">
          <div className="pe">
            <img src={photo1} alt="" />
            <div className="p-name">Full Name</div>
            <div className="p-des">Designer</div>
            <div className="p-sm">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="pe">
            <img src={photo2} alt="" />
            <div className="p-name">Batyrkhan Zhaparov</div>
            <div className="p-des">Бешеный разработчик</div>
            <div className="p-sm">
              <a href="https://twitter.com/home">
                <SocialIcon
                  network="twitter"
                  bgColor="#ff5a01"
                  style={{ height: 20, width: 20 }}
                />
                {/* <i className="fab fa-facebook-f"></i> */}
              </a>
              <a href="№">
                <SocialIcon
                  network="github"
                  bgColor="#ff5a01"
                  style={{ height: 20, width: 20 }}
                />
                {/* <i className="fab fa-twitter"></i> */}
              </a>
              {/* <a href="#">
                <i className="fab fa-instagram"></i>
              </a> */}
            </div>
          </div>

          <div className="pe">
            <img src={photo3} alt="" />
            <div className="p-name">Full Name</div>
            <div className="p-des">Developer</div>
            <div className="p-sm">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="pe">
            <img src={photo4} alt="" />
            <div className="p-name">Full Name</div>
            <div className="p-des">Developer</div>
            <div className="p-sm">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
