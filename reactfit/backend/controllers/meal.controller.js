const db = require("../models");
const Meal = db.meal;
exports.getMeals = (req, res) => {
  Meal.find({ userId: req.params.id })
    .then((meals) => res.json(meals))
    .catch((err) => res.status(400).json("Error: " + err));
};
exports.addMeal = (req, res) => {
  const newMeal = new Meal({
    description: req.body.description,
    calories: Number(req.body.calories),
    date: Date.parse(req.body.date),
    userId: req.body.userId,
  });
  newMeal
    .save()
    .then(() => res.json("Meal added!"))
    .catch((err) => res.status(400).json("Errorr: " + err));
};
exports.getMeal = (req, res) => {
  Meal.findById(req.params.id)
    .then((meal) => res.json(meal))
    .catch((err) => res.status(400).json("Error: " + err));
};
exports.deleteMeal = (req, res) => {
  Meal.findByIdAndDelete(req.params.id)
    .then(() => res.json("Meal deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};
exports.updateMeal = (req, res) => {
  Meal.findById(req.params.id)
    .then((meal) => {
      meal.description = req.body.description;
      meal.calories = Number(req.body.calories);
      meal.date = Date.parse(req.body.date);

      meal
        .save()
        .then(() => res.json("Meal updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
