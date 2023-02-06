import http from 'http';
import { AddressInfo } from 'net';

import { safeLaunchOptions } from '@fluentui/scripts-puppeteer';
import express from 'express';
import puppeteer from 'puppeteer';


const SERVER_HOST = 'localhost';

function startServer(publicDirectory: string, listenPort: number) {
  return new Promise<http.Server>((resolve, reject) => {
    try {
      const app = express();
      app.use(express.static(publicDirectory));

      const server = app.listen(listenPort, SERVER_HOST, () => {
        resolve(server);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function performBrowserTest(publicDirectory: string) {
  const server = await startServer(publicDirectory, 0);
  const { port } = server.address() as AddressInfo;

  console.log(`Starting server on port ${port} from directory ${publicDirectory}`);
  console.log('Started server. Launching Puppeteer...');

  const options = safeLaunchOptions();
  let browser: puppeteer.Browser | undefined;
  let attempt = 1;
  while (!browser) {
    try {
      browser = await puppeteer.launch(options);
      console.log('Launched Puppeteer');
    } catch (err) {
      if (attempt === 5) {
        console.error(`Puppeteer failed to launch after 5 attempts`);
        throw err;
      }
      console.warn('Puppeteer failed to launch (will retry):');
      console.warn(err);
      attempt++;
    }
  }

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

  const url = `http://${SERVER_HOST}:${port}`;
  console.log(`Loading ${url} in puppeteer...`);
  await page.goto(url);
  console.log('Page loaded');

  await page.close();
  await browser.close();
  await new Promise(resolve => server.close(resolve));

  if (error) {
    throw error;
  }
}
