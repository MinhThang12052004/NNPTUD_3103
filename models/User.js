const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  fullName: {
    type: String,
    default: ''
  },
  avatarUrl: {
    type: String,
    default: 'https://i.sstatic.net/l60Hf.png'
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
