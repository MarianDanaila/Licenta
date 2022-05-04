import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/";
class MapService {
  getPins() {
    return axios.get(API_URL + "pins", {
      headers: AuthHeader(),
    });
  }

  addPin(pin) {
    return axios.post(API_URL + "pin", pin, {
      headers: AuthHeader(),
    });
  }
}
export default new MapService();
