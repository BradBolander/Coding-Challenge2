var express = require('express');
var router = express.Router();
router.get('/table', function(req, res, next) {
  res.render('table', {title: 'Table' });
});

module.exports = router;
