// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const express = require('express');
const controller = require('../controllers/groomingController');

const router = express.Router();
router.post('/', controller.createGrooming); // Endpoint A.6
router.get('/', controller.retrieveAllGrooming); // Endpoint A.7
router.get('/:groom_id', controller.retrieveGroomingById); // Endpoint A.8
router.put('/:groom_id', controller.updateGroomingById); // Endpoint A.9
router.delete('/:groom_id', controller.deleteGroomingById); //Endpoint A.10

module.exports = router;