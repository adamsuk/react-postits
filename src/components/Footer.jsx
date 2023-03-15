import React from "react";
// import { AiTwotoneSetting } from 'react-icons/ai';
import { HiPlusSm } from 'react-icons/hi';

import './Footer.css';

const Footer = ({ plusClick }) => (
  <div className="footer_container">
    <div className='footer'>
      {/* <AiTwotoneSetting className='footer_icon' /> // TODO: add modal to control workspace options */}
      <HiPlusSm className='footer_icon footer_last-item' onClick={plusClick} />
    </div>
  </div>
)

export default Footer;
