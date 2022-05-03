const passport = require('passport');
const { config } = require('../config/config.js');
const { model } = require('../model/model.js');
const { utils } = require('../utils/utils.js');

// GET "/register"
exports.getRegister = function (req, res) {
  if (req.isAuthenticated())
    res.redirect(`/user/${utils.emailToUsername(req.user.username)}/home`);
  else res.render('register', { pwMinLen: config.PASSWORD_MIN_LEN });
};

// POST "/register"
exports.postRegister = function (req, res) {
  const [email, password, phone] = [
    req.body.username,
    req.body.password,
    req.body.phone,
  ];

  model.User.register({ username: email }, password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect('/register');
    } else {
      utils.initUserContent(email, phone);

      passport.authenticate('local')(req, res, () => {
        // utils.sendEmail(email, config.welcomeSubject, config.welcomeContent);
        res.redirect(`/user/${utils.emailToUsername(req.user.username)}/home`);
      });
    }
  });
};
