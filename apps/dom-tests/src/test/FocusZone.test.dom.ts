import * as puppeteer from 'puppeteer';

describe('FocusZone', () => {
  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('can move focus from container to first item when added', async () => {
    // Arrange
    const page = await browser.newPage();
    await page.goto('http://localhost:4322/#/FocusZone.example1');

    // Act
    // 'Nesting FocusZons in list rows'
    const focusZone = await page.$('#fz');
    await focusZone!.focus();

    // Assert
    expect(await page.$eval('#a', (button: Element) => document.activeElement === button));
  });
});
