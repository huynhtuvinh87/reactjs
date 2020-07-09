import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../constants/Api';
import * as config from '../../constants/Config';

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      selected: null
    };
  }

  componentDidMount() {
    API.get('/categories', {
      params: {
        'access-token': config.ACCESS_TOKEN
      }
    }).then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.data.result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }
  handleClick(id,e){
    this.setState({
      selected:id
    });
  }
  html(items) {
    if (items) {
      
      return (
        <div>
          {items.map((item, key) => {
            let className = item.parent_id?item.parent_id+" sub":"0"+key;
            let selected = this.state.selected;
            return (
              
              <div key={item.id} id={'item-'+item.id}>
                <div className="item">
                  <Link to={{ pathname: `/category/${item.id}` }} className='title'>
                  {item.title}
                </Link>
                <Link
                    to={{ pathname: `/category/delete/${item.id}` }}
                    className='btn btn-danger btn-sm delete float-right'
                  >
                    Delete
                  </Link>
                  <Link
                    to={{ pathname: `/category/update/${item.id}` }}
                    className='btn btn-success btn-sm update float-right'
                  >
                    Update
                  </Link>
                  
                </div>
                {this.html(item.children)}
              </div>
            );
          })}
        </div>
      );
    }
  }
  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div className='container'>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className='container'>Loading...</div>;
    } else {
      return (
        <div className='container-fuild'>
          <div className='content'>
            <h4>
              List Category
              <Link
                to={{ pathname: `/category/create` }}
                className='btn btn-primary btn-sm float-right'
              >
                <small>Add New</small>
              </Link>
            </h4>
            <div className='table-list'>{this.html(items)}</div>
          </div>
        </div>
      );
    }
  }
}
export default CategoryList;
