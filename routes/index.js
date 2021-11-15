var express = require('express');
var router = express.Router();

router.get('/jsonlint', function (req, res, next) {
  res.render('jsonlint', { title: 'JSON Lint' });
});

module.exports = router;
