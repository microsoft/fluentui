import { expect, Locator, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

test.describe('Rating Display', () => {
  let element: Locator;
  let root: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-rating-display--rating-display'));
    await page.waitForFunction(() => customElements.whenDefined('fluent-rating-display'));

    element = page.locator('fluent-rating-display');
    root = page.locator('#root');
  });

  test('should set the default attributes', async ({ page }) => {
    await expect(element).toBeVisible();
    await expect(element).toHaveJSProperty('max', 5);
    await expect(element).not.toHaveJSProperty('compact', '');
    await expect(page.locator('.count')).toBeHidden();
  });

  test('should set the correct accessibility attributes', async ({ page }) => {
    await root.evaluate(node => {
      node.innerHTML = `
            <fluent-rating-display value="3.5" count="100"></fluent-rating-display>
        `;
    });

    await expect(element).toHaveAttribute('role', 'img');
    await expect(element).toHaveAttribute('aria-labelledby', /rating-display-\d*-value rating-display-\d*-count/);
    await expect(page.locator('svg').last()).toHaveAttribute('aria-hidden', 'true');
    await expect(page.locator('.value')).toHaveAttribute('aria-hidden', 'true');
    await expect(page.locator('.count')).toHaveAttribute('aria-hidden', 'true');
  });
});
