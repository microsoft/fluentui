import { chromium } from 'playwright';

export type ChromiumLaunchOptions = NonNullable<Parameters<typeof chromium.launch>[0]>;
