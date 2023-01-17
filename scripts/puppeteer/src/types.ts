import * as puppeteer from 'puppeteer';
export type LaunchOptions = NonNullable<Parameters<typeof puppeteer.launch>[0]>;
