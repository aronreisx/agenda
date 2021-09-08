const Login = require('../models/loginModel');

exports.index = (req, res) => {
  if(req.session.user) return res.render('logged');
  res.render('login');
};

exports.register = async (req, res) => {
  try {
    //* Instancing class Login to login w/ object req.body
    const login = new Login(req.body);
    await login.register();

    if(login.errors.length > 0){
      //* Throwing errors using flash middleware
      req.flash('errors', login.errors);
      //* Save session and redirecting to login/index
      req.session.save(function() {
        return res.redirect('/login/index');
      });
      //! Needs to use return again to not respond anything
      return;
    }

    //* CASE REGISTER SUCCESSFUL: PUSH MESSAGES TO FLASH
    req.flash('success', 'Your account was created successfully');
    //* THEN SAVE SESSION AND REDIRECT TO MAIN PAGE
    req.session.save(function(){
      return res.redirect('/login/index');
    });

  } catch (err) {
    console.log(err);
    return res.render('500', { message: err });
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if(login.errors.length > 0){
      req.flash('errors', login.errors);
      req.session.save(function(){
          return res.redirect('/login/index');
      });
      return;
    };

    req.flash('success', 'You are logged in.');
    req.session.user = login.user;
    req.session.save(function(){
      return res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    return res.render('500', { message: err });
  };
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
