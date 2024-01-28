// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const model = require("../models/taskModel");

/// Endpoint A.6: Create new task
module.exports.createNewTask = (req, res, next) =>
{
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined)
    {
        res.status(400).json({
            message: "Bad Reuqest"
        });
        return;
    }

    const data = {
        title:          req.body.title,
        description:    req.body.description,
        points:         req.body.points
    }

    const callback = (error, results, fields) =>
    {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json({
                message: "Internal server error."
            });
        } else {
            const responseBody = {
                task_id:        results.insertId,
                title:          data.title,
                description:    data.description,
                points:         data.points
            };
            res.status(201).json(responseBody);
        }
    }

    model.insertTask(data, callback);
}

/// Endpoint A.7: Retrieve all tasks
module.exports.retrieveAlltasks = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error RetrieveAlltasks:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.retrievetasks(callback);
}

/// Endpoint A.8: Retrieve all task by id
module.exports.retrieveTaskById = (req, res, next) =>
{
    const data = {
       task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error RetrieveTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.retrieveTaskId(data, callback);
}

/// Endpoint A.9: Update tasks details
module.exports.updateTaskById = (req, res, next) =>
{
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined)
    {
        res.status(400).json({
            message: "Bad Request"
        });
        return;
    }

    const data = {
        task_id:        req.params.task_id,
        title:          req.body.title,
        description:    req.body.description,
        points:         req.body.points
    }

    const callback = (error, results, fields) => {
        if (results.affectedRows == 0) {
            res.status(404).json({
                message: "Task not found"
            });
        } else {
            const responseBody = {
                task_id:        parseInt(req.params.task_id),
                title:          req.body.title,
                description:    req.body.description,
                points:         req.body.points
            }
            res.status(200).json(responseBody);
        }
    }

    model.updatetaskbyId(data, callback);
}

/// Endpoint A.10: Delete tasks
module.exports.deleteTaskById = (req, res, next) =>
{
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Task not found"                    
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deletetaskById(data, callback);
}