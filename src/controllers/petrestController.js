// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const model = require("../models/petrestModel");

/// Endpoint B.11--Post a Pet Resting
module.exports.checkPetId = (req, res, next) =>
{
    const data = {
        petname: req.body.petname
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
    if (req.body.petname == undefined || req.body.area == undefined || req.body.rest_date == undefined)
    {
        res.status(400).send("Error: Bad Request");
        return;
    }
    
    const data = {
        petname: req.body.petname,
        area: req.body.area,
        rest_date: req.body.rest_date
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
                petname: req.body.petname,
                area: req.body.area,
                rest_date: req.body.rest_date
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

/// Endpoint B.13--Get all Resting status
module.exports.retrievepetname = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error RetrieveAllPetRest:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.retrievepetname(callback);
}

/// Endpoint B.14--Update a Pet Rest
module.exports.existRestId = (req, res, next) =>
{
    const data = {
        petname: req.body.petname,
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
            } else if (results[0].petname != data.petname) {
                res.status(409).json({
                    message: "petname is associated with another rest_id"
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
    
    if(req.body.petname == undefined || req.body.area == undefined)
    {
        res.status(400).json({
            message: "Error: Bad Request"
        });
        return;
    }
    
    const durationMinutes = parseInt(req.body.area);
    if(isNaN(durationMinutes) || durationMinutes > 1440) {
        res.status(400).json({
            message: "Invalid area as one day only have 1440 minutes."
        });
        return;
    }

    const data = {
        rest_id: req.params.rest_id,
        petname: req.body.petname,
        area: durationMinutes
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePetById:", error);
            res.status(500).json(error); 
        } else {
                const responseBody = {
                rest_id: parseInt(req.params.rest_id),
                petname: req.body.petname,
                area: durationMinutes,                
                rest_date: results[1][0].rest_date
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