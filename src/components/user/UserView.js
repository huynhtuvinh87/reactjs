import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import callApi from '../../constants/CallApi';
import * as config from '../../constants/Config';

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      fields: {}
    };
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    callApi(`${config.API_URL_USER}/${id}?`, 'GET').then(
      (result) => {
        this.setState({
          fields: result.data.result
        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    );
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
  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close} size='full'>
        <Modal.Header closeButton>
          <Modal.Title>User #{this.state.fields['id']}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>First Name: {this.state.fields['first_name']}</p>
          <p>First Name: {this.state.fields['last_name']}</p>
          <p>Gender: {this.state.fields['gender']}</p>
          <p>Phone: {this.state.fields['phone']}</p>
          <p>Email: {this.state.fields['email']}</p>
          <p>website: {this.state.fields['website']}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default UserView;
