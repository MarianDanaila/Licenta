const { authJwt } = require("../middlewares");
const controller = require("../controllers/music");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/lyrics", [authJwt.verifyToken], controller.getLyrics);
  app.post(
    "/api/spotify-login",
    [authJwt.verifyToken],
    controller.spotifyLogin
  );

  app.post(
    "/api/spotify-token-refresh",
    [authJwt.verifyToken],
    controller.spotifyTokenRefresh
  );
};
