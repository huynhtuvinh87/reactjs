import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import API from '../../constants/Api';
import * as config from '../../constants/Config';
import validate from './UserValidate';

class Update extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
      isLoaded: false,
      btn: 'Update',
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

  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    API.get(`users/${id}`, {
      params: {
        _format: config.FORMAT,
        'access-token': config.ACCESS_TOKEN
      }
    }).then(
      (result) => {
        this.setState({
          isLoaded: true,
          fields: result.data.result
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

  handleValidation() {
    let fields = this.state.fields;
    let formIsValid = true;
    let validations = validate(fields, formIsValid, 'update');
    this.setState({ errors: validations.errors });
    return validations.isValid;
  }

  updateSubmit(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      this.setState({ btn: 'Loading...' });
      let fields = this.state.fields;
      const id = parseInt(this.props.match.params.id);
      // axios
      //   .put(
      //     `http://dummy.hudoshop.com/api/v1/articles/2?access_token=o2snczxpt1sE5p7LBPMFXyVW4RB4PLhaUpesIfFF0znBh0U9vcvwmMkaC5abl5sI`,
      //     {
      //       title: 'Test 12345',
      //       description: '75000',
      //       content: '45cc0 dss',
      //       image:
      //         'https://cdn.vinagex.com/image.php?src=images/5c36f45fac210c6cd07f0b32/product/5c64b3ad07230.png&size=370x300',
      //       status: 1
      //     }
      //   )
      //   .then((res) => {
      //     console.log(res);
      //     console.log(res.data);
      //   });
      API.put(`users/${id}`, fields, {
        params: {
          _format: config.FORMAT,
          'access-token': config.ACCESS_TOKEN
        }
      })
        .then((res) => {
          this.props.history.goBack();
        })
        .catch((err) => {
          this.setState({ btn: 'Update' });
          return err;
        });
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    const { isLoaded } = this.state;
    const id = parseInt(this.props.match.params.id);
    if (!isLoaded) {
      return <div className='container'>Loading...</div>;
    } else {
      return (
        <Modal show={this.state.showModal} onHide={this.close} size='full'>
          <Modal.Header closeButton>
            <Modal.Title>Update User #{id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form name='updateform' onSubmit={this.updateSubmit.bind(this)}>
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
                  onChange={this.handleChange.bind(this, 'email')}
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
                <label htmlFor='website'>Website:</label>
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
                <label htmlFor='address'>Address:</label>
                <input
                  ref='address'
                  type='text'
                  className='form-control'
                  onChange={this.handleChange.bind(this, 'address')}
                  value={this.state.fields['address']}
                />
                <span className='error'>{this.state.errors['address']}</span>
              </div>
              <div className='form-group'>
                <label htmlFor='phone'>Status:</label>
                <select
                  value={this.state.fields['status']}
                  onChange={this.handleChange.bind(this, 'status')}
                  className='form-control'
                >
                  <option value='inactive'>Inactive</option>
                  <option value='active'>Active</option>
                </select>
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
}
export default Update;
