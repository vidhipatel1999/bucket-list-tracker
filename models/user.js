const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String,
  bucketListItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Experience"
  }],
});


module.exports = mongoose.model('User', userSchema);