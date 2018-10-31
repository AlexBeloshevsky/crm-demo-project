const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  firstContact: Date,
  emailType: String,
  sold: Boolean,
  owner: String,
  country: String
})

let Client = mongoose.model('client', clientSchema);

module.exports = {
  Client: Client
}