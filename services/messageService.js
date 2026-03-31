const Message = require('../models/Message');
const mongoose = require('mongoose');

const messageService = {
  // Get all messages between current user and target user
  async getMessagesByUser(currentUserId, targetUserId) {
    const messages = await Message
      .find({
        $or: [
          { from: currentUserId, to: targetUserId },
          { from: targetUserId, to: currentUserId }
        ]
      })
      .populate('from', 'username fullName avatarUrl')
      .populate('to', 'username fullName avatarUrl')
      .sort({ createdAt: 1 });

    return messages;
  },

  // Send new message
  async sendMessage(from, to, messageContent) {
    const message = new Message({
      from,
      to,
      messageContent
    });

    await message.save();
    await message.populate('from', 'username fullName avatarUrl');
    await message.populate('to', 'username fullName avatarUrl');
    return message;
  },

  // Get last message of each conversation for current user
  async getConversations(currentUserId) {
    const conversations = await Message.aggregate([
      // Match messages involving current user
      {
        $match: {
          $or: [
            { from: currentUserId },
            { to: currentUserId }
          ]
        }
      },
      // Sort by newest first
      { $sort: { createdAt: -1 } },
      // Group by conversation partner
      {
        $group: {
          _id: {
            partnerId: {
              $cond: {
                if: { $eq: ['$from', currentUserId] },
                then: '$to',
                else: '$from'
              }
            }
          },
          lastMessage: { $first: '$$ROOT' }
        }
      },
      // Sort conversations by last message time
      { $sort: { 'lastMessage.createdAt': -1 } },
      // Lookup partner info
      {
        $lookup: {
          from: 'users',
          localField: '_id.partnerId',
          foreignField: '_id',
          as: 'partner',
          pipeline: [
            { $project: { username: 1, fullName: 1, avatarUrl: 1 } }
          ]
        }
      },
      {
        $unwind: '$partner'
      },
      {
        $project: {
          partner: '$partner',
          lastMessage: {
            _id: '$lastMessage._id',
            from: '$lastMessage.from',
            to: '$lastMessage.to',
            messageContent: '$lastMessage.messageContent',
            createdAt: '$lastMessage.createdAt'
          }
        }
      }
    ]);

    return conversations;
  }
};

module.exports = messageService;
