const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {type: String, require: true},
  surname: {type: String, require: false, default: ''},
  email: {type: String, require: false, default: ''},
  phone: {type: String, require: false, default: ''},
  createdAt: {type: Date, default: Date.now}
});

const ContactModel = mongoose.model('Contact', ContactSchema);
