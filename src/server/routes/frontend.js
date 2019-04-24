const router = require('express').Router();
const path = require('path');

module.exports = function frontendRouter() {
  // frontend routes
  router.get('*', (req, res) => {
    res.sendFile(path.join(global.basedir, '..', '..', 'views', 'index.html'));
  });

  return router;
};