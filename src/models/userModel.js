// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const pool = require('../services/db');

module.exports.selectUserByUsername = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT * FROM User
        WHERE username = ?;
        `;
    const VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.duplicateEmail = (data, callback) => //Endpoint A.1
{
    const SQLSTATEMENT = `
    SELECT * FROM User WHERE email = ?;
        `;
    const VALUES = [data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.insertSingle = (data, callback) => //Endpoint A.1
{
    const SQLSTATMENT = `
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?);
    `;
    const VALUES = [data.username, data.email, data.password];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.retrieveAll = (callback) => //Endpoint A.2A
{
    const SQLSTATMENT = `
    SELECT * FROM User;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.usertask = (callback) => //Endpoint A.2A
{
    const SQLSTATMENT = `
    SELECT * FROM User;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.retrieveUsername = (data, callback) => //Endpoint A.2B
{
    const SQLSTATMENT = `
    SELECT user.user_id, 
    user.username,
    user.email,
    COALESCE(SUM(task.points), 0) AS total_points
    FROM user
    LEFT JOIN taskprogress ON user.user_id = taskprogress.user_id
    LEFT JOIN task ON taskprogress.task_id = task.task_id
    WHERE user.username = ?;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}
module.exports.retrieveById = (data, callback) => //Endpoint A.3
{
    const SQLSTATMENT = `
    SELECT user.user_id, 
    user.username,
    user.email,
    COALESCE(SUM(task.points), 0) AS total_points
    FROM user
    LEFT JOIN taskprogress ON user.user_id = taskprogress.user_id
    LEFT JOIN task ON taskprogress.task_id = task.task_id
    WHERE user.user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.existusername = (data, callback) => //Endpoint A.4
{
    const SQLSTATEMENT = `
    SELECT * FROM User WHERE username = ?;
        `;
    const VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
module.exports.existemail = (data, callback) => //Endpoint A.4
{
    const SQLSTATEMENT = `
    SELECT * FROM User WHERE email = ?;
        `;
    const VALUES = [data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
module.exports.updateByusername = (data, callback) => //Endpoint A.4
{
    const SQLSTATMENT = `
        UPDATE User SET password = ? 
        WHERE username = ?; 
        `;
    const VALUES = [data.password, data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) => //Endpoint A.5
{
    const SQLSTATMENT = `
        DELETE FROM User
        WHERE user_id = ?;
        ALTER TABLE User AUTO_INCREMENT = 1;

        DELETE FROM TaskProgress
        WHERE user_id = ?;
        ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
        `;
    const VALUES = [data.user_id, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
