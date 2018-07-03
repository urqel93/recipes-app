import React, {Component} from "react";
import {connect} from "react-redux";
import {commentRecipe} from "../../actions/recipes";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup"

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({errors: newProps.errors});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const {user} = this.props.auth;
    const {recipeId} = this.props;

    const newComment = {
      text: this.state.text,
      user: user,
      userName: user.name,
      avatar: user.avatar
    };
    this.props.commentRecipe(recipeId, newComment);
    this.setState({text: ''});
  }


  render() {
    const {errors} = this.state;
    const {isAuthenticated} = this.props.auth;
    const isLogged = (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say Somthing...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  name={"text"}
                  value={this.state.text}
                  type={"text"}
                  placeholder={"Comment recipe..."}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        {isAuthenticated? isLogged : ''}
      </div>
    )
  }
}

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  commentRecipe: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  recipeId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {commentRecipe})(CommentForm);