const pool = require('../services/db');

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM User;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM User
        WHERE id = ?;
        `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
        INSERT INTO User (username, email, password)
        VALUES (?, ?, ?);
        `;
    const VALUES = [data.username, data.email, data.password];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
        UPDATE User 
        SET username = ?, email = ?, password = ?
        WHERE id = ?;
        `;
    const VALUES = [data.username, data.email, data.password, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
        DELETE FROM User
        WHERE id = ?;

        ALTER TABLE User AUTO_INCREMENT = 1;
        `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectByUsernameOrEmail = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM User
        WHERE username = ? OR email = ?;
        `;
    const VALUES = [data.username, data.email];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectUserByUsername = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM User
        WHERE username = ?;
        `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}