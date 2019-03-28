import * as puppeteer from 'puppeteer';

describe('FocusZone', () => {
  it('can use arrows vertically', async () => {
    // Arrange
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://localhost:4322/#examples/focuszone');

    // Act
    await page.$eval('.ms-FocusZoneListExample > div', (elem: any) => elem.focus());

    // Assert
    expect((await getActiveElementText(page)).indexOf('Item-1')).toBeTruthy();

    // Act
    await page.keyboard.press('ArrowDown');

    // Assert
    expect((await getActiveElementText(page)).indexOf('Item-2')).toBeTruthy();

    // Cleanup
    await browser.close();
  });
});

function getActiveElementText(page: puppeteer.Page): Promise<string> {
  return page.evaluate(() => {
    const activeElement = document.activeElement;
    return activeElement ? (activeElement as any).innerText : '';
  });
}
