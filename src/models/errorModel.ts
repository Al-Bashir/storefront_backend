import pgConnectionPool from '../config/database';

export interface myError extends Error {
    customMessage?: string;
    HTTPStatusCode?: number;
}

export default class errors {
    async insertError(error: string): Promise<void> {
        pgConnectionPool.connect().then((client) => {
            const sql = 'INSERT INTO errors (error) VALUES($1)';
            const values = [error];
            return client
                .query(sql, values)
                .then(() => {
                    client.release();
                })
                .catch((error) => {
                    client.release();
                    throw error;
                });
        });
    }
}
