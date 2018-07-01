import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {logoutUser, setCurrentUser} from "./actions/authActions";

import store from "./store"

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Recipes from "./components/layout/Recipes";
import MyRecipes from "./components/layout/MyRecipes";
import RecipeDetails from "./components/layout/RecipeDetails";
import NotFound from './components/not-found/NotFound';

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import './App.css';


if (localStorage.jwtToken) {
  //Set auth token header
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser);
    //Clear current Profile
    //Redirect to login
    window.location.href = '/login';
  }

}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component={Landing}/>
            <div className="container">
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/recipes" component={Recipes}/>
              <Switch>
                <PrivateRoute exact path="/myrecipes" component={MyRecipes}/>
              </Switch>
              <Route exact path="/recipe/:handle" component={RecipeDetails}/>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
