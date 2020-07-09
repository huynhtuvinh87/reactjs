import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class Detail extends Component {
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
    fetch(
      'https://gorest.co.in/public-api/users/' +
        id +
        '?_format=json&access-token=ZQLjTFFCeOqH1L54WeNoBfyi2e_ixHSpUVjs'
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            fields: result.result
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
export default Detail;
