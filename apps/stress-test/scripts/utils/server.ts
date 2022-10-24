import { CLIServerOptions } from './types';
import express from 'express';
import { join } from 'path';
import { Server } from 'http';
import { getPackageRoot } from './paths.js';

const handleGracefulShutdown: (arg: unknown) => void = arg => {
  console.log('Shutting down...');
  if (server && server.close) {
    console.log('Closing HTTP server');
    server.close();
    process.off('uncaughtException', handleGracefulShutdown);
  }

  if (arg instanceof Error) {
    console.error('Error', arg);
    process.exit(1);
  }
};

let server: Server;
const startServer: (options: CLIServerOptions) => Promise<void> = (options = {}) => {
  return new Promise((resolve, reject) => {
    if (server) {
      return reject(new Error('Server already running.'));
    }

    const { root = 'dist', port = 8080 } = options;
    const rootPath = join(getPackageRoot(), root);

    const app = express();
    app.use(express.static(rootPath));

    process.on('uncaughtException', handleGracefulShutdown);

    server = app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
      console.log(`Serving directory: ${rootPath}`);
      resolve();
    });
  });
};

const stopServer = () => {
  if (!server) {
    throw new Error('No server running.');
  }

  server.close();
};

export { startServer, stopServer };
