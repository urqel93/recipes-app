import axios from 'axios';

import {
  ADD_RECIPE,
  GET_RECIPES,
  RECIPES_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_USER_RECIPES,
  GET_RECIPE,
  DELETE_RECIPE,
  ADD_COMMENT_TO_RECIPE
} from './types';

export const addRecipe = recipeData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/recipes/add', recipeData)
    .then(res =>
      dispatch({
        type: ADD_RECIPE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getRecipes = () => dispatch => {
  dispatch(setRecipesLoading);
  axios
    .get('/api/recipes/')
    .then(res => dispatch({
        type: GET_RECIPES,
        payload: res.data
      })
    )
    .catch(err => dispatch({
        type: GET_RECIPES,
        payload: null
      })
    )
};

export const getUserRecipes = () => dispatch => {
  dispatch(setRecipesLoading);
  axios
    .get('/api/recipes/myrecipes')
    .then(res => dispatch({
        type: GET_USER_RECIPES,
        payload: res.data
      })
    )
    .catch(err => dispatch({
        type: GET_RECIPES,
        payload: null
      })
    )
};

// Get recipe by handle
export const getRecipeByHandle = handle => dispatch => {
  dispatch(setRecipesLoading());
  axios
    .get(`/api/recipes/recipe/${handle}`)
    .then(res =>
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RECIPE,
        payload: null
      })
    );
};

export const deleteRecipeById = id => dispatch => {
  dispatch(setRecipesLoading());
  axios
    .delete(`/api/recipes/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_RECIPE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const commentRecipe = (id, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/recipes/comment/${id}`, commentData)
    .then(res =>
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setRecipesLoading = () => {
  return {
    type: RECIPES_LOADING
  }
};


// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
