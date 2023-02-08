import type { Server } from 'http';

import { closeServer, startServer } from '@fluentui/scripts-projects-test';
import historyApiFallback from 'connect-history-api-fallback';
import type { Express } from 'express';

export const serve = async (
  directoryPath: string,
  host: string,
  port: number,
  configureMiddleware = (app: Express) => app,
): Promise<Server> => {
  const middleware = (app: Express) => {
    return configureMiddleware(
      app.use(
        historyApiFallback({
          verbose: false,
        }),
      ),
    );
  };

  const { server } = await startServer({ root: directoryPath, host, port }, middleware);
  return server;
};

export const forceClose = closeServer;
