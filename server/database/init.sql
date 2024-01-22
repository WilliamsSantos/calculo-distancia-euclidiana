-- Cria a tabela clients se ela não existir
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    email VARCHAR(60) UNIQUE NOT NULL,
    name VARCHAR(35) NOT NULL,
    phone VARCHAR(11) UNIQUE NOT NULL,
    lat DECIMAL(9,6),
    lon DECIMAL(9,6),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clients_name ON clients(name);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_phone ON clients(phone);

-- seed inicial 
INSERT INTO clients (name, email, phone, lat, lon, created_at) VALUES 
('Cliente 1', 'email1@example.com', '9060906806', -82.818109, -104.43985, CURRENT_TIMESTAMP),
('Cliente 2', 'email2@example.com', '2762717262', 80.328724, -30.252611, CURRENT_TIMESTAMP),
('Cliente 3', 'email3@example.com', '7385153081', 7.739834, -99.528469, CURRENT_TIMESTAMP),
('Cliente 4', 'email4@example.com', '7116064719', -67.440864, 73.50029, CURRENT_TIMESTAMP),
('Cliente 5', 'email5@example.com', '9284780837', -11.923512, 86.964128, CURRENT_TIMESTAMP),
('Cliente 6', 'email6@example.com', '6216727223', 64.969462, 22.523953, CURRENT_TIMESTAMP),
('Cliente 7', 'email7@example.com', '3026573576', -59.391267, 6.872184, CURRENT_TIMESTAMP),
('Cliente 8', 'email8@example.com', '2743862706', 88.602851, -131.924709, CURRENT_TIMESTAMP),
('Cliente 9', 'email9@example.com', '0640227541', 29.48827, -135.976354, CURRENT_TIMESTAMP),
('Cliente 10', 'email10@example.com', '8690994398', -34.969988, 82.992786, CURRENT_TIMESTAMP),
('Cliente 11', 'email11@example.com', '1631438921', -81.830663, -125.059108, CURRENT_TIMESTAMP),
('Cliente 12', 'email12@example.com', '5642419814', -7.834339, -164.674915, CURRENT_TIMESTAMP),
('Cliente 13', 'email13@example.com', '8093660685', 26.86666, 62.195281, CURRENT_TIMESTAMP),
('Cliente 14', 'email14@example.com', '9644422393', -55.895173, -0.344419, CURRENT_TIMESTAMP),
('Cliente 15', 'email15@example.com', '9654297279', -56.306492, 92.128855, CURRENT_TIMESTAMP)
;
