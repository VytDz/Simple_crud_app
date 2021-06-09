const db = require("../models");
const Appointment = db.appointment;

exports.create = (req, res) => {
  if (!req.body.name && !req.body.lastName && !req.body.timeStamp) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const appointment = new Appointment({
    name: req.body.name,
    lastName: req.body.lastName,
    reservationTime: req.body.timeStamp
  });

  appointment
    .save(appointment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the appointment."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Appointment.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointments."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Appointment.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found appointment with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving appointment with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Appointment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update appointment with id=${id}.`
        });
      } else res.send({ message: "appointment was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating appointment with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Appointment.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete appointment with id=${id}.`
        });
      } else {
        res.send({
          message: "Appointment was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete appointment with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Appointment.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} appointments were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all appointments."
      });
    });
};
