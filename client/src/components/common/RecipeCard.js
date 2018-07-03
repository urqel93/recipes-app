import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {deleteRecipeById} from "../../actions/recipes"
import { connect } from 'react-redux';

class RecipeCard extends Component {
  onDeleteClick(id) {
    this.props.deleteRecipeById(id);
  }
  render() {


    const {recipes, auth} = this.props;

    return recipes.map(recipe => (
      <div key={recipe._id} className="card mb-4">
        <h5 className="card-header">{recipe.name}</h5>
        <div className="card-body">
          <p className="card-subtitle mb-2 text-muted">{recipe.shortText}</p>
          <p className="card-text">{recipe.userName}</p>
          <Link to={`/recipe/${recipe._id}`} className="btn btn-primary mr-1">Read recipe...</Link>
          {recipe.user === auth.user.id ? (
            <button
              onClick={this.onDeleteClick.bind(this, recipe._id)}
              type="button"
              className="btn btn-danger mr-1">
              <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    ));
  };
}

RecipeCard.propTypes = {
  deleteRecipeById: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteRecipeById})(RecipeCard);
