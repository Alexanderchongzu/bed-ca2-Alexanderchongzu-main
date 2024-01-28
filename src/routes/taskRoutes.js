// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const express = require('express');
const controller = require('../controllers/taskController');

const router = express.Router();
router.post('/', controller.createNewTask); // Endpoint A.6
router.get('/', controller.retrieveAlltasks); // Endpoint A.7
router.get('/:task_id', controller.retrieveTaskById); // Endpoint A.8
router.put('/:task_id', controller.updateTaskById); // Endpoint A.9
router.delete('/:task_id', controller.deleteTaskById); //Endpoint A.10

module.exports = router;