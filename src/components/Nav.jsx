import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from 'react-icons/ai';

import './Nav.css';

const Nav = () => {
  const [workspace, setWorkspace] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setWorkspace(e.target.value)

  const handleSubmit = (e) => navigate(`/${workspace}`)

  return (
    <div className="nav_container">
      <div className='nav'>
        <Link to='/' >
          <AiFillHome className='nav_icon' />
        </Link>
        <form className='nav_last-item' onSubmit={handleSubmit} >
          <input
            className="nav_input"
            type="text"
            value={workspace}
            onChange={handleChange}
            placeholder='Workspace No.'
          />
        </form>
      </div>
    </div>
  )
}

export default Nav;
