import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB } from './config/index';
import { authenticationRouter } from 'routers';

loadEnv();

// Config
const app = express();
app.use(cors());
app.use(express.json());

app.use(authenticationRouter);

export function init(): Promise<Express> {
	connectDb();
	return Promise.resolve(app);
}

export async function close(): Promise<void> {
	await disconnectDB();
}

export default app;
