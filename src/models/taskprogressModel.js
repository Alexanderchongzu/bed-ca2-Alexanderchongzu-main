// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const pool = require('../services/db');

module.exports.existUserId = (data, callback) => //Endpoint A.11
{
    const SQLSTATEMENT = `
    SELECT * FROM User WHERE user_id = ?;
        `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
module.exports.existTaskId = (data, callback) => //Endpoint A.11
{
    const SQLSTATEMENT = `
    SELECT * FROM Task WHERE task_id = ?;
        `;
    const VALUES = [data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
module.exports.insertSingleTaskProgress = (data, callback) => //Endpoint A.11
{
    const SQLSTATEMENT = `
        INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
        VALUES (?, ?, ?, ?);
        `;
    const VALUES = [ data.user_id, data.task_id, data.completion_date, data.notes];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
///////////////////////////////////////////////////////////////////////////

module.exports.retrieveTaskProgressId = (data, callback) => //Endpoint A.12
{
    const SQLSTATMENT = `
    
    SELECT * FROM TaskProgress WHERE progress_id = ?;
    `;
    const VALUES = [data.progress_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
//////////////////////////////////////////////////////////////////////////

module.exports.updateTaskProgress = (data, callback) => //Endpoint A.13
{
    const SQLSTATMENT = `
        UPDATE TaskProgress
        SET notes = ?
        WHERE progress_id = ?;
        SELECT * FROM TaskProgress
        WHERE progress_id = ?;
        `;
    const VALUES = [ data.notes, data.progress_id, data.progress_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
/////////////////////////////////////////////////////////////////////////

module.exports.deleteTaskProgress = (data, callback) => //Endpoint A.14
{
    const SQLSTATMENT = `
        DELETE FROM TaskProgress
        WHERE progress_id = ?;
        ALTER TABLE TaskProgress AUTO_INCREMENT = 1;

        `;
    const VALUES = [data.progress_id];
        // ALTER TABLE Users AUTO_INCREMENT = 1;

    pool.query(SQLSTATMENT, VALUES, callback);
}