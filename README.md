import cors from 'cors';
import express, { type Request, type Response } from 'express';
import path from 'node:path';

import router from './routes';
import { envConfig } from './config/env';

const app = express();
const publicDir = path.join(__dirname, '..', 'public');

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(publicDir));
app.use('/api', router);

app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(envConfig.PORT, () => {
  console.log(`${envConfig.APP_NAME} running on http://localhost:${envConfig.PORT}`);
});
