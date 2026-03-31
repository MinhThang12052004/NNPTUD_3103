const express = require('express');
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:userID', auth, messageController.getMessagesByUser);
router.post('/', auth, messageController.sendMessage);
router.get('/', auth, messageController.getConversations);

module.exports = router;
