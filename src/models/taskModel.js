// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const pool = require('../services/db');


module.exports.insertTask = (data, callback) => //Endpoint A.6
{
    const SQLSTATEMENT = `
        INSERT INTO Task (title, description, points)
        VALUES (?, ?, ?);
        `;
    const VALUES = [data.title, data.description, data.points];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.retrievetasks = (callback) => //Endpoint A.7
{
    const SQLSTATMENT = `
    SELECT * FROM Task;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.retrieveTaskId = (data, callback) => //Endpoint A.8
{
    const SQLSTATMENT = `
    
    SELECT * FROM Task WHERE task_id = ?;
    `;
    const VALUES = [data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updatetaskbyId = (data, callback) => //Endpoint A.9
{
    const SQLSTATMENT = `
        UPDATE Task 
        SET title = ?, description = ?, points = ?
        WHERE task_id = ?;
        `;
    const VALUES = [data.title, data.description, data.points, data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deletetaskById = (data, callback) => //Endpoint A.10
{
    const SQLSTATMENT = `
        DELETE FROM Task
        WHERE task_id = ?;
        ALTER TABLE Task AUTO_INCREMENT = 1;
        `;
    const VALUES = [data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}