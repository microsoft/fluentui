import { LaunchOptions } from 'puppeteer';

/** Common set of args to be passed to Chromium. */
const chromiumArgs: LaunchOptions['args'] = [
  // Workaround for newPage hang in CircleCI: https://github.com/GoogleChrome/puppeteer/issues/1409#issuecomment-453845568
  process.env.TF_BUILD && '--single-process',
].filter(Boolean);

export const safeLaunchOptions = (launchOptions?: LaunchOptions) => {
  const mergedChromiumArgs = [...((launchOptions && launchOptions.args) || []), ...chromiumArgs];

  return Object.assign({}, launchOptions, { args: mergedChromiumArgs });
};
