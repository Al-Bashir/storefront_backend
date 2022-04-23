CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products(
    id uuid DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INTEGER,
    category VARCHAR(50) NOT NULL
)