// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const pool = require('../services/db');


module.exports.insertGrooming = (data, callback) => //Endpoint A.6
{
    const SQLSTATEMENT = `
        INSERT INTO Grooming (points)
        VALUES (?);
        `;
    const VALUES = [data.points];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.retrieveGrooming = (callback) => //Endpoint A.7
{
    const SQLSTATMENT = `
    SELECT * FROM Grooming;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.retrieveGroomingId = (data, callback) => //Endpoint A.8
{
    const SQLSTATMENT = `
    
    SELECT * FROM Grooming WHERE groom_id = ?;
    `;
    const VALUES = [data.groom_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateGroomingById = (data, callback) => //Endpoint A.9
{
    const SQLSTATMENT = `
        UPDATE Grooming
        SET points = ?
        WHERE groom_id = ?;
        `;
    const VALUES = [data.points, data.groom_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteGroomingById = (data, callback) => //Endpoint A.10
{
    const SQLSTATMENT = `
        DELETE FROM groom
        WHERE groom_id = ?;
        ALTER TABLE Grooming AUTO_INCREMENT = 1;
        `;
    const VALUES = [data.groom_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateGroomingPoints = (data, callback) => //Endpoint A.9
{
    const SQLSTATMENT = `
        UPDATE Grooming
        SET points = points-30
        WHERE groom_id = ?;
        `;
    const VALUES = [data.points, data.groom_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}