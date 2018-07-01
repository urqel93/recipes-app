import {GET_RECIPES, ADD_RECIPE, RECIPES_LOADING, GET_USER_RECIPES} from "../actions/types";

const initialState = {
  recipes: [],
  recipe: [],
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
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [action.payload, ...state.recipes]
      };


    default:
      return state;
  }
}
