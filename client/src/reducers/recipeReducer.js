import {
  GET_RECIPES,
  ADD_RECIPE,
  RECIPES_LOADING,
  GET_USER_RECIPES,
  GET_RECIPE,
  DELETE_RECIPE,
  ADD_COMMENT_TO_RECIPE
} from "../actions/types";

const initialState = {
  recipes: [],
  recipe: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECIPES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false
      };
    case GET_USER_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        loading: false
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [action.payload, ...state.recipes]
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe._id !== action.payload),
        loading: false
      };
    case ADD_COMMENT_TO_RECIPE:
      return {
        ...state,
        recipes: action.payload
      };


    default:
      return state;
  }
}
