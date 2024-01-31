// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const model = require("../models/groomingModel");

/// Endpoint A.6: Create new grooming
module.exports.createGrooming = (req, res, next) =>
{
    if (req.body.points == undefined)
    {
        res.status(400).json({
            message: "Bad Reuqest"
        });
        return;
    }

    const data = {
        points:  req.body.points
    }

    const callback = (error, results, fields) =>
    {
        if (error) {
            console.error("Error createGrooming:", error);
            res.status(500).json({
                message: "Internal server error."
            });
        } else {
            const responseBody = {
                groom_id:    results.insertId,
                points:      data.points
            };
            res.status(201).json(responseBody);
        }
    }

    model.insertGrooming(data, callback);
}

/// Endpoint A.7: Retrieve all grooming
module.exports.retrieveAllGrooming = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error RetrieveAllGrooming:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.retrieveGrooming(callback);
}

/// Endpoint A.8: Retrieve all grooming by id
module.exports.retrieveGroomingById = (req, res, next) =>
{
    const data = {
       groom_id: req.params.groom_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error RetrieveGroomById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Groom not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.retrieveGroomingId(data, callback);
}

/// Endpoint A.9: Update grooming details
module.exports.updateGroomingById = (req, res, next) =>
{
    if (req.body.points == undefined)
    {
        res.status(400).json({
            message: "Bad Request"
        });
        return;
    }

    const data = {
        points:    req.body.points
    }

    const callback = (error, results, fields) => {
        if (results.affectedRows == 0) {
            res.status(404).json({
                message: "Groom not found"
            });
        } else {
            const responseBody = {
                groom_id:    req.params.groom_id,
                points:      req.body.points
            }
            res.status(200).json(responseBody);
        }
    }

    model.updateGroomingById(data, callback);
}

/// Endpoint A.10: Delete grooming
module.exports.deleteGroomingById = (req, res, next) =>
{
    const data = {
        groom_id: req.params.groom_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteGroomingById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Grooming not found"                    
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteGroomingById(data, callback);
}


module.exports.updateGroomingPoints = (req, res, next) =>
{
    if (req.body.groom_id == undefined || req.body.points == undefined)
    {
        res.status(400).json({
            message: "Bad Request"
        });
        return;
    }

    const data = {
        groom_id:  req.body.groom_id,
        points:    req.body.points
    }

    const callback = (error, results, fields) => {
        if (results.affectedRows == 0) {
            res.status(404).json({
                message: "Groom not found"
            });
        } else {
            const responseBody = {
                groom_id:    req.params.groom_id,
                points:      req.body.points
            }
            res.status(200).json(responseBody);
        }
    }

    model.updateGroomingById(data, callback);
}