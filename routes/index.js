var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/table', function(req, res, next) {
  res.render('table', {title: 'Table' });
});

router.get('/statistics', function(req, res, next) {
  res.render('statistics', {title: 'Statistics' });
});

module.exports = router;
