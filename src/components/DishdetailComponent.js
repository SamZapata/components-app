import React from 'react';
import { Media, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({dish}) {
  if (dish != null) {
    return(
      <div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{dish.name}</h3>
                <hr />
            </div>
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={dish.comments} />
            </div>
        </div>
        </div>
    );
  }
  else {
    return(
      <div></div>
    );
  }
}

function RenderComments(comments){
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
      <RenderDish dish={props.dish} />
    </div>
  )
}

export default DishDetail;
