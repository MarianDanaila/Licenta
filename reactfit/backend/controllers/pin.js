const db = require("../models");
const Pin = db.pin;
exports.getPins = (req, res) => {
  Pin.find()
    .then((pins) => res.status(200).json(pins))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.addPin = (req, res) => {
  const newPin = new Pin(req.body);
  newPin
    .save()
    .then(() => res.status(200).json(newPin))
    .catch((err) => res.status(400).json("Errorr: " + err));
};
