const { authJwt } = require("../middlewares");
const controller = require("../controllers/pin.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/pins", [authJwt.verifyToken], controller.getPins);
  app.post("/api/pin", [authJwt.verifyToken], controller.addPin);
};
