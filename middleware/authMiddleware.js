function isLoggedIn(req, res, next) {
  if (req.user) {
    return next();
  } else {
    return res.status(401).json({ message: 'Não autorizado. Faça login com o Google.' });
  }
}

function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.status(401).json({ message: 'Não autorizado. Faça login para acessar.' });
  }
}

module.exports = { isLoggedIn, isAuthenticated };
