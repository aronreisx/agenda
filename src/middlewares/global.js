export default checkCsrfError = (err, req, res, next) => {
  if(err && err.code === 'EBADCSRFTOKEN') {
    return res.status(403).render('403');
  }
}

export default csrfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
