const Experience = require('../models/experience');

module.exports = {
    index,
    new: newExperience,
    create,
    show
};


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
    // Convert nowShowing's checkbox of nothing or "on" to boolean
    // Check if this or any similar property needs modification to suit experiences better
    req.body.nowShowing = !!req.body.nowShowing;

    // Remove empty properties so that defaults will be applied
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }

    try {
        // Use the Experience model to create a new document in the database
        const experience = await Experience.create(req.body);

        // Redirect to the new experience's detail page
        // Ensure your routing reflects this change from movies to experiences
        res.redirect(`/experiences/${experience._id}`);
    } catch (err) {
        // Handle any errors, such as validation errors, that may occur during creation
        console.log(err);
        // Make sure to update the path to the template if it's different for experiences
        res.render('experiences/new', { errorMsg: err.message });
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

