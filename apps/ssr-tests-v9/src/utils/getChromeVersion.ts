import { isCI } from 'ci-info';
import { launchBrowser } from './launchBrowser';

/**
 * https://github.com/puppeteer/puppeteer/blob/main/versions.js
 */
const CHROMIUM_VERSION = 'HeadlessChrome/110.0.5479.0';
const staticVersion = normalizeChromiumVersion(CHROMIUM_VERSION);

export async function getChromeVersion(): Promise<number> {
  // this is a temporary solution to test if lanunching browser only once will mitigate TIMEOUT ISSUES ON CI
  if (isCI) {
    return staticVersion;
  }

  const browser = await launchBrowser();
  const version = normalizeChromiumVersion(await browser.version());
  await browser.close();

  if (version !== staticVersion) {
    throw new Error(
      `puppeteer uses different Chromium version!
      puppeteer: ${version} , chromium_version constant: ${staticVersion}

      Please update CHROMIUM_VERSION constant to match puppeteer installed version https://github.com/puppeteer/puppeteer/blob/main/versions.js.`,
    );
  }

  return version;
}

/**
 *
 * @param value - includes browser name, example: HeadlessChrome/103.0.5058.0
 * @returns
 */
function normalizeChromiumVersion(value: string) {
  return Number(value.split('/')[1].split('.')[0]);
}
