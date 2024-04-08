const express = require('express');
const router = express.Router();
const experiencesCtrl = require('../controllers/experiences');



/* GET users listing. */

router.get('/new', experiencesCtrl.new);

module.exports = router;
