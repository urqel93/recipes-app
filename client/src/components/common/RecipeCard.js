import React, {Component} from 'react';
import classnames from "classnames";
import PropTypes from "prop-types";

class RecipeCard extends Component {
  render() {

    const {recipes} = this.props;

    return recipes.map(recipe => (
      <div key={recipe._id} className="card mb-4">
        <h5 className="card-header">{recipe.name}</h5>
        <div className="card-body">
          <p className="card-text">{recipe.description}</p>
          <p className="card-text">{recipe.user.name}</p>
          <a href="#" className="btn btn-primary">Read recipe...</a>
        </div>
      </div>
    ));
  };
}

RecipeCard.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeCard;
