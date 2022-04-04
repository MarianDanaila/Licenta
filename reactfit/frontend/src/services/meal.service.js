import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";
class ExerciseService {
  getMeals(userId) {
    return axios.get(API_URL + "meals/" + userId, {
      headers: authHeader(),
    });
  }

  getMeal(mealId) {
    return axios.get(API_URL + "meal/" + mealId, {
      headers: authHeader(),
    });
  }

  createMeal(meal) {
    return axios.post(API_URL + "meal/", meal, {
      headers: authHeader(),
    });
  }

  updateMeal(mealId, meal) {
    return axios.post(API_URL + "meal/" + mealId, meal, {
      headers: authHeader(),
    });
  }

  deleteMeal(mealId) {
    return axios.delete(API_URL + "meal/" + mealId, {
      headers: authHeader(),
    });
  }
}
export default new ExerciseService();
