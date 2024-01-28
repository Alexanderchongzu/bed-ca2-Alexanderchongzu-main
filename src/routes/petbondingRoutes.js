// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const express = require('express');
const controller = require('../controllers/petbondingController');

const router = express.Router();
router.post('/', controller.checkPetId, controller.createNewPetBonding); // Endpoint B.6--Post a pet
router.get('/:petbonding_id', controller.retrievePetBondingById); /// Endpoint B.7--Get pet by id
router.get('/', controller.retrieveAllPetBonding); // Endpoint B.8--Get all pet bonding
router.put('/:petbonding_id', controller.checkpetId, controller.existpetbondingId, controller.updatePetBondingById); /// Endpoint B.9--Update a Pet Bonding
router.delete('/:petbonding_id', controller.deletePetBonding); //Endpoint B.10--Delete a Pet Bonding


module.exports = router;