import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

test.describe('TabPanel', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-tab-panel');

    root = page.locator('#root');

    await page.goto(fixtureURL('components-tabs--tabs-default'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should have a role of `tabpanel`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-tab-panel></fluent-tab-panel>
            `;
    });

    await expect(element).toHaveAttribute('role', 'tabpanel');
  });

  test('should have a slot attribute of `tabpanel`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-tab-panel></fluent-tab-panel>
            `;
    });

    await expect(element).toHaveAttribute('slot', 'tabpanel');
  });
});
