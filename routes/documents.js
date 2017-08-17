var express = require('express');
var router = express.Router();

var elastic = require('../elasticsearch');

/* GET suggestions */
router.get('/suggest/:input', function (req, res, next) {
	console.log(req, 'request')
  elastic.getSuggestions(req.params.input).then(function (result) { res.json(result) })
  .catch(e => console.log(e));
});

/* POST document to be indexed */
router.post('/', function (req, res, next) {
  elastic.addDocument(req.body).then(function (result) { res.json(result) });
});

module.exports = router;