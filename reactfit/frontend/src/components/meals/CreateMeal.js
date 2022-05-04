import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthService from "../../services/AuthService";
import MealService from "../../services/MealService";

export default class CreateMeal extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      description: "",
      calories: 0,
      date: new Date(),
    };
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeCalories(e) {
    this.setState({
      calories: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const meal = {
      description: this.state.description,
      calories: this.state.calories,
      date: this.state.date,
      userId: this.state.currentUser.id,
    };

    MealService.createMeal(meal)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/meals";
  }

  render() {
    return (
      <div className="container">
        <div className="card border-0 shadow my-4">
          <div className="card-body p-3"></div>
          <div>
            <h3 style={{ textAlign: "center" }}>Add New Meal </h3>
            <form onSubmit={this.onSubmit}>
              <div
                className="form-group"
                style={{
                  marginLeft: "20px",
                  marginBottom: "15px",
                  marginRight: "20px",
                }}
              >
                <label>Meal Description: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div
                className="form-group"
                style={{
                  marginLeft: "20px",
                  marginBottom: "15px",
                  marginRight: "20px",
                }}
              >
                <label>Calories: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.calories}
                  onChange={this.onChangeCalories}
                />
              </div>
              <div
                className="form-group"
                style={{
                  marginLeft: "20px",
                  marginBottom: "15px",
                  marginRight: "20px",
                }}
              >
                <label>Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>

              <div className="form-group" style={{ textAlign: "center" }}>
                <input
                  type="submit"
                  value="Add Meal"
                  className="btn"
                  style={{
                    backgroundColor: "rgb(160 73 73 / 68%)",
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
