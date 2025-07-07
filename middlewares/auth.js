const { getUser } = require('../service/auth');
/**
 * Middleware to restrict access to logged-in users only.
 * If the user is not logged in, they will be redirected to the login page.
 */
async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.redirect('/login');
  const user = await getUser(userUid);
  if (!user) return res.redirect('/login');
  req.user = user;
  next();
}

async function checkAuthentication(req, res, next) {
  const userUid = req.cookies?.uid;
  console.log('User UID from cookie:', userUid);
  const user = await getUser(userUid);
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuthentication
};
