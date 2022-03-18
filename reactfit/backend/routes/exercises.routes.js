const controller = require("../controllers/exercise.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/exercises", controller.getExercises);
  app.post("/api/exercises/add", controller.addExercise);
  app.get("/api/exercises/:id", controller.getExercise);
  app.delete("/api/exercises/delete/:id", controller.deleteExercise);
  app.post("/api/exercise/update/:id", controller.updateExercise);
};
