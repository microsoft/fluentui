import * as puppeteer from 'puppeteer';

describe('Focusing the FTZ', async () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('http://localhost:4322/#examples/focustrapzone');
  });

  afterAll(async () => {
    await browser.close();
  });

  it('goes to previously focused element when focusing the FTZ', async () => {
    // using 'Simple Box' example
    const trapZone = (await page.$$('.ExampleCard-example'))[0];

    // activate the trapzone by clicking the first button, 'Go to Trap Zone'
    await trapZone.$eval('button[role=switch]', (b: any) => b.click());

    // Manually focusing FTZ when FTZ has never
    // had focus within should go to 1st focusable inner element.
    await trapZone.focus();
    expect(await trapZone.$eval('input', (input: any) => document.activeElement === input)).toBeTruthy();

    // Focus inside the trap zone, not the first element.
    trapZone.$eval('button.ms-Link', (link: any) => link.focus());
    expect(await trapZone.$eval('button.ms-Link', (link: any) => document.activeElement === link)).toBeTruthy();

    // Focus outside the trap zone
    page.evaluate(() => document.body.focus());
    expect(await page.evaluate(() => document.activeElement === document.body));

    // Manually focusing FTZ should return to originally focused inner element.
    await trapZone.focus();
    expect(await trapZone.$eval('button.ms-Link', (link: any) => document.activeElement === link)).toBeTruthy();

    // Cleanup
    // turn off the zone
    await trapZone.$eval('button[role=switch]', (b: any) => b.click());
  });
});
