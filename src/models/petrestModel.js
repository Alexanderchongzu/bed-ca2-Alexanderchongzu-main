// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const pool = require('../services/db');

module.exports.checkPetId = (data, callback) => // Endpoint B.11--Post a Pet Resting
{
    const SQLSTATEMENT = `
        SELECT * FROM Pet
        WHERE pet_id = ?;
        `;
    const VALUES = [data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.createNewPetRest = (data, callback) => // Endpoint B.11--Post a Pet Resting

{
    const SQLSTATEMENT = `
        INSERT INTO PetRest (pet_id, duration_minutes, rest_status)
        VALUES (?, ?, NOW());
        `;
    const VALUES = [ data.pet_id, data.duration_minutes, data.rest_status];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.retrievePetRestById = (data, callback) => // Endpoint B.12--Get Resting status

{
    const SQLSTATMENT = `
        SELECT * FROM PetRest
        WHERE rest_id = ?;
        `;
    const VALUES = [data.rest_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.retrieveAllPetRest = (callback) => //Endpoint B.13--Get all Resting status
{
    const SQLSTATMENT = `
    SELECT * FROM PetRest;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.existRestId = (data, callback) => //Endpoint B.14--Update a Pet Rest
{
    const SQLSTATEMENT = `
    SELECT * FROM PetRest WHERE rest_id = ?;
    `;
    const VALUES = [data.rest_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updatePetRestById = (data, callback) => //Endpoint B.14--Update a Pet Rest
{

    const SQLSTATMENT = `
        UPDATE PetRest
        SET duration_minutes = CASE
                                WHEN ? > 1440 THEN 1440
                                ELSE ?
                               END,
            rest_status = CURRENT_TIMESTAMP()
        WHERE rest_id = ?;

        SELECT rest_status 
        FROM PetRest
        WHERE rest_id = ?;
        `;

    const VALUES = [data.duration_minutes, data.duration_minutes, data.rest_status, data.rest_id, data.rest_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deletePetRest = (data, callback) => //Endpoint B.15--Delete a Pet Rest
{
    const SQLSTATMENT = `
        DELETE FROM PetRest
        WHERE rest_id = ?;
        ALTER TABLE User AUTO_INCREMENT = 1;
        `;
    const VALUES = [data.rest_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}