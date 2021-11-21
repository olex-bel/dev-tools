var express = require('express');
var router = express.Router();

router.get('/jsonlint', function (req, res, next) {
  res.render('jsonlint', { title: 'JSON Lint', content: 'JSON Lint is a validator and formatter for JSON' });
});

module.exports = router;
