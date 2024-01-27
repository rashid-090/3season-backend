const mongoose = require("mongoose");

// Parent Schema
module.exports = (mongoose, collectionName) => {
  const schema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      createdBy: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        required: true,
      },
      jobType: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      salaryOffer: {
        type: String,
        required: true,
      },
      closeDate: {
        type: String,
        required: true,
      },
      experience: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      qualification: {
        type: Array,
        required: true,
      },
      catogories: {
        type: Array,
        required: true,
        default:[]
      },
    },
    {
      timestamps: true,
    }
  );
schema.index({ title: 1 }, { unique: false });
schema.index({ jobType: 1 }, { unique: false });
schema.index({ qualification: 1 }, { unique: false });
schema.index({ experience: 1 }, { unique: false });


  return mongoose.model("Product", schema, collectionName);
};
