CREATE TABLE errors (
    id SERIAL PRIMARY KEY,
    date_time TIMESTAMP DEFAULT Now(),
    error JSON);