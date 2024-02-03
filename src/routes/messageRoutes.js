const express = require('express');
const router = express.Router();

const controller = require('../controllers/messageController');

router.get('/', controller.readAllMessage);
router.post('/', controller.createMessage);
router.get('/:id', controller.readMessageById);
router.put('/:username', controller.updateMessageByUsername);
router.delete('/:username', controller.deleteMessageByName);

module.exports = router;