import { Server } from 'http';
import { AddressInfo } from 'net';

import { launch, visitUrl } from '@fluentui/scripts-puppeteer';
import express, { Express } from 'express';

/**
 *
 * .close is asynchronous (not promisified thus we are wrapping it)
 *  @see https://nodejs.org/api/net.html#serverclosecallback
 */
export function closeServer(server: Server): Promise<void> {
  if (!server) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    // TODO: Default is 5 seconds. why is this set to 1 ?
    // https://nodejs.org/api/http.html#serverkeepalivetimeout
    server.keepAliveTimeout = 1000;
    server.close(err => (err ? reject(err) : resolve()));
  });
}

export function startServer(
  options: { root: string; port: number; host?: string },
  configureMiddleware = (app: Express) => app,
) {
  const { root, port, host = 'localhost' } = options;
  return new Promise<{ server: Server; port: number; url: string }>((resolve, reject) => {
    let usedPort: number;
    try {
      console.log('express: starting server');

      const middleware = (app: Express) => app.use(express.static(root));
      const app = middleware(configureMiddleware(express()));
      const server = app.listen(port, host, () => {
        const shouldAssignArbitraryUnusedPort = port === 0;
        usedPort = shouldAssignArbitraryUnusedPort ? (server.address() as AddressInfo).port : port;
        const url = `http://${host}:${usedPort}`;

        console.log(`express: server running at http://${host}:${usedPort} from directory "${root}"`);

        resolve({ server, port: usedPort, url });
      });

      server.on('error', err => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - improper Error type in typings -> https://nodejs.org/api/net.html#serverlisten
        if (err.code === 'EADDRINUSE') {
          console.error('express: Address in use ...', { port: usedPort, host });
        }

        throw err;
      });
      server.on('close', () => {
        console.error('express: Terminating server ...', { port: usedPort, host });
      });
    } catch (err) {
      reject(err);
    }
  });
}

async function launchServer(root: string) {
  /**
   * If port is omitted or is 0, the operating system will assign an arbitrary unused port,
   * which can be retrieved by using server.address().port after the 'listening' event has been emitted.
   *
   * @see https://nodejs.org/api/net.html#serverlisten
   */
  const PORT = 0;

  try {
    const api = await startServer({ root, port: PORT });

    return api;
  } catch (err) {
    console.error('express: start failed!');
    console.error(err);
    throw err;
  }
}

export async function performBrowserTest(publicDirectory: string) {
  const { server, url } = await launchServer(publicDirectory);
  const browser = await launch();
  const page = await browser.newPage();

  let error: Error | undefined;

  page.on('console', message => {
    if (message.type() === 'error') {
      error = new Error(`[Browser]: console.error(${message.text()})`);
    }
  });
  page.on('pageerror', pageError => {
    error = pageError;
  });

  await visitUrl(page, url);

  await page.close();
  await browser.close();
  await closeServer(server);

  if (error) {
    throw error;
  }
}
