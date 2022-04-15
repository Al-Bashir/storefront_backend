import http from 'http';
import envConfig from './config/envConfig';
import app from './app/app';

const server = http.createServer(app);

server.listen(envConfig.SERVER_PORT, () => {
    console.log('server work normal on ' + envConfig.SERVER_PORT);
});
