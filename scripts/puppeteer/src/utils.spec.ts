import * as puppeteer from 'puppeteer';

import { launch, visitUrl } from './utils';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

describe(`utils`, () => {
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(noop);
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(noop);
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(noop);
  });

  describe(`#launch`, () => {
    function setup() {
      const puppeteerLaunchSpy = jest.spyOn(puppeteer, 'launch').mockImplementation(_options => {
        return Promise.resolve({} as puppeteer.Browser);
      });

      return { puppeteerLaunchSpy };
    }

    it('should call .launch() 5 times before a failure', async () => {
      const { puppeteerLaunchSpy } = setup();
      puppeteerLaunchSpy.mockImplementation(options => {
        return Promise.reject(new Error('browser wont launch - mock'));
      });

      await expect(launch()).rejects.toMatchInlineSnapshot(`[Error: browser wont launch - mock]`);
      expect(puppeteerLaunchSpy).toHaveBeenCalledTimes(5);

      expect(consoleWarnSpy.mock.calls.flat()).toMatchInlineSnapshot(`
        Array [
          "puppeteer: launch failed (will retry 4 more times)",
          [Error: browser wont launch - mock],
          "puppeteer: launch failed (will retry 3 more times)",
          [Error: browser wont launch - mock],
          "puppeteer: launch failed (will retry 2 more times)",
          [Error: browser wont launch - mock],
          "puppeteer: launch failed (will retry 1 more times)",
          [Error: browser wont launch - mock],
        ]
      `);
    });

    it('should call .launch once if successful', async () => {
      const { puppeteerLaunchSpy } = setup();

      await expect(launch()).resolves.not.toBeUndefined();
      expect(puppeteerLaunchSpy).toHaveBeenCalledTimes(1);

      expect(consoleLogSpy.mock.calls.flat()[0]).toEqual(
        expect.stringContaining('puppeteer: launching with settings: {'),
      );
      expect(consoleLogSpy.mock.calls.flat()[1]).toMatchInlineSnapshot(`"puppeteer: launched..."`);
    });
  });

  describe('#visitUrl', () => {
    function setup() {
      const pageMock = {
        goto: jest.fn(),
      };

      return { pageMock };
    }

    it('should call .goto() 5 times before a failure', async () => {
      expect.assertions(4);

      const { pageMock } = setup();
      pageMock.goto.mockImplementation(() => Promise.reject(new Error('page wont open - mock')));

      await expect(
        visitUrl(pageMock as unknown as puppeteer.Page, 'https://localhost:8080'),
      ).rejects.toMatchInlineSnapshot(`[Error: page wont open - mock]`);

      expect(consoleWarnSpy.mock.calls.flat()).toMatchInlineSnapshot(`
              Array [
                "puppeteer: failed to navigate to a page (will retry 4 more times)...",
                [Error: page wont open - mock],
                "puppeteer: failed to navigate to a page (will retry 3 more times)...",
                [Error: page wont open - mock],
                "puppeteer: failed to navigate to a page (will retry 2 more times)...",
                [Error: page wont open - mock],
                "puppeteer: failed to navigate to a page (will retry 1 more times)...",
                [Error: page wont open - mock],
              ]
          `);

      expect(consoleErrorSpy.mock.calls.flat()).toMatchInlineSnapshot(`
              Array [
                "puppeteer: failed to navigate to a page after 5 attempts...",
              ]
          `);
      expect(pageMock.goto).toHaveBeenCalledTimes(5);
    });

    it('should call .goto once if successful', async () => {
      expect.assertions(3);

      const { pageMock } = setup();

      await expect(visitUrl(pageMock as unknown as puppeteer.Page, 'https://localhost:8080')).resolves.toBeUndefined();
      expect(pageMock.goto).toHaveBeenCalledTimes(1);

      expect(consoleLogSpy.mock.calls.flat()).toMatchInlineSnapshot(`
              Array [
                "puppeteer: loading url \\"https://localhost:8080\\"...",
                "puppeteer: url loaded...",
              ]
          `);
    });
  });
});
