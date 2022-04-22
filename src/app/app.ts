import express from 'express';
import routeController from '../routes/routeHandler';
import errorHandler from '../middleware/error.handler';

const app: express.Application = express();
// Express body-parser
app.use(express.json());

app.use('/', routeController);
// Handle false route

// Error Handler middleware
app.use(errorHandler);

export default app;
