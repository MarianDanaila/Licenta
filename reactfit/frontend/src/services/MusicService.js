import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/";
class MusicService {
  getLyrics(params) {
    return axios.get(API_URL + "lyrics", {
      params: params,
      headers: AuthHeader(),
    });
  }
  spotifyLogin(code) {
    return axios.post(
      API_URL + "spotify-login",
      { code },
      {
        headers: AuthHeader(),
      }
    );
  }

  spotifyTokenRefresh(refreshToken) {
    return axios.post(
      API_URL + "spotify-token-refresh",
      { refreshToken },
      {
        headers: AuthHeader(),
      }
    );
  }
}
export default new MusicService();
