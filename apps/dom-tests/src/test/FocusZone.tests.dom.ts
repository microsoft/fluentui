import * as puppeteer from 'puppeteer';

describe('FocusZone', () => {
  let browser: any;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('can move focus from container to first item when added', async () => {
    // Arrange
    const page = await browser.newPage();
    await page.goto('http://localhost:4322/#/example1');

    // Act
    // 'Nesting FocusZons in list rows'
    const focusZone = await page.$('#fz');
    await focusZone.focus();

    // Assert
    const button = await page.$('#a');
    expect(await getActiveElementText(page)).toBe(button);
  });
});

function getActiveElementText(page: puppeteer.Page): Promise<string> {
  return page.evaluate(() => {
    const activeElement = document.activeElement;
    return activeElement ? (activeElement as any).innerText : '';
  });
}
