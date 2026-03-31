const mongoose = require('mongoose');

const messageContentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'file'],
    required: [true, 'Message type is required']
  },
  text: {
    type: String,
    required: [true, 'Message content is required']
  }
});

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Sender is required']
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Receiver is required']
  },
  messageContent: {
    type: messageContentSchema,
    required: [true, 'Message content is required']
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
messageSchema.index({ from: 1, to: 1, createdAt: -1 });
messageSchema.index({ to: 1, from: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
