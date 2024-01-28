// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const model = require("../models/petrestModel");

/// Endpoint B.11--Post a Pet Resting
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


module.exports.createNewPetRest = (req, res, next) =>
{    
    if (req.body.duration_minutes == undefined || req.body.rest_status == undefined)
    {
        res.status(400).send("Error: Bad Request");
        return;
    }
    
    const data = {
        pet_id: req.body.pet_id,
        duration_minutes: req.body.duration_minutes,
        rest_status: req.body.rest_status
    }
    
    const callback = (error, results, fields) =>
    {
        if (error) {
            console.error("Error createNewPetRest:", error);
            res.status(500).json({
                message: "Internal server error."
            });
        } else {
            const responseBody = {
                petrest_id: results.insertId,
                pet_id: req.body.pet_id,
                duration_minutes: req.body.duration_minutes,
                rest_status: req.body.rest_status
            }
            res.status(201).json(responseBody);
        }               

    }
    model.createNewPetRest (data, callback);
}

/// Endpoint B.12--Get Resting status
module.exports.retrievePetRestById = (req, res, next) =>
{
    const data = {
       rest_id: req.params.rest_id
    }

    const callback = (error, results, fields) => {

        if (error) {
            console.error("Error retrievePetRestById:", error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            {
                res.status(404).json({
                    message: "Not Found"
                });
                return;
            }
        } else {
            res.status(200).json(results[0]);
        }
    }

    model.retrievePetRestById(data, callback);
}

/// Endpoint B.13--Get all Resting status
module.exports.retrieveAllPetRest = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error RetrieveAllPetRest:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.retrieveAllPetRest(callback);
}

/// Endpoint B.14--Update a Pet Rest
module.exports.existRestId = (req, res, next) =>
{
    const data = {
        pet_id: req.body.pet_id,
        rest_id: req.params.rest_id
    }

    const callback = (error, results, fields) => {
        console.log(results);
        if (error) {
            console.error("Error existpetrest_id:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "rest_id does not exist"
                });
            } else if (results[0].pet_id != data.pet_id) {
                res.status(409).json({
                    message: "pet_id is associated with another rest_id"
                });
            } else {
                next();
            }
        }
    }

    model.existRestId(data, callback);
}

module.exports.updatePetRestById = (req, res, next) =>
{
    
    if(req.body.pet_id == undefined || req.body.duration_minutes == undefined)
    {
        res.status(400).json({
            message: "Error: Bad Request"
        });
        return;
    }
    
    const durationMinutes = parseInt(req.body.duration_minutes);
    if(isNaN(durationMinutes) || durationMinutes > 1440) {
        res.status(400).json({
            message: "Invalid duration_minutes as one day only have 1440 minutes."
        });
        return;
    }

    const data = {
        rest_id: req.params.rest_id,
        pet_id: req.body.pet_id,
        duration_minutes: durationMinutes
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePetById:", error);
            res.status(500).json(error); 
        } else {
                const responseBody = {
                rest_id: parseInt(req.params.rest_id),
                pet_id: req.body.pet_id,
                duration_minutes: durationMinutes,                
                rest_status: results[1][0].rest_status
            };
            res.status(200).json(responseBody);
        }
    };

    model.updatePetRestById(data, callback);
}

/// Endpoint B.15--Delete a Pet Rest
module.exports.deletePetRest = (req, res, next) =>
{
    const data = {
        rest_id: req.params.rest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePetRest:", error);
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

    model.deletePetRest(data, callback);
}