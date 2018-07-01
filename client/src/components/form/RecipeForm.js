import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import {addRecipe} from '../../actions/recipes';

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      shortText: '',
      description: '',
      ingredients: {},
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

  onSubmit(e) {
    e.preventDefault();

    const {user} = this.props.auth;

    const newRecipe = {
      name: this.state.name,
      shortText: this.state.shortText,
      description: this.state.description,
      ingredients: this.state.ingredients,
      user: user
    };

    this.props.addRecipe(newRecipe);
    this.setState({name: '', shortText: '', description: ''});
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {errors} = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Add new recipe</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  name={"name"}
                  value={this.state.name}
                  type={"text"}
                  onChange={this.onChange}
                  placeholder={"Name of recipe"}
                />
                <TextFieldGroup
                  name={"shortText"}
                  value={this.state.shortText}
                  type={"text"}
                  onChange={this.onChange}
                  placeholder={"Short text about recipe"}
                />
                <TextFieldGroup
                  name={"description"}
                  value={this.state.description}
                  type={"text"}
                  onChange={this.onChange}
                  placeholder={"Full description"}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RecipeForm.propTypes = {
  addRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {addRecipe})(RecipeForm);
