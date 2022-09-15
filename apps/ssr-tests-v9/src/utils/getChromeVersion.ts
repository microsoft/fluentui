import { launchBrowser } from './launchBrowser';

export async function getChromeVersion(): Promise<number> {
  const browser = await launchBrowser();

  // includes browser name, example: HeadlessChrome/103.0.5058.0
  const rawVersion = await browser.version();
  const version = rawVersion.split('/')[1].split('.')[0];

  await browser.close();

  return parseInt(version, 10);
}
