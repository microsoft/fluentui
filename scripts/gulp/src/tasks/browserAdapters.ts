import { spawn, spawnSync } from 'child_process';
import * as net from 'net';

import { launch } from '@fluentui/scripts-puppeteer';
import CDP from 'chrome-remote-interface';

export type Page = {
  executeJavaScript: (code: string) => Promise<unknown>;
  close: () => Promise<void>;
};

export type Browser = {
  openPage: (url: string) => Promise<Page>;

  close: () => Promise<void>;
};

export async function createChrome(): Promise<Browser> {
  const browser = await launch();

  console.log(`Chromium version: ${await browser.version()}`);

  return {
    openPage: async url => {
      const page = await browser.newPage();

      await page.goto(url);

      return {
        executeJavaScript: async code => {
          return page.evaluate(code);
        },
        close: () => page.close(),
      };
    },
    close: () => browser.close(),
  };
}

async function checkDevtoolsAvailability(host: string, port: number, timeout: number): Promise<boolean> {
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
      resolve(undefined);
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

export async function createElectron(electronPath: string): Promise<Browser> {
  const electronVersion = spawnSync(electronPath, ['-v'], {
    encoding: 'utf8',
  }).stdout.trim();
  const devtoolsPort = 9222;

  console.log(`Electron version: ${electronVersion}`);

  return {
    openPage: async url => {
      const electronProcess = spawn(electronPath, [`--remote-debugging-port=${devtoolsPort}`]);
      let cdp: CDP.Client;

      try {
        await waitUntilDevtoolsAvailable('localhost', devtoolsPort);
        cdp = await CDP({ port: devtoolsPort });

        await cdp.Page.enable();
        await cdp.Runtime.enable();

        await cdp.Page.navigate({ url });
        // @ts-expect-error - we use 0.30.0 types with 0.28.2 package version so the API might have changed ?
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
    close: () => Promise.resolve(),
  };
}
