const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;

DROP TABLE IF EXISTS Task;

DROP TABLE IF EXISTS TaskProgress;

DROP TABLE IF EXISTS Pet;

DROP TABLE IF EXISTS PetBonding;

DROP TABLE IF EXISTS PetRest;

DROP TABLE IF EXISTS Grooming;

CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    email TEXT,
    password TEXT
);

CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    points INT
);

CREATE TABLE TaskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion_date TIMESTAMP,
    notes TEXT
);

CREATE TABLE Pet (
    pet_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    petname TEXT,
    breeds TEXT,
    notes TEXT
);

CREATE TABLE PetBonding (
    petbonding_id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT NOT NULL,
    groom_id INT NOT NULL,
    feed TEXT
);

CREATE TABLE PetRest (
    rest_id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT NOT NULL,
    duration_minutes INT,
    rest_status TIMESTAMP
);

CREATE TABLE Grooming (
    groom_id INT PRIMARY KEY AUTO_INCREMENT,
    points INT 
);

INSERT INTO Task (title, description, points) VALUES
('Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area.', 50),
('Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
('Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
('Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
('Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35);


`



pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
        console.error("Error creating tables:", error);
    } else {
        console.log("Tables created successfully:", results);
    }
    process.exit();
});


