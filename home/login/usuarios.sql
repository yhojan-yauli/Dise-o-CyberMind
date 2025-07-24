CREATE DATABASE ciberseguridad_db;
use ciberseguridad_db;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO usuarios (username, email, password) VALUES ('testuser', 'test@example.com', 'testpassword');


SELECT * FROM usuarios;