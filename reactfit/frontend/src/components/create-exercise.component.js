import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthService from "../services/auth.service";
import exerciseService from "../services/exercise.service";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      description: "",
      duration: 0,
      date: new Date(),
      content: "",
    };
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
      userId: this.state.currentUser.id,
    };

    exerciseService.createExercise(exercise);

    window.location = "/exercises";
  }

  render() {
    return (
      <div>
        {this.state.currentUser ? (
          <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Description: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label>Duration (in minutes): </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
                />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Create Exercise Log"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        ) : (
          "No token provided"
        )}
      </div>
    );
  }
}
