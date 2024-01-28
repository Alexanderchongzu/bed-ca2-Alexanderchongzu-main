// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const pool = require('../services/db');

module.exports.checkUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT * FROM User
        WHERE user_id = ?;
        `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.duplicatePetName = (data, callback) => //Endpoint B.1--Post a pet
{
    const SQLSTATEMENT = `
        SELECT * FROM Pet
        WHERE petname = ?;
        `;
    const VALUES = [data.petname];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.checkPetUser = (data, callback) => //Endpoint B.1--Post a pet
{
    const SQLSTATEMENT = `
        SELECT COUNT(*) AS petCount
        FROM Pet
        WHERE user_id = ?;
        `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
       
module.exports.createNewPet = (data, callback) => //Endpoint B.1--Post a pet
{
    const SQLSTATEMENT = `
        INSERT INTO Pet (petname, user_id, breeds, notes)
        VALUES (?, ?, ?, ?);
        `;

    const VALUES = [ data.petname, data.user_id, data.breeds, data.notes];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.retrievePetById = (data, callback) => //Endpoint B.2--Get pet by id
{
    const SQLSTATMENT = `
        SELECT * FROM Pet
        WHERE pet_id = ?;
        `;
    const VALUES = [data.pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.retrieveAll = (callback) => //Endpoint B.3--Get all pet
{
    const SQLSTATMENT = `
    SELECT * FROM Pet;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.existpetname = (data, callback) => //Endpoint B.4--Update pet information
{
    const SQLSTATEMENT = `
    SELECT * FROM Pet WHERE petname = ?;
        `;
    const VALUES = [data.petname];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updatePetById = (data, callback) => //Endpoint B.4--Update pet information
{
    const SQLSTATMENT = `
        UPDATE Pet
        SET petname = ?,breeds = ?, notes = ?
        WHERE pet_id = ?;
        `;
    const VALUES = [data.petname, data.breeds, data. notes, data.pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deletePet = (data, callback) => //Endpoint B.5--Delete a pet
{
    const SQLSTATMENT = `
        DELETE FROM Pet
        WHERE pet_id = ?;
        ALTER TABLE User AUTO_INCREMENT = 1;
        `;
    const VALUES = [data.pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}