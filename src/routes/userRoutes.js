// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();
router.get('/', controller.retrieveAllUser);
router.post('/', controller.createNewUser);

router.get('/:id', controller.retrieveUserById);
router.put('/:id', controller.updateUserById);
router.delete('/:id', controller.deleteUserById);

module.exports = router;