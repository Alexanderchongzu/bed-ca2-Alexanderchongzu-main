// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const express = require('express');
const controller = require('../controllers/userController');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');


const router = express.Router();
router.post('/', controller.createNewUser);
router.get('/usertask', controller.usertask);
router.get('/username', controller.retrieveUsername);
router.get('/', controller.retrieveAllUser);
router.get('/:user_id', controller.retrieveUserById);
router.put('/username', controller.updateUserByusername, bcryptMiddleware.hashPassword);
router.delete('/:id', controller.deleteUserById);
router.get('/', controller.retrieveAllUser);

module.exports = router;