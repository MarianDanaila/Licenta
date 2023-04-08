import React, { Component } from "react";
import UserService from "../../services/UserService";
import logo from "../../assets/logo.png";
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
      <div className="px-4 py-5 my-5 text-center">
        <img
          className="d-block mx-auto mb-4"
          src={logo}
          alt="Logo"
          width="150"
          height="150"
          style={{ borderRadius: "50%" }}
        />
        <h1 className="fw-bold">Welcome to ReactFit</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            We're committed to helping you achieve your health and wellness
            goals by providing you with the tools, resources, and support you
            need to make positive changes in your life. Whether you're looking
            to improve your diet, increase your physical activity, manage
            stress, or just live a healthier, happier life, we've got you
            covered.
          </p>
          {!currentUser && (
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link
                to={"/login"}
                className="btn btn-primary btn-lg px-4"
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
    );
  }
}
