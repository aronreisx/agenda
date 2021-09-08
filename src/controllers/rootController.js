const Contact = require('../models/contactModel');

exports.index = async (req, res) => {
  if(!req.session.user) return res.render('index', { contacts: {} });
  const contacts = await Contact.searchContacts(req.session.user.email);
  res.render('index', { contacts });
};
