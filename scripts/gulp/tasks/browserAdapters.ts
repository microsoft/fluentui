import { spawn, spawnSync } from 'child_process';
import CDP from 'chrome-remote-interface';
import electron from 'electron';
import puppeteer from 'puppeteer';
import * as net from 'net';

import { safeLaunchOptions } from '../../puppeteer/puppeteer.config';

const DEFAULT_ELECTRON_PATH = (electron as unknown) as string;

export type Page = {
  executeJavaScript: <R>(code: string) => Promise<R>;
  close: () => Promise<void>;
};

export type Browser = {
  openPage: (url: string) => Promise<Page>;

  close: () => Promise<void>;
};

export async function createChrome(): Promise<Browser> {
  const browser = await puppeteer.launch(safeLaunchOptions());
  console.log(`Chromium version: ${await browser.version()}`);

  return {
    openPage: async url => {
      const page = await browser.newPage();

      await page.goto(url);

      return {
        executeJavaScript: async code => {
          return page.evaluate(code);
        },
        close: async () => page.close(),
      };
    },
    close: async () => browser.close(),
  };
}

async function checkDevtoolsAvailability(host, port, timeout): Promise<boolean> {
  const promise = new Promise((resolve, reject) => {
    const socket = new net.Socket();

    const onError = () => {
      socket.destroy();
      reject();
    };

    socket.setTimeout(timeout);
    socket.once('error', onError);
    socket.once('timeout', onError);

    socket.connect(port, host, () => {
      socket.end();
      resolve();
    });
  });

  try {
    await promise;
    return true;
  } catch (_) {
    return false;
  }
}

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitUntilDevtoolsAvailable(host = 'localhost', port = 9222, tries = 10) {
  while (tries > 0) {
    if (await checkDevtoolsAvailability(host, port, 100)) {
      return true;
    }

    await wait(200);
    tries--;
  }

  throw new Error('A browser process started, but Devtools are not available');
}

export async function createElectron(electronPath: string = DEFAULT_ELECTRON_PATH): Promise<Browser> {
  const electronVersion = spawnSync(electronPath, ['-v'], {
    encoding: 'utf8',
  }).stdout.trim();
  const devtoolsPort = 9222;

  console.log(`Electron version: ${electronVersion}`);

  return {
    openPage: async url => {
      const electronProcess = spawn(electronPath, [`--remote-debugging-port=${devtoolsPort}`]);
      let cdp;

      try {
        await waitUntilDevtoolsAvailable('localhost', devtoolsPort);
        cdp = await CDP({ port: devtoolsPort });

        await cdp.Page.enable();
        await cdp.Runtime.enable();

        await cdp.Page.navigate({ url });
        await cdp.Page.loadEventFired();
      } catch (e) {
        electronProcess.kill('SIGKILL');
        throw e;
      }

      return {
        executeJavaScript: async code => {
          const { result } = await cdp.Runtime.evaluate({ expression: code, awaitPromise: true, returnByValue: true });

          return result.value;
        },
        close: async () => {
          electronProcess.kill('SIGKILL');
          await cdp.close();
        },
      };
    },

    close: async () => {},
  };
}
