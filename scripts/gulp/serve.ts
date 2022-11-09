import express from 'express';

import historyApiFallback from 'connect-history-api-fallback';
import { Server } from 'http';
import { colors, log } from 'gulp-util';

type Express = ReturnType<typeof express>;

const serve = (
  directoryPath: string,
  host: string,
  port: number,
  configureMiddleware: (express: Express) => Express = app => app,
): Promise<Server> => {
  return new Promise((resolve, reject) => {
    try {
      const server = configureMiddleware(
        express().use(
          historyApiFallback({
            verbose: false,
          }),
        ),
      )
        .use(express.static(directoryPath))
        .listen(port, host, () => {
          log(colors.yellow(`Server running at http://${host}:${port}`));
          resolve(server);
        });
    } catch (err) {
      reject(err);
    }
  });
};

export const forceClose = (server: Server): Promise<void> => {
  if (!server) return Promise.resolve();

  return new Promise((resolve, reject) => {
    server.keepAliveTimeout = 1000;
    server.close(err => (err ? reject(err) : resolve()));
  });
};

export default serve;
