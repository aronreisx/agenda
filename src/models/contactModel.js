const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
  name: {type: String, require: true},
  surname: {type: String, require: false, default: ''},
  email: {type: String, require: false, default: ''},
  phone: {type: String, require: false, default: ''},
  creation: {type: Date, default: Date.now},
  owner: {type: String}
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body, currentUser){
  this.body = body;
  this.currentUser = currentUser;
  this.errors = [];
  this.contact = null;
};

Contact.prototype.register = async function(){
  this.validate();
  if(this.errors.length > 0) return;

  const contactData = {...this.body, owner: this.currentUser.email}
  this.contact = await ContactModel.create(contactData);
};

Contact.prototype.validate = function(){
  this.cleanUp();

  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid email.');
  if(!this.body.name) this.errors.push('Field Name is mandatory.');
  if(!this.body.email && !this.body.phone){
    this.errors.push('At list one contact needs to be registered, put email or phone number.')
  };
};

Contact.prototype.cleanUp = function(){
  for(const key in this.body){
    if(typeof this.body[key] !== 'string'){
      this.body[key] ='';
    };
  };

  this.body = {
    name: this.body.name,
    surname: this.body.surname,
    email: this.body.email,
    phone: this.body.phone
  };
};

Contact.prototype.edit = async function(id){
  if(typeof id !== 'string') return;
  this.validate();
  if(this.errors.length > 0) return;
  this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {new: true});
};

//* Static Mmethods

Contact.searchById = async function(id){
  if(typeof id !== 'string') return;
  const user = await ContactModel.findById(id);
  return user;
};

Contact.searchContacts = async function(userEmail){
  const contacts = await ContactModel
    .find({owner: userEmail})
    .sort({creation: -1});
  return contacts;
};

Contact.delete = async function(id){
  if(typeof id !== 'string') return;
  const contact = await ContactModel.findOneAndDelete({_id: id});
  return contact;
}

module.exports = Contact;
