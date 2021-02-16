import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config';
import { github } from './controllers/github';
import { ci } from './controllers/ci';
import { screener } from './controllers/screener';
import { validateGithubWebhook } from './utils';

express()
  .use(bodyParser.json())
  .get('/', (_, res) => res.sendStatus(200))
  .post('/api/github', validateGithubWebhook, github)
  .post('/api/ci', ci)
  .post('/api/screener', screener)
  .use((err: Error, _: Request, res: Response) => {
    if (err) console.error(err);
    res.sendStatus(400);
  })
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
