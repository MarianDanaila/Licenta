const { authJwt } = require("../middlewares");
const controller = require("../controllers/meal.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/meals/:id", [authJwt.verifyToken], controller.getMeals);
  app.post("/api/meal", [authJwt.verifyToken], controller.addMeal);
  app.get("/api/meal/:id", [authJwt.verifyToken], controller.getMeal);
  app.delete("/api/meal/:id", [authJwt.verifyToken], controller.deleteMeal);
  app.post("/api/meal/:id", [authJwt.verifyToken], controller.updateMeal);
};
