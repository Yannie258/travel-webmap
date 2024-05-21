const mongoose = require('mongoose')

const PinSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longtitude: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Pin', PinSchema)
