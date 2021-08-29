const mongoose = require('mongoose');
const validator = require('validator');

const loginSchema = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  token: { type: String, require: true },
  createdAt: {type: Date, default: Date.now}
});

const LoginModel = mongoose.model('Login', loginSchema);

class Login {
  constructor (body){
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register(){
    this.validate();
    if(this.errors.length > 0) return;

    try{
      this.user = await LoginModel.create(this.body);
    } catch(err) {
      console.log(err);
    }
  }

  validate(){
    this.cleanUp();

    //_ validation
    //_ email needs to be valid // OR push an error to Errors array
    if(!validator.isEmail(this.body.email)) this.errors.push('Email is not valid');

    //_password needs to have between 3 and 50 characters
    if(this.body.password.length < 3 || this.body.password.length > 50){
      //_ send message to user about password error
      this.errors.push('Password needs to have between 3 and 50 characters');
    }
  }

  cleanUp(){
    for(const key in this.body){
      if(typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}
