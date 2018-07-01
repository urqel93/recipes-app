import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import RecipeCard from "../common/RecipeCard"
import {getRecipes} from "../../actions/recipes";
import Spinner from "../common/Spinner";
import RecipeForm from "../form/RecipeForm";

class MyRecipes extends Component {

  componentDidMount() {
    this.props.getRecipes();
  }

  render() {
    const {recipes, loading} = this.props.recipe;
    const {isAuthenticated} = this.props.auth;
    let recipesContent;

    if (recipes === null || loading) {
      recipesContent = <Spinner/>
    } else {
      recipesContent = <RecipeCard recipes={recipes}/>
    }

    const addRecipe = (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <RecipeForm/>
          </div>
        </div>
      </div>

    );

    return (
      <div className="feed">
        {isAuthenticated ? addRecipe : ''}
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

MyRecipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe,
  auth: state.auth
});


export default connect(mapStateToProps, {getRecipes})(MyRecipes);
