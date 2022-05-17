import React, { Component } from "react";
import UserService from "../../services/UserService";
import logo from "./logo.jpg";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }
  render() {
    const currentUser = this.state.currentUser;
    return (
      <div>
        <div className="px-4 py-5 my-5 text-center">
          <img
            className="d-block mx-auto mb-4"
            src={logo}
            alt="Logo"
            width="100"
            height="100"
            style={{ borderRadius: "50%" }}
          />
          <h1 className="display-5 fw-bold">Welcome to ReactFit</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Quickly design and customize responsive mobile-first sites with
              Bootstrap, the world's most popular front-end open source toolkit,
              featuring Sass variables and mixins, responsive grid system,
              extensive prebuilt components, and powerful JavaScript plugins.
            </p>
            {!currentUser && (
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link
                  to={"/login"}
                  className="btn btn-primary btn-lg px-4 gap-3"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="btn btn-outline-secondary btn-lg px-4"
                  role="button"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
