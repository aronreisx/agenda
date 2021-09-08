exports.loginRequired = (req, res, next) => {
  if(!req.session.user){
    req.flash('errors', 'You need to log-in')
    req.session.save(() => res.redirect('/'));
    return;
  }
  next();
}
