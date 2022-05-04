import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/";
class ExerciseService {
  getExercises(userId) {
    return axios.get(API_URL + "exercises/" + userId, {
      headers: AuthHeader(),
    });
  }

  getExercise(exerciseId) {
    return axios.get(API_URL + "exercise/" + exerciseId, {
      headers: AuthHeader(),
    });
  }

  createExercise(exercise) {
    return axios.post(API_URL + "exercise/", exercise, {
      headers: AuthHeader(),
    });
  }

  updateExercise(exerciseId, exercise) {
    return axios.post(API_URL + "exercise/" + exerciseId, exercise, {
      headers: AuthHeader(),
    });
  }

  deleteExercise(exerciseId) {
    return axios.delete(API_URL + "exercise/" + exerciseId, {
      headers: AuthHeader(),
    });
  }
}
export default new ExerciseService();
