import React, {Component} from "react";
import {connect} from "react-redux";
import {commentRecipe} from "../../actions/recipes";
import PropTypes from "prop-types";

class CommentItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({errors: newProps.errors});
    }
  }

  render() {
    const {recipeId, comments} = this.props;
    const {user} = this.props.auth;

    return <div>{comments && comments.map(comment => (
      <div key={comment._id} className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="#">
              <img className="rounded-circle d-none d-md-block"
                   src={comment.avatar}/>
            </a>
            <br/>
            <p className="text-center">{comment.userName}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
          </div>
        </div>
      </div>))
    }
    </div>
  }


}


CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  recipeId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {})(CommentItem);