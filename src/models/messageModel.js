const pool = require('../services/db');

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Messages;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Messages
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Messages (message_text, username)
    VALUES (?, ?);
    `;
    const VALUES = [data.message_text, data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateByUsername = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Messages 
    SET message_text = ?
    WHERE username = ?;
    `;
    const VALUES = [data.message_text, data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteByName = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Messages 
    WHERE username = ?;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}
