import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthService from "../services/auth.service";
import ExerciseService from "../services/exercise.service";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: "",
      duration: 0,
      date: new Date(),
      currentUser: AuthService.getCurrentUser(),
      content: "",
    };
  }

  componentDidMount() {
    ExerciseService.getExercise(this.props.match.params.id)
      .then((response) => {
        this.setState({
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch((error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      });
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

    ExerciseService.updateExercise(this.props.match.params.id, exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/exercises";
  }

  render() {
    return (
      <div>
        {this.state.content === "" ? (
          <div>
            <h3>Edit Exercise Log</h3>
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
                  value="Edit Exercise Log"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        ) : (
          this.state.content
        )}
      </div>
    );
  }
}
