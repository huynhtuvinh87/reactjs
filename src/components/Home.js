import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className='container'>
        <div className='content'>
          <h1>Welcome To React, restful api </h1>
          <p>
            1.
            <Link to='/users'>List data (fetch api)</Link>
          </p>
          <p>
            2. <Link to='/users'>Sort column</Link>
          </p>
          <p>
            3. <Link to='/users'>Pagination</Link>
          </p>
          <p>
            4. <Link to='/user/create'>Create data (fetch api) </Link>
          </p>
          <p>
            5.<Link to='/users'>Update data (fetch api)</Link>
          </p>
          <p>
            6.<Link to='/users'>Delete data (fetch api)</Link>
          </p>
        </div>
      </div>
    );
  }
}
export default Home;
