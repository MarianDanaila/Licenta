import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/";
class MealService {
  getMeals(userId) {
    return axios.get(API_URL + "meals/" + userId, {
      headers: AuthHeader(),
    });
  }

  getMeal(mealId) {
    return axios.get(API_URL + "meal/" + mealId, {
      headers: AuthHeader(),
    });
  }

  createMeal(meal) {
    return axios.post(API_URL + "meal/", meal, {
      headers: AuthHeader(),
    });
  }

  updateMeal(mealId, meal) {
    return axios.post(API_URL + "meal/" + mealId, meal, {
      headers: AuthHeader(),
    });
  }

  deleteMeal(mealId) {
    return axios.delete(API_URL + "meal/" + mealId, {
      headers: AuthHeader(),
    });
  }
}
export default new MealService();
