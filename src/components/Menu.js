/* eslint-disable react/jsx-no-duplicate-props */
import '../App.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='container-fuild'>
            <div className='collapse navbar-collapse'>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item active'>
                  <Link to='/' className='nav-link'>
                    Home
                  </Link>
                </li>
                <li className='nav-item active'>
                  <Link to='/categories' className='nav-link'>
                    Categories
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/employee/update/2' className='nav-link'>
                    About
                  </Link>
                </li>

                <li className='nav-item' className='nav-link'>
                  <Link to='/contact'>Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Menu;
