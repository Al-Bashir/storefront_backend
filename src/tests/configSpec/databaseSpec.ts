import pgConnectionPool from '../../config/database';

describe('Test database connection', (): void => {
    it('It connect to the database', async () => {
        await expectAsync(
            pgConnectionPool
                .connect()
                .then((client) => {
                    client.release();
                })
                .catch((err) => {
                    throw err;
                })
        ).not.toBeRejectedWithError();
    });
});
