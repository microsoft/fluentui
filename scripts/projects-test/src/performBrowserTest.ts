import http from 'http';
import { AddressInfo } from 'net';

import { launch, visitUrl } from '@fluentui/scripts-puppeteer';
import express from 'express';

function startServer(rootDirectory: string, listenPort: number, host = 'localhost') {
  return new Promise<{ server: http.Server; port: number; url: string }>((resolve, reject) => {
    let port: number;
    try {
      console.log('express: starting server');

      const server = express()
        .use(express.static(rootDirectory))
        .listen(listenPort, host, () => {
          console.log(`express: server running at http://${host}:${port} from directory "${rootDirectory}"`);
          port = listenPort === 0 ? (server.address() as AddressInfo).port : listenPort;
          const url = `http://${host}:${port}`;
          resolve({ server, port, url });
        });

      server.on('error', err => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - improper Error type in typings -> https://nodejs.org/api/net.html#serverlisten
        if (err.code === 'EADDRINUSE') {
          console.error('express: Address in use ...', { port, host });
        }

        throw err;
      });
      server.on('close', () => {
        console.error('express: Terminating server ...', { port, host });
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
    const { server, ...rest } = await startServer(root, PORT);
    /**
     *
     * .close is asynchronous (not promisified thus we are wrapping it)
     *  @see https://nodejs.org/api/net.html#serverclosecallback
     */
    const closeServer = () =>
      new Promise<void>((resolve, reject) => server.close(err => (err ? reject(err) : resolve())));

    return { server, closeServer, ...rest };
  } catch (err) {
    console.error('express: start failed!');
    console.error(err);
    throw err;
  }
}

export async function performBrowserTest(publicDirectory: string) {
  const { closeServer, url } = await launchServer(publicDirectory);
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
  await closeServer();

  if (error) {
    throw error;
  }
}
