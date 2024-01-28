// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const express = require('express');
const controller = require('../controllers/taskprogressController');

const router = express.Router();
router.post('/', controller.existUserId, controller.existTaskId, controller.insertnewTaskProgress); // Endpoint A.11
router.get('/:progress_id', controller.retrieveTaskProgressById); // Endpoint A.12
router.put('/:progress_id', controller.updateTaskProgress); // Endpoint A.13
router.delete('/:progress_id', controller.deleteTaskProgress); //Endpoint A.14

module.exports = router;