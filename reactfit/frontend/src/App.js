import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/AuthService";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/user/Home";
import Profile from "./components/user/Profile";
import BoardUser from "./components/user/BoardUser";
import BoardModerator from "./components/user/BoardModerator";
import BoardAdmin from "./components/user/BoardAdmin";
import ExercisesList from "./components/exercises/ExercisesList";
import EditExercise from "./components/exercises/EditExercise";
import CreateExercise from "./components/exercises/CreateExercise";
import Map from "./components/map/Map";
import CreateMeal from "./components/meals/CreateMeal";
import MealsList from "./components/meals/MealsList";
import UpdateMeal from "./components/meals/UpdateMeal";
import MusicPlayer from "./components/music-player/MusicPlayer";

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
            {currentUser && (
              <li className="nav-item">
                <Link to={"/music"} className="nav-link">
                  Music Player
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
            <Route path="/exercise-edit/:id" component={EditExercise} />
            <Route path="/exercise-create" component={CreateExercise} />
            <Route path="/meals" component={MealsList} />
            <Route path="/meal-update/:id" component={UpdateMeal} />
            <Route path="/meal-create" component={CreateMeal} />
            <Route path="/map" component={Map} />
            <Route path="/music" component={MusicPlayer} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
