const Experience = require('../models/experience')

module.exports = {
    new: newExperience,
    create,
    index
};

function newExperience(req, res){
    res.render('experiences/new', { 
        title: 'Create New Bucket List Item'
    });
}

async function create(req, res){
    try {
        const experience = await Experience.create(req.body);
        req.user.experiences.push(experience._id);
        await req.user.save();
        res.redirect('/experiences');
    } catch(error){
        console.log(error)
        res.render('error', {title: 'Something went wrong'})
    }
}

async function index (req, res){
    try{
        const user = await User.findById(req.user._id).populate('experiences');
        res.render('experiences/index', {
            experiences: user.experiences,
            title: 'All Experiences'
        });
    } catch (error) {
        console.log(error);
        res.render('error', {title: 'Something Went Wrong'});
    }
}