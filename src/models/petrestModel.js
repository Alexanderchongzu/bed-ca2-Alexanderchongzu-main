// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const pool = require('../services/db');

module.exports.checkPetId = (data, callback) => // Endpoint B.11--Post a Pet Resting
{
    const SQLSTATEMENT = `
        SELECT * FROM Pet
        WHERE petname = ?;
        `;
    const VALUES = [data.petname];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.createNewPetRest = (data, callback) => // Endpoint B.11--Post a Pet Resting

{
    const SQLSTATEMENT = `
        INSERT INTO PetRest (petname, area, rest_date)
        VALUES (?, ?, NOW());
        `;
    const VALUES = [data.petname, data.area, data.rest_date];

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
module.exports.retrievepetname = (callback) => //Endpoint B.13--Get all Resting status
{
    const SQLSTATMENT = `
    SELECT Pet.petname, PetRest.area, PetRest.rest_date
    FROM Pet
    INNER JOIN PetRest ON Pet.petname = PetRest.petname;
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
        SET area = CASE
                                WHEN ? > 1440 THEN 1440
                                ELSE ?
                               END,
            rest_date = CURRENT_TIMESTAMP()
        WHERE rest_id = ?;

        SELECT rest_date 
        FROM PetRest
        WHERE rest_id = ?;
        `;

    const VALUES = [data.area, data.area, data.rest_date, data.rest_id, data.rest_id];
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