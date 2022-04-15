import supertest from 'supertest';
import app from '../app/app';

const request = supertest(app);

describe('Test the server through test end point', (): void => {
    it('gets the API endpoint with status code 200', async () => {
        const response = await request.get('/servertest');
        expect(response.status).toBe(200);
    });
});
