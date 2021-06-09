module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      name: String,
      lastName: String,
      reservationTime: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Appointment = mongoose.model("appointment", schema);
  return Appointment;
};