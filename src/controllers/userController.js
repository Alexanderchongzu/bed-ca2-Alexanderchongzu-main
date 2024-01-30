// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const model = require("../models/userModel.js");

//// Endpoint A.1: Create new user


module.exports.duplicateEmail = (req, res, next) =>
{
    const data = {
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error existemail:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "email is associated with another user"
                });
            } else {
                next();
            }
        }
    }

    model.duplicateEmail(data, callback);
}
module.exports.createNewUser = (req, res, next) =>
{    
    const data = {
        username: req.body.username,
        email: req.body.email
    }
    
    if(req.body.username == undefined || req.body.email == undefined)
    {
        res.status(400).send("Error: Bad Request");
        return;
    }
   
    const callback = (error, results, fields) =>
    {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json({
                message: "Internal server error."
            });
        } else {
            const responseBody = {
                user_id: results.insertId,
                username: req.body.username,
                email: req.body.email
            }
            res.status(201).json(responseBody);
        }
    }
    model.insertSingle(data, callback);
}


/// Endpoint A.2A: Retrieve all user
module.exports.retrieveAllUser = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error RetrieveAllUser:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.retrieveAll(callback);
}

/// Endpoint A.2B: Retrieve ONLY username
module.exports.retrieveUsername = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error RetrieveAllUser:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.retrieveUsername(callback);
}
/// Endpoint A.3: Retrieve all user by id
module.exports.retrieveUserById = (req, res, next) =>
{

    const data = {
       user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {

        if (error) {
            console.error("Error RetrieveUserById:", error);
            res.status(500).json(error);
        } else if (results[0].user_id == null) {
            {
                res.status(404).json({
                    message: "User Not Found"
                });
                return;
            }
        } else {
            res.status(200).json(results[0]);
        }
    }

    model.retrieveById(data, callback);
}

/// Endpoint A.4: Update user details
module.exports.existusername = (req, res, next) =>
{
    const data = {
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error existUsername:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "username is associated with another user"
                });
            } else {
                next();
            }
        }
    }

    model.existusername(data, callback);
}

module.exports.existemail = (req, res, next) =>
{
    const data = {
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error existemail:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "email is associated with another email"
                });
            } else {
                next();
            }
        }
    }

    model.existemail(data, callback);
}

module.exports.updateUserById = (req, res, next) =>
{
    if(req.body.username == undefined || req.body.email == undefined)
    {
        res.status(400).json({
            message: "Error: username, email is undefined"
        });
        return;
    }

    const data = {
        user_id: req.params.user_id,
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error); 
        } else if (results.affectedRows == 0) {
            res.status(404).json({
                message: "User not found"
            });
        } else {
            const responseBody = {
                user_id: parseInt(req.params.user_id),
                username: req.body.username,
                email: req.body.email
            }
            res.status(200).json(responseBody);
        }
    }

    model.updateById(data, callback);
}

/// Endpoint A.5: Delete users
module.exports.deleteUserById = (req, res, next) =>
{
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}

// CONTROLLER FOR LOGIN
module.exports.login = (req, res, next) =>
{
    if (req.body.username == undefined || req.body.password == undefined) {
        res.status(400).json({
            message: "username or password undefined"
        });
        return;
    }

    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const callback = (error, results,fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
                return;
            } else {
                res.locals.userId = results[0].user_id;
                res.locals.hash = results[0].password;
                next();
            }
        }
    }

    model.selectUserByUsername(data, callback);
}

// CONTROLLER FOR REGISTER
module.exports.register = (req, res, next) =>
{
    if (req.body.username == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.status(400).json({
            message: "username or email or password undefined"
        });
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }

    const callback = (error, results, fields) =>
    {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        } else {
            res.locals.userId = results.insertId;
            res.locals.message = 
                `User ${data.username} created successfully.`
            ;
            next();
        }
    }

    model.insertSingle(data, callback);
}