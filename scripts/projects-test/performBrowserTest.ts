import config from '../config';
import { safeLaunchOptions } from '../puppeteer/puppeteer.config';
import express from 'express';
import http from 'http';
import portfinder from 'portfinder';
import puppeteer from 'puppeteer';

function startServer(publicDirectory: string, listenPort: number) {
  return new Promise<http.Server>((resolve, reject) => {
    try {
      const app = express();
      app.use(express.static(publicDirectory));

      const server = app.listen(listenPort, config.server_host, e => {
        if (e) return reject(e);

        resolve(server);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function performBrowserTest(publicDirectory: string) {
  const listenPort = await portfinder.getPortPromise();
  console.log(`Starting server on port ${listenPort} from directory ${publicDirectory}`);
  const server = await startServer(publicDirectory, listenPort);
  console.log('Started server. Launching Puppeteer...');

  const options = safeLaunchOptions();
  let browser: puppeteer.Browser;
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

  const url = `http://${config.server_host}:${listenPort}`;
  console.log(`Loading ${url} in puppeteer...`);
  await page.goto(url);
  console.log('Page loaded');

  await page.close();
  await browser.close();
  await new Promise(resolve => server.close(resolve));

  if (error) throw error;
}
