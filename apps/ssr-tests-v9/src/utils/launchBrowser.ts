import { Browser, launch } from 'puppeteer';

export async function launchBrowser(): Promise<Browser> {
  let browser;
  let attempt = 1;

  while (!browser) {
    try {
      browser = await launch();
    } catch (err) {
      if (attempt === 5) {
        console.log(`Failed to launch a browser after 5 attempts...`);
        throw err;
      }

      console.log('A browser failed to start, retrying...');
      console.log(err);
      attempt++;
    }
  }

  return browser;
}
