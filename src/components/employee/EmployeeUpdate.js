import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import validate from './EmployeeValidate';

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
    fetch('http://local-crm.com/api/v1/employees/' + id)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            fields: result.data
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
      fetch('http://local-crm.com/api/v1/employees/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(fields)
      })
        .then((res) => {
          this.props.history.push('/');
        })
        .catch((err) => {
          this.setState({ btn: 'Update' });
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
                <label htmlFor='employee_name'>Employee Name:</label>
                <input
                  ref='employee_name'
                  type='text'
                  name='employee_name'
                  className='form-control'
                  onChange={this.handleChange.bind(this, 'employee_name')}
                  value={this.state.fields['employee_name']}
                />
                <span className='error'>
                  {this.state.errors['employee_name']}
                </span>
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
