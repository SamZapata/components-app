import React, { Component } from 'react';
import { Media, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
// import CommentForm from './CommentForm';

function RenderDish({dish}) {
  if (dish != null) {
    return(
      <FadeTransform in transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
      }}>
        <Card className="col-12 col-md-5">
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle><h3>{dish.name}</h3></CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  }
  else {
    return(
      <div></div>
    );
  }
}

function RenderComments({comments, postComment, dishId}){
  const dishComments = comments.map((comment) => {
    return(
      <Stagger in>
        <Fade in>
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>--{comment.author}</p>
          </li>
        </Fade>
      </Stagger>
    );
  });

  if (comments !== undefined || comments.length > 0) {
    return(
      <div className="col-12 col-md-5 m-2">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>
              {comments.map((comment) => {
              return (
                  <Fade in>
                    <li key={comment.id}>
                      <p>{comment.comment}</p>
                      <p>--{comment.author}</p>
                    </li>
                  </Fade>
              );
            })}
          </Stagger>
        </ul>
        <CommentForm dishId={dishId} postComment={postComment}/>
      </div>
    );
  }
  else {
    return(
      <h4>No comments</h4>
    );
  }
}

// comments
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
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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

// export default CommentForm;

const DishDetail = (props) =>{
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  return(
    <div className="container">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/home">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/menu">Menu</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          {props.dish.name}
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
      </div>
    </div>
  )
}

export default DishDetail;
