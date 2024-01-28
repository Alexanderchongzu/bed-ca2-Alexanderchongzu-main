// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const model = require("../models/petModel");

/// Endpoint B.1--Post a Pet
module.exports.checkUserId = (req, res, next) =>
{
    const data = {
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            } else {
                next();
            }
        }
    }

    model.checkUserId(data, callback);
}

module.exports.duplicatePetName = (req, res, next) =>
{
    const data = {
        petname: req.body.petname
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error petname:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "petname is associated with another Pet"
                });
            } else {
                next();
            }
        }
    }

    model.duplicatePetName(data, callback);
}
module.exports.checkPetUser = (req, res, next) =>
{
    const data = {
        petname: req.body.petname,
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error petname:", error);
            res.status(500).json(error);
        } else {
            const petCount = results[0].petCount;
            if (petCount >= 3) {
                res.status(409).json({
                    message: "User already has three pets."
                });
            } else {
                next();
            }
        }
    }

    model.checkPetUser(data, callback);
}
module.exports.createNewPet = (req, res, next) =>
{    
    if (req.body.petname == undefined || req.body.breeds == undefined || req.body.notes == undefined)
    {
        res.status(400).send("Error: Bad Request");
        return;
    }
    
    const data = {
        petname: req.body.petname,
        user_id: req.body.user_id,
        breeds: req.body.breeds, 
        notes: req.body.notes
    }
    
    const callback = (error, results, fields) =>
    {
        if (error) {
            console.error("Error createNewPet:", error);
            res.status(500).json({
                message: "Internal server error."
            });
        } else {
            const responseBody = {
                pet_id: parseInt(results.insertId),
                user_id: req.body.user_id,
                petname: req.body.petname,
                breeds: req.body.breeds,
                notes: req.body.notes
            }
            res.status(201).json(responseBody);
        }
    }
    model.createNewPet(data, callback);
}

/// Endpoint B.2--Get pet by id
module.exports.retrievePetById = (req, res, next) =>
{
    const data = {
       pet_id: req.params.pet_id
    }

    const callback = (error, results, fields) => {

        if (error) {
            console.error("Error retrievePetById:", error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            {
                res.status(404).json({
                    message: "Pet Not Found"
                });
                return;
            }
        } else {
            res.status(200).json(results[0]);
        }
    }

    model.retrievePetById(data, callback);
}

/// Endpoint B.3--Get all pet
module.exports.retrieveAllPet = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error RetrieveAllPet:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.retrieveAll(callback);
}

/// Endpoint B.4--Update pet information
module.exports.existpetname = (req, res, next) =>
{
    const data = {
        petname: req.body.petname
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error existpetname:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "petname is associated with another petname"
                });
            } else {
                next();
            }
        }
    }

    model.existpetname(data, callback);
}

module.exports.updatePetById = (req, res, next) =>
{
    if(req.body.petname == undefined || req.body.breeds == undefined || req.body.notes == undefined)
    {
        res.status(400).json({
            message: "Error: Bad Request"
        });
        return;
    }

    const data = {
        pet_id: req.params.pet_id,
        petname: req.body.petname,
        breeds: req.body.breeds,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePetById:", error);
            res.status(500).json(error); 
        } else if (results.affectedRows == 0) {
            res.status(404).json({
                message: "Pet not found"
            });
        } else {
        res.status(200).json(data);
        }
    }

    model.updatePetById(data, callback);
}

/// Endpoint B.5--Delete a pet
module.exports.deletePet = (req, res, next) =>
{
    const data = {
        pet_id: req.params.pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePet:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Pet not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deletePet(data, callback);
}