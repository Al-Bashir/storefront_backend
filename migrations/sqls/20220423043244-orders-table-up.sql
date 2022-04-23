CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
    id uuid DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY NOT NULL,
    user_id uuid  REFERENCES users (id) NOT NULL,
    product_id uuid  REFERENCES products (id) NOT NULL,
    quantity INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL
)