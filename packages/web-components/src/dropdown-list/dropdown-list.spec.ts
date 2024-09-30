import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import type { DropdownList } from './dropdown-list.js';

test.describe('DropdownList', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-dropdown--dropdown'));
    await page.waitForFunction(() =>
      Promise.all([
        customElements.whenDefined('fluent-dropdown'),
        customElements.whenDefined('fluent-dropdown-list'),
        customElements.whenDefined('fluent-option'),
      ]),
    );
  });

  test('should have `popover` attribute', async ({ page }) => {
    const list = page.locator('fluent-dropdown-list');

    await page.setContent(/* html */ `
      <fluent-dropdown-list></fluent-dropdown-list>
    `);

    await expect(list).toHaveAttribute('popover', 'auto');
  });

  test('should have `role` as `listbox` and `ariaMultiSelectable` as `false` by default', async ({ page }) => {
    const list = page.locator('fluent-dropdown-list');

    await page.setContent(/* html */ `
      <fluent-dropdown-list></fluent-dropdown-list>
    `);

    await expect(list).toHaveJSProperty('elementInternals.role', 'listbox');
    await expect(list).toHaveJSProperty('elementInternals.ariaMultiSelectable', 'false');
  });

  test('should have `ariaMultiSelectable` set as `true` with `multiple`', async ({ page }) => {
    const list = page.locator('fluent-dropdown-list');

    await page.setContent(/* html */ `
      <fluent-dropdown-list multiple></fluent-dropdown-list>
    `);

    await expect(list).toHaveJSProperty('elementInternals.ariaMultiSelectable', 'true');
  });

  test('should change `ariaMultiSelectable` when `multiple` changed', async ({ page }) => {
    const list = page.locator('fluent-dropdown-list');

    await page.setContent(/* html */ `
      <fluent-dropdown-list></fluent-dropdown-list>
    `);

    await expect(list).toHaveJSProperty('elementInternals.ariaMultiSelectable', 'false');

    await list.evaluate((node: DropdownList) => {
      node.multiple = true;
    });

    await expect(list).toHaveJSProperty('elementInternals.ariaMultiSelectable', 'true');
  });

  test('should emit `input` event when options changed', async ({ page }) => {
    const list = page.locator('fluent-dropdown-list');

    await page.setContent(/* html */ `
        <fluent-dropdown-list></fluent-dropdown-list>
    `);

    const [wasInput] = await Promise.all([
      list.evaluate(
        node => new Promise(resolve => node.addEventListener('input', () => resolve(true), { once: true })),
      ),
      list.evaluate(node => {
        const option1 = document.createElement('fluent-option');
        const option2 = document.createElement('fluent-option');
        node.append(option1, option2);
      }),
    ]);

    expect(wasInput).toBe(true);
  });
});
