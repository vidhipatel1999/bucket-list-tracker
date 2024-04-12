const express = require('express');
const router = express.Router();

const experiencesCtrl = require('../controllers/experiences');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const Experience = require('../models/experience');


router.use('/', (req, res, next) => {
    // console.log('experiences.js router.use req.user', req);
    next();
});


// GET /experiences
router.get('/', ensureLoggedIn, experiencesCtrl.index);
// GET /experiences/new
router.get('/new', ensureLoggedIn, experiencesCtrl.new);
// POST /experiences
router.post('/', ensureLoggedIn, experiencesCtrl.create);

// GET /experiences/:id (show functionality) MUST be below new route
router.get('/:id', ensureLoggedIn, experiencesCtrl.show);

router.delete('/:id', ensureLoggedIn, experiencesCtrl.delete);
router.put('/:id', ensureLoggedIn, experiencesCtrl.update);
router.get('/:id/update', ensureLoggedIn, experiencesCtrl.updatePage);
module.exports = router;