const { authJwt } = require("../middlewares");
const controller = require("../controllers/exercise");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/exercises/:id", [authJwt.verifyToken], controller.getExercises);
  app.post("/api/exercise", [authJwt.verifyToken], controller.addExercise);
  app.get("/api/exercise/:id", [authJwt.verifyToken], controller.getExercise);
  app.delete(
    "/api/exercise/:id",
    [authJwt.verifyToken],
    controller.deleteExercise
  );
  app.post(
    "/api/exercise/:id",
    [authJwt.verifyToken],
    controller.updateExercise
  );
};
