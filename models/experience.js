const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    content: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const experienceSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  created: {
    type: Date,
    default: Date.now,
    get: function(val) {
        if (!val) {
            return null;
        }
        return val.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    }  
  },
  deadline: {
      type: Date,
      default: function(){
          return new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      },
      get: function(val) {
          if (!val) {
              return null;
          }
          return val.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
      }
  },
  location: {
    type: String 
},
notes: [noteSchema]
}, {timestamps: true
});


module.exports = mongoose.model('Experience', experienceSchema);