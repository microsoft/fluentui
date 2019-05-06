import * as puppeteer from 'puppeteer';

describe('Focusing the FTZ', async () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('http://localhost:4322/#/FocusTrapZone.example1');
  });

  afterAll(async () => {
    await browser.close();
  });

  it('goes to previously focused element when focusing the FTZ', async () => {
    // using 'Simple Box' example
    const trapZone = await page.$('#fz');

    // Manually focusing FTZ when FTZ has never
    // had focus within should go to 1st focusable inner element.
    await trapZone.focus();
    expect(await trapZone.$eval('.f', (elem: any) => document.activeElement === elem)).toBeTruthy();

    // Focus inside the trap zone, not the first element.
    trapZone.$eval('.b', (elem: any) => elem.focus());
    expect(await trapZone.$eval('.b', (elem: any) => document.activeElement === elem)).toBeTruthy();

    // Focus outside the trap zone
    page.$eval('.z', (elem: any) => elem.focus());
    expect(await page.$eval('.z', (elem: any) => document.activeElement === elem)).toBeTruthy();

    // Manually focusing FTZ should return to originally focused inner element.
    await trapZone.focus();
    expect(await trapZone.$eval('.b', (elem: any) => document.activeElement === elem)).toBeTruthy();
  });
});
