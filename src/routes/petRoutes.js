// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const express = require('express');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const controller = require('../controllers/petController');

const router = express.Router();

router.post('/', controller.checkUserId, controller.duplicatePetName, controller.checkPetUser, controller.createNewPet); // Endpoint B.1-Post a pet
router.get('/:pet_id', controller.retrievePetById); // Endpoint B.2-Get a Pet
router.get('/', controller.retrieveAllPet); // Endpoint B.3-Get all Pet
router.put('/:pet_id', controller.existpetname, controller.updatePetById); // Endpoint B.4--Update pet information
router.delete('/:pet_id', controller.deletePet); //Endpoint B.5--Delete a pet


module.exports = router;