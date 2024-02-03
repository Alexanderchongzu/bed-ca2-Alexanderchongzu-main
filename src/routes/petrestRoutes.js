// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const express = require('express');
const controller = require('../controllers/petrestController');

const router = express.Router();
router.post('/', controller.checkPetId, controller.createNewPetRest); // Endpoint B.11--Post a Pet Resting
router.get('/:rest_id', controller.retrievePetRestById); // Endpoint B.12--Get Resting status
router.get('/', controller.retrieveAllPetRest); // Endpoint B.13--Get all Resting status
router.get('/petname', controller.retrievepetname); // Endpoint B.13--Get all Resting status
router.put('/:rest_id', controller.checkPetId, controller.existRestId, controller.updatePetRestById); // Endpoint B.14--Update a Pet Rest
router.delete('/:rest_id', controller.deletePetRest); //Endpoint B.15--Delete a Pet Rest


module.exports = router;