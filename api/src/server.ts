import { domain, uploadsDirPath } from './global/index.js';
import { authRoute } from './routes/auth/auth.route.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import { setupRoutes } from './utils/setupRoutes.js';
import { checkUploadsDirExistence } from './utils/checkUploadsDirExistence.js';
import { sequelize } from './database/dbClient.js';
import { initSocket } from './routes/socket/index.js';
import { shellRoute } from './routes/shell/shell.route.js';

const port = process.env.PORT || 5000;
const app = express();
const corsConfig = {
	credentials: true,
	// origin: `http://${domain}`
	origin: `*`
}
const routers = [
	authRoute,
	shellRoute,
]

checkUploadsDirExistence();

app.use(morgan('dev'));
app.use(cors(corsConfig));
app.use(express.json());
app.use('/uploads', express.static(uploadsDirPath));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(isTokenValid({
// 	reversedAuthRoutes: ['/auth/login']
// }));

const registeredRoutes = setupRoutes(app, routers);
const server           = http.createServer(app);

initSocket(server)

server.listen(port, async () => {
	console.log(`\n  Server running at http://localhost:${port}/\n`);
	console.log('  Cors:    ', corsConfig);
	console.log('  Routes:  ', registeredRoutes);
    
    try {
        await sequelize.authenticate();
        console.log('  Database: Connected to Sqlite\n');
    } catch (error) {
        console.error('  Unable to connect to the database:', error);
    }
});