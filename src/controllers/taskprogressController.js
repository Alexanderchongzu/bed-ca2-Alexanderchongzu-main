// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const model = require("../models/taskprogressModel");

/// Endpoint A.11: Check both id and Create new taskprogress
module.exports.existUserId = (req, res, next) =>
{
    const data = {
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error existUserId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "user_id does not exist"
                });
            } else {
                next();
            }
        }
    }

    model.existUserId(data, callback);
}

module.exports.existTaskId = (req, res, next) =>
{
    const data = {
        task_id: req.body.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error existTaskId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "task_id does not exist"
                });
            } else {
                next();
            }
        }
    }

    model.existTaskId(data, callback);
}

module.exports.insertnewTaskProgress = (req, res, next) =>
{
    if (req.body.completion_date == undefined)
    {
        res.status(400).json({ message: "Bad Request" });
        return;
    } 
    const data = {
        user_id:          req.body.user_id,
        task_id:          req.body.task_id,
        completion_date:  req.body.completion_date,
        notes:            req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error insertnewTaskProgress:", error);
            res.status(500).json(error);
        } else {
            const responseBody = {
                progress_id:     results.insertId,
                user_id:         req.body.user_id,
                task_id:         req.body.task_id,
                completion_date: req.body.completion_date,
                notes:           req.body.notes
            }
            res.status(201).json(responseBody);
        }
    }

    model.insertSingleTaskProgress(data, callback);
}

///////////////////////////////////////////////////////////////////////////

/// Endpoint A.12:  Retrieve all taskprogress by id
module.exports.retrieveTaskProgressById = (req, res, next) =>
{
    const data = {
       progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const formatDate = date.toISOString().split('T')[0];
            return formatDate;
        };
        if (error) {
            console.error("Error RetrieveTaskProgressById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Not Found"
                });
            }
            else {
                const formatResult ={
                    progress_id: results[0].progress_id,
                    user_id: results[0].user_id,
                    task_id: results[0].task_id,
                    completion_date: formatDate(results[0].completion_date),
                    notes: results[0].notes                                
                };
            
            res.status(200).json(
                formatResult
            );
        }
    }
    }
    model.retrieveTaskProgressId(data, callback);
}

//////////////////////////////////////////////////////////////////////////

/// Endpoint A.13: Update Task Progress 
module.exports.updateTaskProgress = (req, res, next) =>
{
    if(req.params.progress_id == undefined || req.body.notes == undefined)
    {
        res.status(400).json({
            message: "Bad Request"
        });
        return;
    }

    const data = {
        progress_id:     req.params.progress_id,
        notes:           req.body.notes
    }

    const callback = (error, results, fields) => {
        console.log(results)
        if (error) {
            console.error("Error updateTaskProgress", error);
            res.status(409).json(error); 
        } else if (results[0].affectedRows == 0) {
            res.status(404).json({
                message: "Progress_id Not Found"
            });
        } else {
            res.status(200).json(results[1][0]);
        }
    }

    model.updateTaskProgress(data, callback);
}

/////////////////////////////////////////////////////////////////////////
/// Endpoint A.14: Delete task progress
module.exports.deleteTaskProgress = (req, res, next) =>
{
    const data = {
        progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskProgress:", error);
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

    model.deleteTaskProgress(data, callback);
}