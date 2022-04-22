import express from 'express';

const testRoute = (req: express.Request, res: express.Response): void => {
    res.status(200).send('Server is working!');
};

export default testRoute;
