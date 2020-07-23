import { spawn, spawnSync } from 'child_process';
import electron from 'electron';
import puppeteer from 'puppeteer';
import CDP from 'chrome-remote-interface';

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

  return {
    openPage: async url => {
      const page = await browser.newPage();

      await page.goto(url);

      return {
        executeJavaScript: async code => {
          return page.evaluate(code);
        },
        close: page.close,
      };
    },
    close: browser.close,
  };
}

export async function createElectron(electronPath: string = DEFAULT_ELECTRON_PATH): Promise<Browser> {
  const electronVersion = spawnSync(electronPath, ['-v'], {
    encoding: 'utf8',
  }).stdout.trim();

  console.log(`Electron version: ${electronVersion}`);

  return {
    openPage: async url => {
      const electronProcess = spawn(electronPath, ['--remote-debugging-port=9222']);
      let cdp;

      try {
        cdp = await CDP();

        await cdp.Network.enable();
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
