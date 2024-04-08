const Experience = require('../models/experience')

module.exports = {
    new: newExperience
};

function newExperience(req, res){
    res.render('experiences/new', { 
        title: 'Create New Bucket List Item'
    });
}