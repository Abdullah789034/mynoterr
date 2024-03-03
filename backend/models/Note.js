const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotesSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'user'

  },
  userSayer:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true,
  },
  tag:{
    type: String,
    default: "General"
  },
  date:{
    type: String,
    default: Date.now
  },
  likes:{
    type: Number
  }

});

const Note =mongoose.model('notes', NotesSchema)
module.exports= Note;