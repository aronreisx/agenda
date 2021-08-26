exports.checkCsrfError = (err, req, res, next)=>{
  if(err.code == 'EBADCSRFTOKEN'){
    console.log(err.code);
    return res.render('403');
  }
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
