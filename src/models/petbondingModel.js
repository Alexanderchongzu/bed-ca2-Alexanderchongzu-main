// Name: Alexander Yip Chong Zu
// Admin No.: 2201788
// Class: DIT/FT/1B/01

const pool = require('../services/db');

module.exports.checkPetId = (data, callback) => /// Endpoint B.6--Post a Pet Bonding
{
    const SQLSTATEMENT = `
        SELECT * FROM Pet
        WHERE pet_id = ?;
        `;
    const VALUES = [data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.createNewPetBonding = (data, callback) => // Endpoint B.6--Post a Pet Bonding

{
    const SQLSTATEMENT = `
        INSERT INTO PetBonding (pet_id, groom, feed, bonding_on)
        VALUES (?, ?, ?, NOW());
        `;
    const VALUES = [ data.pet_id, data.groom, data.feed, data.bonding_on];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.retrievePetBondingById = (data, callback) => // Endpoint B.7--Get pet by id

{
    const SQLSTATMENT = `
        SELECT * FROM PetBonding
        WHERE petbonding_id = ?;
        `;
    const VALUES = [data.petbonding_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.retrieveAllPetBonding = (callback) => //Endpoint B.8--Get all pet bonding
{
    const SQLSTATMENT = `
    SELECT * FROM PetBonding;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.existpetbondingId = (data, callback) => //Endpoint B.9--Update a Pet Bonding
{
    const SQLSTATEMENT = `
    SELECT * FROM PetBonding WHERE pet_id = ?;
    `;
    const VALUES = [data.petbonding_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updatePetBondingById = (data, callback) => //Endpoint B.9--Update a Pet Bonding
{
    const SQLSTATMENT = `
        UPDATE PetBonding
        SET pet_id = ?, groom = ?, feed = ?, bonding_on = ?
        WHERE petbonding_id = ?;
        `;
    const VALUES = [data.pet_id, data.groom, data.feed, data.bonding_on, data.petbonding_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deletePetBonding = (data, callback) => //Endpoint B.10--Delete a Pet Bonding
{
    const SQLSTATMENT = `
        DELETE FROM PetBonding
        WHERE petbonding_id = ?;
        ALTER TABLE User AUTO_INCREMENT = 1;

        DELETE FROM Pet
        WHERE pet_id = ?;
        ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
        `;
    const VALUES = [data.petbonding_id, data.pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}