const db = require("../models");
const Exercise = db.exercise;
exports.getExercises = (req, res) => {
  Exercise.find({ userId: req.params.id })
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
};
exports.addExercise = (req, res) => {
  const newExercise = new Exercise({
    description: req.body.description,
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date),
    userId: req.body.userId,
  });
  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Errorr: " + err));
};
exports.getExercise = (req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
};
exports.deleteExercise = (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};
exports.updateExercise = (req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
