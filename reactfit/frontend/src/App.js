import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import ExercisesList from "./components/exercises-list.component";
import UpdateExercise from "./components/update-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import Map from "./components/map.component";
import CreateMeal from "./components/create-meal.component";
import MealsList from "./components/meals-list.component";
import UpdateMeal from "./components/update-meal.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/exercises"} className="nav-link">
                  Exercises
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/exercise-create"} className="nav-link">
                  Create Exercise
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/meals"} className="nav-link">
                  Meals
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/meal-create"} className="nav-link">
                  Create Meal
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/map"} className="nav-link">
                  Map
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/exercises" component={ExercisesList} />
            <Route path="/exercise-update/:id" component={UpdateExercise} />
            <Route path="/exercise-create" component={CreateExercise} />
            <Route path="/meals" component={MealsList} />
            <Route path="/meal-update/:id" component={UpdateMeal} />
            <Route path="/meal-create" component={CreateMeal} />
            <Route path="/map" component={Map} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
