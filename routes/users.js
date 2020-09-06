const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{ id: 1, name: 'Phu' }]);
});

module.exports = router;
