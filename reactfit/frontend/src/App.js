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
import Weather from "./components/weather/Weather";

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
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link to={"/home"} className="navbar-brand">
              ReactFit
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Exercises Tracker
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to={"/exercises"}>
                          Exercises
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"/exercise-create"}>
                          Add Exercise
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Meals Tracker
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to={"/meals"}>
                          Meals
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"/meal-create"}>
                          Add Meal
                        </Link>
                      </li>
                    </ul>
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
                {currentUser && (
                  <li className="nav-item">
                    <Link to={"/weather"} className="nav-link">
                      Weather
                    </Link>
                  </li>
                )}
                {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/profile"} className="nav-link">
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/login"}
                        className="nav-link"
                        onClick={this.logOut}
                      >
                        LogOut
                      </Link>
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
              </ul>
            </div>
          </div>
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
            <Route path="/weather" component={Weather} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
