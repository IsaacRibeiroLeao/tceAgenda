// middleware/auth.js

function isAuthenticated(req, res, next) {
    // Check if user is logged in via session
    if (req.session && req.session.userId) {
      return next();
    }
    return res.redirect('/login');
  }
  
  function isAdmin(req, res, next) {
    // Check user role
    if (req.session && req.session.userId && req.session.userRole === 'admin') {
      return next();
    }
    return res.status(403).send('Acesso negado: somente administradores.');
  }
  
  module.exports = {
    isAuthenticated,
    isAdmin,
  };
  