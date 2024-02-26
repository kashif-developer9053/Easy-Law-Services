// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('User is not authenticated. Redirecting...');
  res.redirect('/signin');
}
  