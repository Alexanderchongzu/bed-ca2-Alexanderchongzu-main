// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const model = require("../models/petbondingModel");

/// Endpoint B.6--Post a Pet Bonding
module.exports.checkPetId = (req, res, next) =>
{
    const data = {
        pet_id: req.body.pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkPetId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Pet not found"
                });
            } else {
                next();
            }
        }
    }

    model.checkPetId(data, callback);
}

module.exports.createNewPetBonding = (req, res, next) =>
{    
    if (req.body.groom == undefined || req.body.feed == undefined || req.body.bonding_on == undefined)
    {
        res.status(400).send("Error: Bad Request");
        return;
    }
    
    const data = {
        pet_id: req.body.pet_id,
        groom: req.body.groom,
        feed: req.body.feed, 
        bonding_on: req.body.bonding_on
    }
    
    const callback = (error, results, fields) =>
    {
        if (error) {
            console.error("Error createNewPetBonding:", error);
            res.status(500).json({
                message: "Internal server error."
            });
        } else {
            const responseBody = {
                petbonding_id: results.insertId,
                pet_id: req.body.pet_id,
                groom: req.body.groom,
                feed: req.body.feed, 
                bonding_on: req.body.bonding_on
            }
            res.status(201).json(responseBody);
        }
    }
    model.createNewPetBonding (data, callback);
}

/// Endpoint B.7--Get pet by id
module.exports.retrievePetBondingById = (req, res, next) =>
{
    const data = {
       petbonding_id: req.params.petbonding_id
    }

    const callback = (error, results, fields) => {

        if (error) {
            console.error("Error retrievePetBondingById:", error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            {
                res.status(404).json({
                    message: "PetBonding Not Found"
                });
                return;
            }
        } else {
            res.status(200).json(results[0]);
        }
    }

    model.retrievePetBondingById(data, callback);
}

/// Endpoint B.8--Get all pet bonding
module.exports.retrieveAllPetBonding = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error RetrieveAllPetBonding:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.retrieveAllPetBonding(callback);
}

/// Endpoint B.9--Update a Pet Bonding
module.exports.checkpetId = (req, res, next) =>
{
    const data = {
        pet_id: req.body.pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkpetId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Pet not found"
                });
            } else {
                next();
            }
        }
    }

    model.checkPetId(data, callback);
}
module.exports.existpetbondingId = (req, res, next) =>
{
    const data = {
        pet_id: req.body.pet_id,
        petbonding_id: req.params.petbonding_id
    }

    const callback = (error, results, fields) => {
        console.log(results);
        if (error) {
            console.error("Error existpetbonding_id:", error);
            res.status(500).json(error);
        } else {
            if (results[0] && results[0].petbonding_id !== undefined && results[0].petbonding_id !== data.petbonding_id) {
                res.status(409).json({
                    message: "pet_id is associated with another petbonding_id"
                });
            } else {
                next();
            }
        }
    }

    model.existpetbondingId(data, callback);
}

module.exports.updatePetBondingById = (req, res, next) =>
{
    if(req.body.groom == undefined || req.body.feed == undefined || req.body.bonding_on == undefined)
    {
        res.status(400).json({
            message: "Error: Bad Request"
        });
        return;
    }

    const data = {
        petbonding_id: req.params.petbonding_id,
        pet_id: req.body.pet_id,
        groom: req.body.groom,
        feed: req.body.feed,
        bonding_on: req.body.bonding_on
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePetById:", error);
            res.status(500).json(error); 
        } else {
            const responseBody = {
                petbonding_id: parseInt(req.params.petbonding_id),
                pet_id: req.body.pet_id,
                groom: req.body.groom,
                feed: req.body.feed,
                bonding_on: req.body.bonding_on
            }
            res.status(200).json(responseBody);
        }
    }

    model.updatePetBondingById(data, callback);
}

/// Endpoint B.10--Delete a Pet Bonding
module.exports.deletePetBonding = (req, res, next) =>
{
    const data = {
        petbonding_id: req.params.petbonding_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePetBonding:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: " Not Found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deletePetBonding(data, callback);
}