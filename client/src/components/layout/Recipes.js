import React, {Component} from 'react'
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import RecipeCard from "../common/RecipeCard"
import {getRecipes} from "../../actions/recipes";
import Spinner from "../common/Spinner";

class Recipes extends Component {

  componentDidMount() {
    this.props.getRecipes();
  }

  render() {
    const {recipes, loading} = this.props.recipe;
    let recipesContent;

    if (recipes === null || loading) {
      recipesContent = <Spinner/>
    } else {
      recipesContent = <RecipeCard recipes={recipes}/>
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {recipesContent}
            </div>
          </div>
        </div>
      </div>

    )
  }


}

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  recipe: state.recipe,
});


export default connect(mapStateToProps, {getRecipes})(Recipes);
