CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(256) NOT NULL,
    isActive BOOLEAN DEFAULT TRUE NOT NULL
)