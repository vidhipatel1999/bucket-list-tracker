const Experience = require('../models/experience');

module.exports = {
    index,
    new: newExperience,
    create,
    show,
    delete: deleteExperience,
    update: updateExperience,
    updatePage
};

//------INDEX: Display all experiences
async function index(req, res) {
    try {
        // fetch all experiences that match the user.id found on the author property of the experience
        const experiences = await Experience.find({ author: req.user.id });
        res.render('experiences/index', { title: 'All Experiences', experiences });
    } catch (error) {
        console.log(error);
        res.render('error', { message: "Failed to fetch experiences.", error });
    }
}

//------NEW: Send form to add new experience
async function newExperience(req, res) {
    console.log("Sending new experience form");
    console.log(req.user.id);
    res.render('experiences/new', { title: 'Add Experience', userID: req.user.id, errorMsg: '' });
}

//------CREATE/POST: Add new experience to database
async function create(req, res) {
    console.log("Posting new bucketlist item");
    console.log("From inside create function", req.body);
    req.body.nowShowing = !!req.body.nowShowing;
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }

    try {
        // Use the Experience model to create a new document in the database
        const newExperience = await Experience.create(req.body);
        console.log(newExperience);
        res.redirect(`/experiences/${newExperience._id}`);
    } catch (err) {
        console.log(err);
        res.render('experiences/new', { errorMsg: err.message });
    }
}


//------SHOW: Display details for one experience
async function show(req, res) {
    try {
        const experience = await Experience.findById(req.params.id);

        console.log('Checking if user.id matches experience.author')
        console.log('Test', req.user.id, experience.author)
        console.log(experience)
        if (req.user.id === experience.author.toString()) {
            console.log("Authorized to access Bucket List")
        } else {
            console.log("Not authorized")
            return res.redirect('/')
        }

        res.render('experiences/show', { title: "Experience details", experience });

    } catch (error) {
        console.log(error);
        res.render('error', { message: "Showing experience details failed.", error });
    }
}

//------DELETE: Remove one experience from the database
async function deleteExperience(req, res) {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        console.log(experience)
        if (req.user.id === experience.author.toString()) {
            console.log("Authorized to access Bucket List")
        } else {
            console.log("Not authorized")
            return res.redirect('/')
        }
        console.log("deleted an", experience);
        res.redirect('/experiences')
    } catch (error) {
        console.log(error)
        res.render('error', { title: 'Something went wrong' })
    }
}

//------UPDATE: Update one experience in the database
async function updateExperience(req, res) {
    try {
        const experience = await Experience.findById(req.params.id);
        if (req.user.id !== experience.author.toString()) {
            console.log("Not authorized");
            return res.redirect('/');  // Redirect to home or another appropriate page
        }

        // If authorized, update the experience with new data
        const experienceUpdate = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });

        console.log("Authorized to access Bucket List");
        // Redirect to the bucket list view
        res.redirect('/experiences');
    } catch (error) {
        console.error("Update error:", error);
        res.redirect(`/experiences/${req.params.id}/update?error=Unable to update experience`);
    }
}

//------UPDATE PAGE: Display form to update one experience
async function updatePage(req, res) {
    try {
        const experience = await Experience.findById(req.params.id);

        console.log('Checking if user.id matches experience.author')
        console.log('Test', req.user.id, experience.author)
        console.log(experience)
        console.log('Test', req.user.id, experience.author)
        if (req.user.id === experience.author.toString()) {
            console.log("Authorized to access Bucket List")
        } else {
            console.log("Not authorized")
            return res.redirect('/')
        }


        res.render('experiences/update', { title: 'Update Experience', experience });
    } catch (error) {
        console.log(error)
        res.render('error', { title: 'Something went wrong' })
    }

}
