const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const loginSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const LoginModel = mongoose.model('Login', loginSchema);

class Login {
  constructor (body){
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login(){
    this.validate();
    if(this.errors.length > 0) return;

    this.user = await LoginModel.findOne({email:this.body.email});

    if(!this.user) {
        this.errors.push('Invalid user or password');
        return
    }

    if(!bcryptjs.compareSync(this.body.password, this.user.password)){
        this.errors.push('Invalid user or password');
        this.user = null;
        return
    }
  }

  async register(){
    this.validate();
    if(this.errors.length > 0) return;

    await this.userExists();
    if(this.errors.length > 0) return;

    //* USING PASSOWRD HASHING AFTER VALIDATION AND CLEANING UP
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await LoginModel.create(this.body);
  }

  async userExists(){
    const user = await LoginModel.findOne({email:this.body.email})
    if(user) this.errors.push('The user already exists.')
  }

  validate(){
    this.cleanUp();

    //_ validation
    //_ email needs to be valid // OR push an error to Errors array
    if(!validator.isEmail(this.body.email)) this.errors.push('The email you provided is not valid.');

    //_password needs to have between 3 and 50 characters
    if(this.body.password.length < 3 || this.body.password.length > 50){
      //_ send message to user about password error
      this.errors.push('The  password needs to have between 3 and 50 character.');
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
      password: this.body.password,
    }
  }
}

module.exports = Login;
