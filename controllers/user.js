const {v4: uuidv4} = require('uuid');
const User = require('../models/user');
const {setUser} = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

//   if (!name || !password || !email) {
//     return res
//       .status(400)
//       .json({ error: 'Name, password and email are required' });
//   }
console.log('Creating user with name:', name, 'email:', email, 'password', password);
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
  console.log('User login attempt ', user);
  if (!user) {
    return res.render('login', {
      error: 'Invalid email or password',
    });
  }

  const token = setUser(user);
  res.cookie('uid', token);
  return res.redirect('/');
}

module.exports = {
  handleUserSignup,
  handleUserLogin
};
