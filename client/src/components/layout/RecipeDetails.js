import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Spinner from '../common/Spinner';
import CommentForm from '../comment/CommentForm';
import CommentItem from '../comment/CommentItem';
import {getRecipeByHandle} from '../../actions/recipes';

class RecipeDetails extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getRecipeByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.recipe === null && this.recipe.loading) {
      console.log(nextProps.recipe);
      this.props.history.push('/not-found');
    }
  }

  render() {
    const {recipe, loading} = this.props.recipe;
    let recipeContent;

    if (recipe === null || loading) {
      recipeContent = <Spinner/>;
    } else {
      recipeContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/recipes" className="btn btn-light mb-3 float-left">
                Back To Recipes
              </Link>
            </div>
            <div className="col-md-6"/>
            <div className="col-md-12">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>

                  <h6 className="card-subtitle mb-2 text-muted">{recipe.shortText}</h6>
                  <p className="card-text">{recipe.ingredients}</p>
                  <p className="card-text">{recipe.description}</p>
                </div>
              </div>
            </div>
          </div>
          <CommentForm recipeId={recipe._id}/>
          <CommentItem recipeId={recipe._id} comments={recipe.comments}/>
        </div>

      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{recipeContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  getRecipeByHandle: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  recipe: state.recipe,
});

export default connect(mapStateToProps, {getRecipeByHandle})(RecipeDetails);
