import { launch } from 'puppeteer';

type LaunchOptions = NonNullable<Parameters<typeof launch>[0]>;

/** Common set of args to be passed to Chromium. */
const chromiumArgs = [
  // Workaround for newPage hang in CircleCI: https://github.com/GoogleChrome/puppeteer/issues/1409#issuecomment-453845568
  process.env.TF_BUILD && '--single-process',
].filter(Boolean) as NonNullable<LaunchOptions['args']>;

export const safeLaunchOptions = (launchOptions?: LaunchOptions): LaunchOptions => {
  const mergedChromiumArgs = [...((launchOptions && launchOptions.args) || []), ...chromiumArgs];

  return Object.assign({}, launchOptions, { args: mergedChromiumArgs });
};
