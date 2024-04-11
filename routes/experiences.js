const express = require('express');
const router = express.Router();
// Assuming you've renamed your controller module to reflect the focus on experiences
const experiencesCtrl = require('../controllers/experiences');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /experiences
router.get('/', experiencesCtrl.index);
// GET /experiences/new
router.get('/new', ensureLoggedIn, experiencesCtrl.new);
// GET /experiences/:id (show functionality) MUST be below new route
router.get('/:id', experiencesCtrl.show);
// POST /experiences
router.post('/', ensureLoggedIn, experiencesCtrl.create);

module.exports = router;