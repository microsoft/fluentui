import { type Page, test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import type { DropdownList } from '../dropdown-list/dropdown-list.js';
import { DropdownAppearance, DropdownSize } from './dropdown.options.js';
import type { Dropdown } from './dropdown.js';

/**
 * Helper function to fix `Page#setContent()`. Because `setContent()` uses
 * `document.write()` internally, when the `<fluent-dropdown-list>` element
 * is written into the document, it may not have been connected, hence the
 * `<fluent-dropdown>` element wouldn’t be able to find the DropdownList
 * element based on the IDREF in the Dropdown’s `list` attribute.
 */
async function setPageContent(page: Page, content: string) {
  const dropdownLocator = page.locator('fluent-dropdown');
  await page.setContent(content);

  // Reassign value for Dropdown.list
  await dropdownLocator.evaluate((node: Dropdown) => {
    if (!node.list) {
      return;
    }
    const listId = node.list;
    node.list = '';
    node.list = listId;
  });
}

test.describe('Dropdown', () => {
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

  test('should have default `role` and `aria-expanded` values', async ({ page }) => {
    const element = page.locator('fluent-dropdown');

    await page.setContent(/* html */ `
      <fluent-dropdown></fluent-dropdown>
    `);

    await expect(element).toHaveJSProperty('elementInternals.role', 'combobox');
    await expect(element).toHaveJSProperty('elementInternals.ariaExpanded', 'false');
  });

  test('should set `disabled` state', async ({ page }) => {
    const element = page.locator('fluent-dropdown');

    await page.setContent(/* html */ `
      <fluent-dropdown disabled></fluent-dropdown>
    `);

    await expect(element).toHaveJSProperty('disabled', true);
    await expect(element).toHaveJSProperty('tabIndex', -1);
    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');

    await element.evaluate((node: Dropdown) => {
      node.disabled = false;
    });

    await expect(element).toHaveJSProperty('disabled', false);
    await expect(element).toHaveJSProperty('tabIndex', 0);
    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');
  });

  test('should set `placeholder`', async ({ page }) => {
    const element = page.locator('fluent-dropdown');

    await page.setContent(/* html */ `
      <fluent-dropdown placeholder="Select…"></fluent-dropdown>
    `);

    await expect(element).toHaveJSProperty('placeholder', 'Select…');
    await expect(element).toHaveText('Select…');
  });

  test('should set `required` state', async ({ page }) => {
    const element = page.locator('fluent-dropdown');

    await page.setContent(/* html */ `
      <fluent-dropdown required></fluent-dropdown>
    `);

    await expect(element).toHaveJSProperty('required', true);
    await expect(element).toHaveJSProperty('elementInternals.ariaRequired', 'true');

    await element.evaluate((node: Dropdown) => {
      node.required = false;
    });

    await expect(element).toHaveJSProperty('required', false);
    await expect(element).toHaveJSProperty('elementInternals.ariaRequired', 'false');
  });

  test('should return `type` based on `multiple`', async ({ page }) => {
    const element = page.locator('fluent-dropdown');

    await page.setContent(/* html */ `
      <fluent-dropdown></fluent-dropdown>
    `);

    await expect(element).toHaveJSProperty('type', 'select-one');

    await element.evaluate((node: Dropdown) => {
      node.multiple = true;
    });

    await expect(element).toHaveJSProperty('type', 'select-multiple');
  });

  test.describe('with DropdownList and Option', () => {
    test('should connect to the listbox element and return `options`', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const list = page.locator('fluent-dropdown-list');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one">One</fluent-option>
          <fluent-option value="two">Two</fluent-option>
          <fluent-option value="three">Three</fluent-option>
        </fluent-dropdown-list>
      `);

      await expect(dropdown).toHaveJSProperty('list', 'list');
      await expect(list).toHaveJSProperty('popover', 'auto');
      await expect(dropdown).toHaveJSProperty('length', 3);
      await expect(dropdown).toHaveAttribute('aria-controls', 'list');
    });

    test.skip('should reconnect when `list` property changes and return new `options`', async ({ page }) => {
    });

    test.skip('should return the number of options in the listbox', async ({ page }) => {
    });

    test('should set Option’s `multiple` state', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const list = page.locator('fluent-dropdown-list');
      const option = page.locator('fluent-option');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list" multiple></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option></fluent-option>
        </fluent-dropdown-list>
      `);

      await expect(dropdown).toHaveJSProperty('multiple', true);
      await expect(list).toHaveJSProperty('multiple', true);
      await expect(option).toHaveCustomState('multiple');

      await dropdown.evaluate((node: Dropdown) => {
        node.multiple = false;
      });

      await expect(dropdown).toHaveJSProperty('multiple', false);
      await expect(list).toHaveJSProperty('multiple', false);
      await expect(option).not.toHaveCustomState('mutliple');
    });

    test.skip('should apply `name` to Options', async ({ page }) => {});
    test.skip('should return `selectedOptions`', async ({ page }) => {});
    test.skip('should select the correct option when `value` is set', async ({ page }) => {});
    test.skip('should return the first selected option’s value with `value`', async ({ page }) => {});
    test.skip('should select the correct option when `selectedIndex` is set', async ({ page }) => {});
    test.skip('should return the first selected option’s index with `selectedIndex`', async ({ page }) => {});
  });

  test.describe('form associated', () => {
    test.skip('should return label elements', async ({ page }) => {});
    test.skip('should connect to the given `<form>` element', async ({ page }) => {});
    test.skip('should be disabled when the parent `<fieldset>` is disabled', async ({ page }) => {});
    test.describe('form reset', () => {
    });

    // .validity
    // .validationMessage
  });

  test.skip('showPicker()', async ({ page }) => {});
  test.describe('pointer interactions', () => {});
  test.describe('keyboard interactions', () => {});

  test.describe('input event', () => {});
  test.describe('change event', () => {});
});
