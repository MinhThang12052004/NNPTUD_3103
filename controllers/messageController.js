const messageService = require('../services/messageService');

const messageController = {
  // GET /api/messages/:userID - Messages between current user and specific user
  async getMessagesByUser(req, res, next) {
    try {
      const { userID } = req.params;
      const currentUserId = req.user.id;

      const messages = await messageService.getMessagesByUser(currentUserId, userID);
      
      res.status(200).json({
        success: true,
        data: messages
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/messages - Send new message
  async sendMessage(req, res, next) {
    try {
      const { to, text, file } = req.body;
      const from = req.user.id;

      // Validate input
      if (!to) {
        return res.status(400).json({
          success: false,
          message: 'to userID là bắt buộc'
        });
      }

      if (!text && !file) {
        return res.status(400).json({
          success: false,
          message: 'Phải gửi text hoặc file'
        });
      }

      // Determine message type and content
      let messageContent;
      if (file) {
        messageContent = {
          type: 'file',
          text: file // file path
        };
      } else {
        messageContent = {
          type: 'text',
          text
        };
      }

      const message = await messageService.sendMessage(from, to, messageContent);

      res.status(201).json({
        success: true,
        data: message
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/messages - Get conversations (last message per conversation)
  async getConversations(req, res, next) {
    try {
      const currentUserId = req.user.id;

      const conversations = await messageService.getConversations(currentUserId);
      
      res.status(200).json({
        success: true,
        data: conversations
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = messageController;
