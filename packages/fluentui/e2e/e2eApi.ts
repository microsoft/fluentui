import config from '@uifabric/build/config';
import { Page, Viewport } from 'puppeteer';
import * as path from 'path';
import * as _ from 'lodash';

const serverUrl = `http://${config.server_host}:${config.e2e_port}`;

export const exampleUrlTokenFromFilePath = (filePath: string) => {
  const testName = path
    .basename(filePath)
    .replace(/^(.+)-test.tsx?$/, '$1')
    .replace(/^(.+)-example.tsx?$/, '$1');

  return _.kebabCase(testName);
};

type E2EKeys =
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'End'
  | 'Enter'
  | 'Escape'
  | 'Home'
  | 'PageDown'
  | 'PageUp'
  | 'Tab'
  | 'F'
  | 'O';

const PUPPETEER_ACTION_TIMEOUT = 10 * 1000;

export class E2EApi {
  constructor(private readonly page: Page) {}

  public goto = async (docsUrl: string, waitForSelector: string) => {
    await this.page.goto(`${serverUrl}/${docsUrl.replace(/^\//, '')}`);
    await this.page.waitForSelector(waitForSelector, { timeout: 30 * 1000 });
  };

  public gotoTestCase = async (testFilePath: string, waitForSelector: string) => {
    const testCaseUrl = `/${exampleUrlTokenFromFilePath(testFilePath)}`;
    await this.goto(testCaseUrl, waitForSelector);
  };

  public getElement = async (selector: string) => {
    return await this.page.waitForSelector(selector, { timeout: PUPPETEER_ACTION_TIMEOUT });
  };

  public hover = async (selector: string) => {
    return await this.page.hover(selector);
  };

  public hasComputedStyle = async (
    selector: string,
    property: keyof CSSStyleDeclaration,
    value: string,
  ): Promise<void> => {
    await this.page.waitForFunction(
      (selector, property, value) => {
        return window.getComputedStyle(document.querySelector(selector))[property] === value;
      },
      { timeout: PUPPETEER_ACTION_TIMEOUT },
      selector,
      property,
      value,
    );
  };

  public hasPropertyValue = async (selector: string, property: string, value: number | string): Promise<void> => {
    await this.page.waitForFunction(
      (selector, property, value) => {
        return document.querySelector(selector)[property] === value;
      },
      { timeout: PUPPETEER_ACTION_TIMEOUT },
      selector,
      property,
      value,
    );
  };

  public expectCount = async (selector: string, count: number): Promise<void> => {
    await this.page.waitForFunction(
      (selector, count) => {
        return document.querySelectorAll(selector).length === count;
      },
      { timeout: PUPPETEER_ACTION_TIMEOUT },
      selector,
      count,
    );
  };

  public exists = async (selector: string): Promise<void> => {
    await this.page.waitForSelector(selector, { timeout: PUPPETEER_ACTION_TIMEOUT });
  };

  public expectHidden = async (selector: string): Promise<void> => {
    await this.page.waitForSelector(selector, { hidden: true, timeout: PUPPETEER_ACTION_TIMEOUT });
  };

  public clickOn = async (selector: string): Promise<void> => {
    await (await this.getElement(selector)).click();
  };

  public expectTextOf = async (selector: string, text: string): Promise<void> => {
    await this.page.waitForFunction(
      (selector, text) => {
        return document.querySelector(selector).innerText === text;
      },
      { timeout: PUPPETEER_ACTION_TIMEOUT },
      selector,
      text,
    );
  };

  public focusOn = async (selector: string): Promise<void> => {
    await (await this.getElement(selector)).focus();
  };

  public isFocused = async (selector: string): Promise<void> => {
    await this.page.waitForFunction(
      selector => {
        const activeElement = document.activeElement;
        const selectorElement = document.querySelector(selector);

        return activeElement === selectorElement;
      },
      { timeout: PUPPETEER_ACTION_TIMEOUT },
      selector,
    );
  };

  public waitForSelectorAndPressKey = async (
    selector: string,
    key: E2EKeys,
    modifier?: 'Control' | 'Shift',
  ): Promise<void> => {
    await this.getElement(selector);

    if (modifier) {
      await this.page.keyboard.down(modifier);
    }

    await this.page.keyboard.press(key);

    if (modifier) {
      await this.page.keyboard.up(modifier);
    }
  };

  public resizeViewport = async (size: Partial<Viewport>): Promise<void> => {
    const { height, width } = this.page.viewport();
    await this.page.setViewport({ height, width, ...size });
  };

  // Once we update puppeteer we should replace this by using https://pptr.dev/#?product=Puppeteer&version=v5.2.1&show=api-mousewheeloptions
  public simulatePageMove = async (): Promise<void> => {
    await this.page.evaluate(_ => {
      const type = 'move';
      const event = document.createEvent('Event') as TouchEvent;
      event.initEvent(`touch${type}`, true, true);

      document.dispatchEvent(event);
    });
  };

  public wait = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
}
