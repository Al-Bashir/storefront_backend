import { Pool } from 'pg';
import envConfig from './envConfig';
import { myError } from '../models/errorModel';

const pgConnectionPool: Pool = new Pool({
    host: envConfig.DB_HOST,
    database: envConfig.APP_ENV === 'test' ? envConfig.DB_TEST_NAME : envConfig.DB_DEV_NAME,
    user: envConfig.DB_USERNAME,
    password: envConfig.DB_PASSWORD,
    port: parseInt(envConfig.DB_PORT as string),
});

pgConnectionPool.on('error', (err: Error): void => {
    const poolError: myError = {
        error: err,
        message: (err as Error).message,
        customMessage: `Database connection error: ${err.message}`,
        HTTPStatusCode: 500,
    };
    throw poolError;
});

export default pgConnectionPool;
