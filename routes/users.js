const express = require('express');
const router = express.Router();
const db = require('../db');
/* GET users listing. */
router.get('/', function (req, res, next) {
  const result = [];
  db.connection.query("SELECT * FROM `users`").on('result', (row) => {
    result.push(row);
  }).on('error', () => {
    console.log('ERROR', error);
  }).on('end', () => {
    res.json({ data: result });
  })
});

module.exports = router;
