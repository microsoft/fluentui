import { test } from '@playwright/test';
import { expect, fixtureURL, setDropdownPageContent } from '../helpers.tests.js';
import type { Option } from './option.js';

test.describe('Option', () => {
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

  test('should have `option` role', async ({ page }) => {
    const option = page.locator('fluent-option');

    await page.setContent(/* html */ `
      <fluent-option></fluent-option>
    `);

    await expect(option).toHaveJSProperty('elementInternals.role', 'option');
  });

  test('should have `name` the same as its connected combobox', async ({ page }) => {
    const option = page.locator('fluent-option');

    await setDropdownPageContent(
      page,
      /* html */ `
      <fluent-dropdown list="list" name="dropdown"></fluent-dropdown>
      <fluent-dropdown-list id="list">
        <fluent-option></fluent-option>
      </fluent-dropdown-list>
    `,
    );

    await expect(option).toHaveAttribute('name', 'dropdown');
  });

  test('should use text content as label if no `label` attribute provided', async ({ page }) => {
    const option = page.locator('fluent-option');

    await page.setContent(/* html */ `
      <fluent-option>Label</flunet-option>
    `);

    await expect(option).toHaveJSProperty('text', 'Label');
    await expect(option).toHaveJSProperty('label', 'Label');
  });

  test('should use `label` attribute’s value if provided', async ({ page }) => {
    const option = page.locator('fluent-option');

    await page.setContent(/* html */ `
      <fluent-option label="Label">Text</flunet-option>
    `);

    await expect(option).toHaveJSProperty('text', 'Text');
    await expect(option).toHaveJSProperty('label', 'Label');
  });

  test('should have correct selected state', async ({ page }) => {
    const option = page.locator('fluent-option');

    await page.setContent(/* html */ `
      <fluent-option selected></fluent-option>
    `);

    await expect(option).toHaveJSProperty('checked', true);
    await expect(option).toHaveJSProperty('selected', true);
    await expect(option).toHaveJSProperty('elementInternals.ariaSelected', 'true');

    await option.evaluate((node: Option) => {
      node.selected = false;
    });

    await expect(option).toHaveJSProperty('checked', false);
    await expect(option).toHaveJSProperty('elementInternals.ariaSelected', 'false');
  });

  test('should set `aria-active` custom state when `active` property is changed', async ({ page }) => {
    const option = page.locator('fluent-option');

    await page.setContent(/* html */ `
      <fluent-option></fluent-option>
    `);

    await expect(option).not.toHaveCustomState('aria-active');

    await option.evaluate((node: Option) => {
      node.active = true;
    });

    await expect(option).toHaveCustomState('aria-active');

    await option.evaluate((node: Option) => {
      node.active = false;
    });

    await expect(option).not.toHaveCustomState('aria-active');
  });

  test('should reset its value if the associated form is reset', async ({ page }) => {
    const option = page.locator('fluent-option');

    await page.setContent(/* html */ `
      <form>
        <fluent-option name="foo" value="bar" selected></flunet-option>
      </form>
    `);

    async function getOptionFormValue() {
      return await page.evaluate(() => {
        const data = new FormData(document.forms[0]);
        return data.get('foo');
      });
    }

    expect(await getOptionFormValue()).toBe('bar');

    await option.evaluate((node: Option) => {
      node.selected = false;
    });

    expect(await getOptionFormValue()).toBe(null);

    await page.evaluate(() => {
      document.forms[0].reset();
    });

    expect(await getOptionFormValue()).toBe('bar');
  });
});
