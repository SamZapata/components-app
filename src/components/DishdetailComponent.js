import React, { Component } from 'react';
import { Media, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { COMMENTS } from '../shared/comments';

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: COMMENTS
    }
  }

  renderDish() {
    const dish = this.props.dish;
    if (dish != null) {
      return(
        <div className="row">
          <Card className="col-12 col-md-5">
            <CardImg img="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
              <CardTitle><h3>{dish.name}</h3></CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
          {this.renderComments(dish)}
        </div>
      );
    }
    else {
      return(
        <div></div>
      );
    }
  }

  renderComments(dish){
    const dishComments = this.state.comments.map((comment) => {
      return(
        <Media tag="li" key={comment.id}>
          <Media body>
            <p>{comment.comment}</p>
            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
          </Media>
        </Media>
      );
    });
    if (this.state.comments !== undefined || this.state.comments.length > 0) {
      return(
        <div className="col-12 col-md-5 m-2">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {dishComments}
          </ul>
        </div>
      );
    }
    else {
      return(
        <h4>No comments</h4>
      );
    }
  }

  render() {
    return(
      <div className="container">
        {this.renderDish()}
      </div>
    )
  }
}

export default DishDetail;
