import dotenv from 'dotenv';

dotenv.config();

const {
    SERVER_PORT,
    APP_ENV,
    DB_HOST,
    DB_DEV_NAME,
    DB_TEST_NAME,
    DB_PASSWORD,
    DB_USERNAME,
    DB_PORT,
    HASH_STRING,
    SALT_ROUNDS,
    TOKEN_STRING,
} = process.env;

export default {
    SERVER_PORT,
    APP_ENV,
    DB_HOST,
    DB_DEV_NAME,
    DB_TEST_NAME,
    DB_PASSWORD,
    DB_USERNAME,
    DB_PORT,
    HASH_STRING,
    SALT_ROUNDS,
    TOKEN_STRING,
};
