import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

// variables to make validations
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    const options = [1, 2, 3, 4, 5]
    const selectOptions = options.map((option) => {
      return(
        <option>{option}</option>
      );
    });

    return(
      <>
      <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
          <div className="col-12 col-lg-12">
            <h3>Send us your Feedback</h3>
          </div>
          <div className="col-12 col-lg-11">
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label md={12}>Rating</Label>
                <Col md={12}>
                  <Control.select model=".rating" id="rating" name="rating"
                  className="form-control" >
                    {selectOptions}
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label md={12}>Your Name</Label>
                <Col md={12}>
                  <Control.text model=".author" id="author" name="author" placeholder="author" className="form-control" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}} />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less',
                    }} />
                </Col>
              </Row>
              <Row className="form-group">
                <Label md={12}>Comment</Label>
                <Col md={12}>
                  <Control.textarea model=".comment" id="comment" name="comment" row="12" className="form-control"/>
                </Col>
              </Row>
              <Row className="form-group">
                  <Col md={{size:10, offset: 2}}>
                      <Button type="submit" color="primary">
                      Add Comment
                      </Button>
                  </Col>
              </Row>
            </LocalForm>
          </div>
        </ModalBody>
      </Modal>
      </>
    );
  }
}

export default CommentForm;
