CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products(
    id uuid DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL
)