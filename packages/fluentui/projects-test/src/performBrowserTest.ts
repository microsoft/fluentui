import config from '@uifabric/build/config';
import { safeLaunchOptions } from '@uifabric/build/puppeteer/puppeteer.config';
import express from 'express';
import http from 'http';
import puppeteer from 'puppeteer';

function startServer(publicDirectory: string, listenPort: number) {
  return new Promise<http.Server>((resolve, reject) => {
    const app = express();
    app.use(express.static(publicDirectory));

    const server = app.listen(listenPort, config.server_host, e => {
      if (e) return reject(e);

      resolve(server);
    });
  });
}

export async function performBrowserTest(publicDirectory: string, listenPort: number) {
  const server = await startServer(publicDirectory, listenPort);

  const browser = await puppeteer.launch(safeLaunchOptions());
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

  await page.goto(`http://${config.server_host}:${listenPort}`);

  await page.close();
  await browser.close();
  await new Promise(resolve => server.close(resolve));

  if (error) throw error;
}
