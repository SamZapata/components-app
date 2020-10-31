import React from 'react';
import { Media, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { COMMENTS } from '../shared/comments';

const comments = COMMENTS;

function RenderDish({dish}) {
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
        <RenderComments />
      </div>
    );
  }
  else {
    return(
      <div></div>
    );
  }
}

function RenderComments(){
  const dishComments = comments.map((comment) => {
    return(
      <Media tag="li" key={comment.id}>
        <Media body>
          <p>{comment.comment}</p>
          <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
        </Media>
      </Media>
    );
  });

  if (comments !== undefined || comments.length > 0) {
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

const DishDetail = (props) =>{
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
      <RenderDish dish={props.dish} />
    </div>
  )
}

export default DishDetail;
