import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

class RecipeCard extends Component {
  render() {

    const {recipes} = this.props;

    return recipes.map(recipe => (
      <div key={recipe._id} className="card mb-4">
        <h5 className="card-header">{recipe.name}</h5>
        <div className="card-body">
          <p className="card-subtitle mb-2 text-muted">{recipe.shortText}</p>
          <p className="card-text">{recipe.user.name}</p>
          <Link to={`/recipe/${recipe._id}`} className="btn btn-primary">Read recipe...</Link>
        </div>
      </div>
    ));
  };
}

RecipeCard.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeCard;
