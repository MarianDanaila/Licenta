import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";
class ExerciseService {
  getExercises(params) {
    return axios.get(API_URL + "exercises/" + userId, {
      headers: authHeader(),
    });
  }

  getExercise(exerciseId) {
    return axios.get(API_URL + "exercise/" + exerciseId, {
      headers: authHeader(),
    });
  }

  createExercise(exercise) {
    return axios.post(API_URL + "exercise/", exercise, {
      headers: authHeader(),
    });
  }

  updateExercise(exerciseId, exercise) {
    return axios.post(API_URL + "exercise/" + exerciseId, exercise, {
      headers: authHeader(),
    });
  }

  deleteExercise(exerciseId) {
    return axios.delete(API_URL + "exercise/" + exerciseId, {
      headers: authHeader(),
    });
  }
}
export default new ExerciseService();
