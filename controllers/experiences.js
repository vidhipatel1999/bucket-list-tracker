const Experience = require('../models/experience');


async function index(req, res) {
    try {
        const experiences = await Experience.find({});
        res.render('experiences/index', { title: 'All Experiences', experiences });
    } catch (error) {
        console.log(error);
        res.render('error', { message: "Failed to fetch experiences.", error });
    }
}

function newExperience(req, res) {
    res.render('experiences/new', { title: 'Add Experience', errorMsg: '' });
}

async function create(req, res) {
    try {
        await Experience.create(req.body);
        res.redirect('/experiences');
    } catch (error) {
        console.log(error);
        res.render('error', { message: "Add experience failed.", error });
    }
}

async function show(req, res) {
    try {
      const experience = await Experience.findById(req.params.id);
      
      res.render('experiences/show', { title: "Experience details", experience });
  
    } catch (error) {
      console.log(error);
      res.render('error', { message: "Showing experience details failed.", error });
    }
}

module.exports = {
    index,
    new: newExperience,
    create,
    show
};