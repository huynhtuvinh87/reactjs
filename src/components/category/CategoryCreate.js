import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import validate from './CategoryValidate';
import API from '../../constants/Api';
import * as config from '../../constants/Config';
class CategoryCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
      isLoaded: false,
      btn: 'Add New',
      showModal: true
    };
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({
      showModal: false
    });
    this.props.history.goBack();
  }

  open() {
    this.setState({ showModal: true });
  }

  handleValidation() {
    let fields = this.state.fields;
    let formIsValid = true;
    let validations = validate(fields, formIsValid, 'create');
    this.setState({ errors: validations.errors });
    return validations.isValid;
  }

  createSubmit(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      this.setState({ btn: 'Loading...' });
      let fields = this.state.fields;
      API.post(`categories/`, fields, {
        params: {
          'access-token': config.ACCESS_TOKEN
        }
      })
        .then((res) => {
          this.setState({
            showModal: false
          });
          this.props.history.goBack();
        })
        .catch((err) => {
          this.setState({ btn: 'Submit' });
          return err;
        });
    } else {
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form name='createform' onSubmit={this.createSubmit.bind(this)}>
          <div className='form-group'>
              <label htmlFor='parent_id'>Parent :</label>
              <select
                value={this.state.fields['parent_id']}
                onChange={this.handleChange.bind(this, 'parent_id')}
                className='form-control'
              >
                <option value='1'>Category 1</option>
                <option value='2'>Category 2</option>
                <option value='3'>Category 3</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                ref='title'
                type='text'
                name='title'
                className='form-control'
                onChange={this.handleChange.bind(this, 'title')}
                value={this.state.fields['title']}
              />
              <span className='error'>{this.state.errors['title']}</span>
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                ref='description'
                type='text'
                className='form-control'
                onChange={this.handleChange.bind(this, 'description')}
                value={this.state.fields['description']}
              />
              <span className='error'>{this.state.errors['description']}</span>
            </div>
            
            <button
            className='btn btn-primary float-right'
            value='Submit'
            id='btn-update'
          >
            {this.state.btn}
          </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
         
          <Button onClick={this.close} className='btn-danger'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default CategoryCreate;
