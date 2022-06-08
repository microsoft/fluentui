import { launchBrowser } from './launchBrowser';

export async function getChromeVersion(): Promise<string> {
  const browser = await launchBrowser();

  const rawVersion = await browser.version();
  const version = rawVersion.split('/')[1].split('.')[0];

  await browser.close();

  return version;
}
