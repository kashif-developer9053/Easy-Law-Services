const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  userId: String,
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: String,
  location: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
