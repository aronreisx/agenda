const Contact = require("../models/contactModel");

exports.index = (req, res) => {
  res.render('contact', {
    contact: {}
  });
};

exports.register = async (req, res) => {
  try{
    const contact = new Contact(req.body, req.session.user);
    await contact.register();

    if(contact.errors.length > 0){
      req.flash('errors', contact.errors);
      req.session.save(() => req.redirect(`/contact/index`));
      return;
    }

    req.flash('success', 'Contact added successfully');
    req.session.save(() => res.redirect(`/contact/index/${contact._id}`));
    return;
  }catch(err){
    console.log(err);
    return res.render('500');
  }
};

exports.editIndex = async (req, res) => {
  if(!req.params.id) return res.render('404');

  const user = await Contact.searchById(req.params.id);

  if(!user) return res.render('404');

  res.render('contact', {
    contact: user
  });
};

exports.edit = async (req, res) => {
  try{
    if(!req.params.id) return res.render('404');
    const contact = new Contact(req.body);
    await contact.edit(req.params.id);

    if(contact.errors.length > 0) {
      req.flash('errors', `Fail to update contact: ${contact.errors}`);

      req.session.save(() => res.redirect('/'));
      return;
    }

    req.flash('success', 'Contact edited successfully');
    req.session.save(() => res.redirect(`/`));
    return;
  } catch(err){
    console.log(err);
    res.render('404');
  }
}

exports.delete = async (req, res) => {
  if(!req.params.id) return res.render('404');

  const user = await Contact.delete(req.params.id);

  if(!user) return res.render('404');

  req.flash('success', 'Contact deleted successfully');
  req.session.save(() => res.redirect('/'));
  return;
}
