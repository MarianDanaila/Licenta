import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";
class MusicService {
  getLyrics(params) {
    return axios.get(API_URL + "lyrics", {
      params: params,
      headers: authHeader(),
    });
  }
  spotifyLogin(code) {
    return axios.post(
      API_URL + "spotify-login",
      { code },
      {
        headers: authHeader(),
      }
    );
  }

  spotifyTokenRefresh(refreshToken) {
    return axios.post(
      API_URL + "spotify-token-refresh",
      { refreshToken },
      {
        headers: authHeader(),
      }
    );
  }
}
export default new MusicService();
