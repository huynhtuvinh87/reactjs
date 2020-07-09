import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import validate from './EmployeeValidate';

class Create extends Component {
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
      fetch(
        'https://hudoshop.com/api/v1/employees/1',
        // 'https://gorest.co.in/public-api/users?_format=json&access-token=KSVemtJhTH4_7XKmZFBwhYB7WAjGDaE68nFw',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
              'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify(fields)
        }
      )
        .then((res) => {
          console.log(res);
          //this.props.history.push('/');
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
      <Modal show={this.state.showModal} onHide={this.close} size='full'>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form name='updateform' onSubmit={this.createSubmit.bind(this)}>
            <div className='form-group'>
              <label htmlFor='first_name'>First Name:</label>
              <input
                ref='first_name'
                type='text'
                name='first_name'
                className='form-control'
                onChange={this.handleChange.bind(this, 'first_name')}
                value={this.state.fields['first_name']}
              />
              <span className='error'>{this.state.errors['first_name']}</span>
            </div>
            <div className='form-group'>
              <label htmlFor='last_name'>Last Name:</label>
              <input
                ref='last_name'
                type='text'
                className='form-control'
                onChange={this.handleChange.bind(this, 'last_name')}
                value={this.state.fields['last_name']}
              />
              <span className='error'>{this.state.errors['last_name']}</span>
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Gender:</label>
              <select
                value={this.state.fields['gender']}
                onChange={this.handleChange.bind(this, 'gender')}
                className='form-control'
              >
                <option value='female'>Female</option>
                <option value='male'>Male</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <input
                ref='email'
                type='text'
                className='form-control'
                onChange={this.handleChange.bind(this, 'email')}
                value={this.state.fields['email']}
              />
              <span className='error'>{this.state.errors['email']}</span>
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Phone:</label>
              <input
                ref='phone'
                type='text'
                className='form-control'
                onChange={this.handleChange.bind(this, 'phone')}
                value={this.state.fields['phone']}
              />
              <span className='error'>{this.state.errors['phone']}</span>
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Website:</label>
              <input
                ref='website'
                type='text'
                className='form-control'
                onChange={this.handleChange.bind(this, 'website')}
                value={this.state.fields['website']}
              />
              <span className='error'>{this.state.errors['website']}</span>
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Address:</label>
              <input
                ref='address'
                type='text'
                className='form-control'
                onChange={this.handleChange.bind(this, 'address')}
                value={this.state.fields['address']}
              />
              <span className='error'>{this.state.errors['address']}</span>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className='btn btn-primary float-right'
            value='Submit'
            id='btn-update'
          >
            {this.state.btn}
          </button>
          <Button onClick={this.close} className='btn-danger'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default Create;
