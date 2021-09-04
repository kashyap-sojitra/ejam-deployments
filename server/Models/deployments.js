const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deploymentSchemas = new Schema({
  templateName: { type: String, required: true},
  url: { type: String},
  version: [{ type: String, required: true}],
  date: { type: String}
}, { timestamps: true});

module.exports = mongoose.model('Deployment', deploymentSchemas, 'deployment');