const Experience = require('../models/experience');

module.exports = {
  create,
};

async function create(req, res) {
  const experience = await Experience.findById(req.params.id);

  experience.notes.push(req.body);
  try {
    // Save any changes made to the movie doc
    await experience.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/experiences/${experience._id}`);
}