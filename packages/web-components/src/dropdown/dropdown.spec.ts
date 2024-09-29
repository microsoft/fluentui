import { type Page, test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
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
  const dropdownListLocator = page.locator('fluent-dropdown-list');
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

  // Reassign Options to Listbox
  await dropdownListLocator.evaluate(node => {
    const options = node.querySelectorAll('fluent-option');
    if (!options.length) {
      return;
    }

    const clonedOptions = Array.from(options)
        .map(option => option.cloneNode(true));
    node.replaceChildren(...clonedOptions);
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

  test('should instanciate imperatively', async ({ page }) => {
    const dropdown = page.locator('fluent-dropdown#foo');
    await page.evaluate(() => {
      const dropdown = document.createElement('fluent-dropdown') as Dropdown;
      dropdown.id = 'foo';
      dropdown.required = true;
      dropdown.disabled = true;
      dropdown.multiple = true;

      document.body.append(dropdown);
    });

    await expect(dropdown).toHaveJSProperty('id', 'foo');
    await expect(dropdown).toHaveJSProperty('required', true);
    await expect(dropdown).toHaveJSProperty('disabled', true);
    await expect(dropdown).toHaveJSProperty('multiple', true);
    await expect(dropdown).toHaveJSProperty('type', 'select-multiple');
  });

  test.describe('with DropdownList and Option', () => {
    test('should connect to the listbox and options elements', async ({ page }) => {
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

      const listElement = await list.evaluateHandle(node => node);

      await expect(dropdown).toHaveJSProperty('list', 'list');
      await expect(dropdown).toHaveJSProperty('length', 3);
      await expect(dropdown).toHaveJSProperty('options.length', 3);
      await expect(dropdown).toHaveAttribute('aria-controls', 'list');
      await expect(dropdown).toHaveJSProperty('listElement', listElement);
      await expect(list).toHaveJSProperty('popover', 'auto');
    });

    test('should set Listbox and Option’s `multiple` state', async ({ page }) => {
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

    test('should apply `name` to Options', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const options = page.locator('fluent-option');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list" name="foo"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option></fluent-option>
          <fluent-option></fluent-option>
          <fluent-option name="bar"></fluent-option>
        </fluent-dropdown-list>
      `);

      await expect(dropdown).toHaveAttribute('name', 'foo');
      await expect(options.nth(0)).toHaveJSProperty('name', 'foo');
      await expect(options.nth(1)).toHaveJSProperty('name', 'foo');
      await expect(options.nth(2)).toHaveJSProperty('name', 'bar');

      await dropdown.evaluate((node: Dropdown) => {
        node.name = 'baz';
      });

      await expect(options.nth(0)).toHaveJSProperty('name', 'baz');
      await expect(options.nth(1)).toHaveJSProperty('name', 'baz');
      await expect(options.nth(2)).toHaveJSProperty('name', 'bar');
    });

    test('should return the first selected option with `selectedOptions` in single select', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one" selected></fluent-option>
          <fluent-option value="two"></fluent-option>
          <fluent-option value="three" selected></fluent-option>
        </fluent-dropdown-list>
      `);

      const selectedOptionsValues = await dropdown.evaluate((node: Dropdown) => {
        return node.selectedOptions.map(option => option.value);
      });

      await expect(dropdown).toHaveJSProperty('selectedOptions.length', 1);
      expect(selectedOptionsValues).toStrictEqual(['one']);
    });

    test('should return the all selected options with `selectedOptions` in multiple select', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list" multiple></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one" selected></fluent-option>
          <fluent-option value="two"></fluent-option>
          <fluent-option value="three" selected></fluent-option>
        </fluent-dropdown-list>
      `);

      const selectedOptionsValues = await dropdown.evaluate((node: Dropdown) => {
        return node.selectedOptions.map(option => option.value);
      });

      await expect(dropdown).toHaveJSProperty('selectedOptions.length', 2);
      expect(selectedOptionsValues).toStrictEqual(['one', 'three']);
    });

    test('should select the correct option when `value` is set', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const options = page.locator('fluent-option');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one"></fluent-option>
          <fluent-option value="two"></fluent-option>
          <fluent-option value="three"></fluent-option>
        </fluent-dropdown-list>
      `);

      await expect(dropdown).toHaveJSProperty('value', '');

      await dropdown.evaluate((node: Dropdown) => {
        node.value = 'two';
      });

      await expect(dropdown).toHaveJSProperty('value', 'two');
      await expect(options.nth(1)).toHaveJSProperty('selected', true);

      await dropdown.evaluate((node: Dropdown) => {
        node.multiple = true;
        node.value = 'three';
      });

      await expect(dropdown).toHaveJSProperty('value', 'three');
      await expect(options.nth(1)).toHaveJSProperty('selected', false);
      await expect(options.nth(2)).toHaveJSProperty('selected', true);
      await expect(dropdown).toHaveJSProperty('selectedOptions.length', 1);

      await dropdown.evaluate((node: Dropdown) => {
        node.value = '';
      });

      await expect(options.nth(2)).toHaveJSProperty('selected', false);
      await expect(dropdown).toHaveJSProperty('selectedOptions.length', 0);
    });

    test('should return the first selected option’s value with `value`', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list" multiple></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one" selected></fluent-option>
          <fluent-option value="two"></fluent-option>
          <fluent-option value="three" selected></fluent-option>
        </fluent-dropdown-list>
      `);

      await expect(dropdown).toHaveJSProperty('value', 'one');
    });

    test('should select the correct option when `selectedIndex` is set', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const options = page.locator('fluent-option');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one"></fluent-option>
          <fluent-option value="two"></fluent-option>
          <fluent-option value="three"></fluent-option>
        </fluent-dropdown-list>
      `);

      await dropdown.evaluate((node: Dropdown) => {
        node.selectedIndex = 1;
      });

      await expect(options.nth(1)).toHaveJSProperty('selected', true);

      await dropdown.evaluate((node: Dropdown) => {
        node.multiple = true;
        node.selectedIndex = 2;
      });

      await expect(options.nth(1)).toHaveJSProperty('selected', false);
      await expect(options.nth(2)).toHaveJSProperty('selected', true);
      await expect(dropdown).toHaveJSProperty('selectedOptions.length', 1);

      await dropdown.evaluate((node: Dropdown) => {
        node.selectedIndex = -1;
      });

      await expect(options.nth(2)).toHaveJSProperty('selected', false);
      await expect(dropdown).toHaveJSProperty('selectedOptions.length', 0);
    });

    test('should return the first selected option’s index with `selectedIndex`', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list" multiple></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one"></fluent-option>
          <fluent-option value="two" selected></fluent-option>
          <fluent-option value="three" selected></fluent-option>
        </fluent-dropdown-list>
      `);

      await expect(dropdown).toHaveJSProperty('selectedIndex', 1);
    });

    test('should open the listbox when `showPicker()` is called', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const list = page.locator('fluent-dropdown-list');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list"></fluent-dropdown>
        <fluent-dropdown-list id="list"></fluent-dropdown-list>
      `);

      await expect(list).toBeHidden();

      await dropdown.evaluate((node: Dropdown) => {
        node.showPicker();
      });

      await expect(list).toBeVisible();

      // showPicker() should not toggle/close the list
      await dropdown.evaluate((node: Dropdown) => {
        node.showPicker();
      });

      await expect(list).toBeVisible();
    });
  });

  test.describe('form associated', () => {
    test('should return label elements', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const labels = page.locator('label');

      await page.setContent(/* html */ `
        <label for="dropdown">Dropdown</label>
        <fluent-dropdown id="dropdown"></fluent-dropdown>
        <label for="dropdown">Dropdown</label>
      `);

      const label1Element = await labels.nth(0).evaluate(node => node);
      const label2Element = await labels.nth(0).evaluate(node => node);
      const labelsValue = await dropdown.evaluate((el: Dropdown) => Array.from(el.labels));

      expect(labelsValue).toStrictEqual([label1Element, label2Element]);

      await expect(dropdown).not.toBeFocused();

      await labels.nth(1).click();

      await expect(dropdown).toBeFocused();
    });

    test('should connect to the given `<form>` element', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');

      await page.setContent(/* html */ `
        <form id="form1">
          <fluent-dropdown></fluent-dropdown>
        </form>
        <form id="form2"></form>
      `);

      await expect(dropdown).toHaveJSProperty('form.id', 'form1');

      await dropdown.evaluate((node: Dropdown) => {
        node.setAttribute('form', 'form2');
      });

      await expect(dropdown).toHaveJSProperty('form.id', 'form2');
    });
  });

  test.describe('validity and validation message', () => {
    test('should set `valueMissing` flag if required and no option is selected', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');

      await setPageContent(page, /* html */ `
        <fluent-dropdown required list="list"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one">One</fluent-option>
          <fluent-option value="two">Two</fluent-option>
          <fluent-option value="three">Three</fluent-option>
        </fluent-dropdown-list>
      `);

      await expect(dropdown).toHaveJSProperty('validity.valid', false);
      await expect(dropdown).toHaveJSProperty('validity.valueMissing', true);

      await dropdown.evaluate((node: Dropdown) => {
        node.selectedIndex = 1;
      });

      await expect(dropdown).toHaveJSProperty('validity.valid', true);
      await expect(dropdown).toHaveJSProperty('validity.valueMissing', false);

      await dropdown.evaluate((node: Dropdown) => {
        node.selectedIndex = -1;
        node.required = false;
      });

      await expect(dropdown).toHaveJSProperty('validity.valid', true);
      await expect(dropdown).toHaveJSProperty('validity.valueMissing', false);
    });

    test('should always be valid if disabled', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');

      await setPageContent(page, /* html */ `
        <fluent-dropdown disabled required list="list"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one">One</fluent-option>
          <fluent-option value="two">Two</fluent-option>
          <fluent-option value="three">Three</fluent-option>
        </fluent-dropdown-list>
      `);

      await expect(dropdown).toHaveJSProperty('validity.valid', true);

      await dropdown.evaluate((node: Dropdown) => {
        node.disabled = false;
      });

      await expect(dropdown).toHaveJSProperty('validity.valid', false);

      await dropdown.evaluate((node: Dropdown) => {
        node.disabled = true;
      });

      await expect(dropdown).toHaveJSProperty('validity.valid', true);
    });

    test('should set the correct validation messages', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');

      await setPageContent(page, /* html */ `
        <fluent-dropdown disabled required list="list"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one">One</fluent-option>
          <fluent-option value="two">Two</fluent-option>
          <fluent-option value="three">Three</fluent-option>
        </fluent-dropdown-list>
      `);

      await expect(dropdown).toHaveJSProperty('validationMessage', '');

      await dropdown.evaluate((node: Dropdown) => {
        node.disabled = false;
      });

      await expect(dropdown).toHaveJSProperty('validationMessage', 'Please fill out this field.');
    });
  });

  test.describe('pointer interactions', () => {
    test('should select the clicked option and close the dropdown without `multiple`', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const content = dropdown.locator('.content');
      const list = page.locator('fluent-dropdown-list');
      const options = page.locator('fluent-option');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one">One</fluent-option>
          <fluent-option value="two">Two</fluent-option>
          <fluent-option value="three">Three</fluent-option>
        </fluent-dropdown-list>
      `);

      await expect(list).toBeHidden();

      await dropdown.click();

      await expect(list).toBeVisible();

      await options.nth(1).click();

      await expect(list).toBeHidden();
      await expect(content).toHaveText('Two');
    });

    test('should select the clicked option and keep the dropdown with `multiple`', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const content = dropdown.locator('.content');
      const list = page.locator('fluent-dropdown-list');
      const options = page.locator('fluent-option');
      const outsideButton = page.locator('button');

      await setPageContent(page, /* html */ `
        <button>outside</button>
        <fluent-dropdown list="list" multiple></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one">One</fluent-option>
          <fluent-option value="two">Two</fluent-option>
          <fluent-option value="three">Three</fluent-option>
        </fluent-dropdown-list>
      `);

      await expect(list).toBeHidden();

      await dropdown.click();

      await expect(list).toBeVisible();

      await options.nth(1).click();

      await expect(list).toBeVisible();
      await expect(content).toHaveText('Two');

      await options.nth(2).click();

      await expect(content).toHaveText('Two, Three');

      await outsideButton.click();

      await expect(list).toBeHidden();
    });
  });

  test.describe('keyboard interactions', () => {
    test('should toggle the list by pressing Tab, Enter, Space, or ArrowDown', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const list = page.locator('fluent-dropdown-list');
      const options = page.locator('fluent-option');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one">One</fluent-option>
          <fluent-option value="two">Two</fluent-option>
          <fluent-option value="three">Three</fluent-option>
        </fluent-dropdown-list>
      `);

      await page.keyboard.press('Tab');

      await expect(dropdown).toBeFocused();
      await expect(list).toBeHidden();

      await page.keyboard.press('Enter');

      await expect(list).toBeVisible();

      await page.keyboard.press('Enter');

      await expect(list).toBeHidden();

      await page.keyboard.press(' ');

      await expect(list).toBeVisible();

      await page.keyboard.press(' ');

      await expect(list).toBeHidden();

      await page.keyboard.press('ArrowDown');

      await expect(dropdown).toBeFocused();
      await expect(list).toBeVisible();
      await expect(options.nth(0)).toHaveCustomState('aria-active');

      await page.keyboard.press('Tab');

      await expect(list).toBeHidden();
      await expect(dropdown).not.toBeFocused();
    });

    test('should close the list by pressing Escape', async ({ page }) => {
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

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await expect(list).toBeVisible();

      await page.keyboard.press('Escape');

      await expect(dropdown).toBeFocused();
      await expect(list).toBeHidden();
    });

    test('should navigate with Home, End, ArrowDown, and ArrowUp keys', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const options = page.locator('fluent-option');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one">One</fluent-option>
          <fluent-option value="two">Two</fluent-option>
          <fluent-option value="three">Three</fluent-option>
        </fluent-dropdown-list>
      `);

      const option1Id = await options.nth(0).evaluate(node => node.id);
      const option2Id = await options.nth(1).evaluate(node => node.id);
      const option3Id = await options.nth(2).evaluate(node => node.id);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await expect(dropdown).toHaveAttribute('aria-activedescendant', option1Id);

      await page.keyboard.press('ArrowDown');

      await expect(options.nth(1)).toHaveCustomState('aria-active');
      await expect(dropdown).toHaveAttribute('aria-activedescendant', option2Id);

      await page.keyboard.press('End');

      await expect(options.nth(2)).toHaveCustomState('aria-active');
      await expect(dropdown).toHaveAttribute('aria-activedescendant', option3Id);

      await page.keyboard.press('ArrowUp');

      await expect(options.nth(1)).toHaveCustomState('aria-active');
      await expect(dropdown).toHaveAttribute('aria-activedescendant', option2Id);

      await page.keyboard.press('Home');

      await expect(options.nth(0)).toHaveCustomState('aria-active');
      await expect(dropdown).toHaveAttribute('aria-activedescendant', option1Id);
    });

    test('should skip disabled options while navigating', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const options = page.locator('fluent-option');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one">One</fluent-option>
          <fluent-option value="two" disabled>Two</fluent-option>
          <fluent-option value="three">Three</fluent-option>
        </fluent-dropdown-list>
      `);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await page.keyboard.press('ArrowDown');

      await expect(options.nth(1)).not.toHaveCustomState('aria-active');
      await expect(options.nth(2)).toHaveCustomState('aria-active');
    });

    test('should select option by pressing Enter or Space', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const options = page.locator('fluent-option');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one">One</fluent-option>
          <fluent-option value="two">Two</fluent-option>
          <fluent-option value="three">Three</fluent-option>
        </fluent-dropdown-list>
      `);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      await expect(options.nth(1)).toHaveJSProperty('selected', true);
      await expect(dropdown).toHaveJSProperty('value', 'two');

      await dropdown.evaluate((node: Dropdown) => {
        node.multiple = true;
      });

      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press(' ');

      await expect(options.nth(0)).toHaveJSProperty('selected', true);
      await expect(options.nth(1)).toHaveJSProperty('selected', true);
    });
  });

  test('should emit `input` event when an opton is selected', async ({ page }) => {
    const dropdown = page.locator('fluent-dropdown');

    await setPageContent(page, /* html */ `
      <fluent-dropdown list="list"></fluent-dropdown>
      <fluent-dropdown-list id="list">
        <fluent-option value="one">One</fluent-option>
        <fluent-option value="two">Two</fluent-option>
        <fluent-option value="three">Three</fluent-option>
      </fluent-dropdown-list>
    `);

    const [wasInput] = await Promise.all([
      dropdown.evaluate(
        node => new Promise(resolve => node.addEventListener('input', () => resolve(true), { once: true })),
      ),
      dropdown.evaluate((node: Dropdown) => { node.value = 'one' }),
    ]);

    expect(wasInput).toBe(true);
  });

  test('should emit `change` event when value is changed', async ({ page }) => {
    const dropdown = page.locator('fluent-dropdown');

    await setPageContent(page, /* html */ `
      <fluent-dropdown list="list"></fluent-dropdown>
      <fluent-dropdown-list id="list">
        <fluent-option value="one" selected>One</fluent-option>
        <fluent-option value="two">Two</fluent-option>
        <fluent-option value="three">Three</fluent-option>
      </fluent-dropdown-list>
    `);

    const [wasChanged] = await Promise.all([
      dropdown.evaluate(
        node => new Promise(resolve => node.addEventListener('change', () => resolve(true), { once: true })),
      ),
      dropdown.evaluate((node: Dropdown) => { node.value = 'two' }),
    ]);

    expect(wasChanged).toBe(true);
  });

  test.describe('Anchor Positioning', () => {
    test('should have anchor name that’s associated with its list', async ({ page }) => {
      const dropdown = page.locator('fluent-dropdown');
      const list = page.locator('fluent-dropdown-list');

      await setPageContent(page, /* html */ `
        <fluent-dropdown list="list" placeholder="Select…"></fluent-dropdown>
        <fluent-dropdown-list id="list">
          <fluent-option value="one">One</fluent-option>
          <fluent-option value="two">Two</fluent-option>
          <fluent-option value="three">Three</fluent-option>
        </fluent-dropdown-list>
      `);

      await expect(dropdown).toHaveAttribute('data-anchorid');
      const anchorId = await dropdown.getAttribute('data-anchorid');
      const anchorName = `--${anchorId}`;

      await expect(dropdown).toHaveCSS('anchor-name', anchorName);

      await dropdown.click();
      await list.waitFor({ state: 'visible' });

      const dropdownBoundingBox = await dropdown.boundingBox();
      const listBoundingBox = await list.boundingBox();
      const expectedListX = dropdownBoundingBox?.x ?? 0;
      const expectedListY = (dropdownBoundingBox?.y ?? 0) + (dropdownBoundingBox?.height ?? 0);

      expect(expectedListX).toEqual(listBoundingBox?.x);
      expect(expectedListY).toEqual(listBoundingBox?.y);
    });
  });
});
