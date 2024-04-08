const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  title: {
      type: String,
      required: true
  },
  location: {
      type: String 
  },
  created: {
      type: Date,
      default: function(){
          return new Date("2021-11-21")
      },
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
});