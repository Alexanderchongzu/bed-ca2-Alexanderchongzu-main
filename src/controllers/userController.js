
// REQUIRE MODULES
const model = require("../models/userModel.js");

module.exports.readAllUser = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

module.exports.readUserById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

module.exports.createNewUser = (req, res, next) =>
{
    if(req.body.username == undefined || req.body.email == undefined || req.body.password == undefined)
    {
        res.status(400).send("Error: username, email and password is undefined");
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    model.insertSingle(data, callback);
}

module.exports.updateUserById = (req, res, next) =>
{
    if(req.body.username == undefined || req.body.email == undefined || req.body.password == undefined)
    {
        res.status(400).json({
            message: "Error: username, email and password is undefined"
        });
        return;
    }

    const data = {
        id: req.params.id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send(); // 204 No Content
        }
    }

    model.updateById(data, callback);
}

module.exports.deleteUserById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
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
// GET ALL PLAYERS BY USER


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
            res.locals.message = 
                `User ${data.username} created successfully.`
            ;
            next();
        }
    }

    model.insertSingle(data, callback);
}

// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
module.exports.checkUsernameOrEmailExist = (req, res, next) =>
{
    if(req.body.username == undefined || req.body.email == undefined)
    {
        res.status(400).json({
            message: "Error: username or email is undefined"
        });
    }

    const data = {
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUsernameOrEmailExist:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "Username or email already exists"
                });
            } else {
                next();
            }
        }
    }

    model.selectByUsernameOrEmail(data, callback);
}

// MIDDLWARE FOR CHECK IF PLAYER BELONGS TO USER


