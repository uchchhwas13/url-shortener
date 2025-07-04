const User = require('../models/user');

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !password || !email) {
    return res
      .status(400)
      .json({ error: 'Nme, password and email are required' });
  }

  await User.create({
    name: name,
    email: email,
    password: password,
  });
  return res.redirect('/');
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render('login', {
      error: 'Invalid email or password',
    });
  }
  return res.redirect('/');
}

module.exports = {
  handleUserSignup,
  handleUserLogin
};
