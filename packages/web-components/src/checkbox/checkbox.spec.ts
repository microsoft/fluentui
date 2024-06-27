import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Checkbox } from './checkbox.js';

test.describe('Checkbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-checkbox--checkbox'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-checkbox'));
  });

  test('should set and retrieve the `shape` property correctly', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await expect(element).toHaveCount(1);

    await page.setContent(/* html */ `
        <fluent-checkbox shape="circular"></fluent-checkbox>
    `);

    await expect(element).toHaveJSProperty('shape', 'circular');

    await element.evaluate((node: Checkbox) => {
      node.shape = 'square';
    });

    await expect(element).toHaveAttribute('shape', 'square');
  });

  test('should add a custom state matching the `shape` attribute when provided', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
      <fluent-checkbox></fluent-checkbox>
  `);

    await element.evaluate((node: Checkbox) => {
      node.shape = 'circular';
    });

    expect(await element.evaluate((node: Checkbox) => node.elementInternals.states.has('circular'))).toBe(true);

    await element.evaluate((node: Checkbox) => {
      node.shape = 'square';
    });

    expect(await element.evaluate((node: Checkbox) => node.elementInternals.states.has('circular'))).toBe(false);
    expect(await element.evaluate((node: Checkbox) => node.elementInternals.states.has('square'))).toBe(true);

    await element.evaluate((node: Checkbox) => {
      node.shape = undefined;
    });

    expect(await element.evaluate((node: Checkbox) => node.elementInternals.states.has('circular'))).toBe(false);
    expect(await element.evaluate((node: Checkbox) => node.elementInternals.states.has('square'))).toBe(false);
  });

  test('should set and retrieve the `size` property correctly', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await element.evaluate((node: Checkbox) => {
      node.size = 'medium';
    });

    await expect(element).toHaveAttribute('size', 'medium');

    await element.evaluate((node: Checkbox) => {
      node.setAttribute('size', 'large');
    });

    await expect(element).toHaveJSProperty('size', 'large');
  });

  test('should add a custom state matching the `size` attribute when provided', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
      <fluent-checkbox></fluent-checkbox>
  `);

    await element.evaluate((node: Checkbox) => {
      node.size = 'medium';
    });

    expect(await element.evaluate((node: Checkbox) => node.elementInternals.states.has('medium'))).toBe(true);

    await element.evaluate((node: Checkbox) => {
      node.size = 'large';
    });

    expect(await element.evaluate((node: Checkbox) => node.elementInternals.states.has('medium'))).toBe(false);
    expect(await element.evaluate((node: Checkbox) => node.elementInternals.states.has('large'))).toBe(true);

    await element.evaluate((node: Checkbox) => {
      node.size = undefined;
    });

    expect(await element.evaluate((node: Checkbox) => node.elementInternals.states.has('medium'))).toBe(false);
    expect(await element.evaluate((node: Checkbox) => node.elementInternals.states.has('large'))).toBe(false);
  });

  test('should have a role of `checkbox`', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <fluent-checkbox></fluent-checkbox>
    `);

    await expect(element).toHaveJSProperty('elementInternals.role', 'checkbox');
  });

  test('should set the `ariaChecked` property to `false` when `checked` is not defined', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <fluent-checkbox></fluent-checkbox>
    `);

    await expect(element).not.toHaveAttribute('checked');

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');
  });

  test('should set the `ariaChecked` property equal to the `checked` property', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <fluent-checkbox checked></fluent-checkbox>
    `);

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'true');

    await element.evaluate((node: Checkbox) => {
      node.checked = false;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');
  });

  test('should NOT set a default `aria-required` value when `required` is not defined', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <fluent-checkbox></fluent-checkbox>
    `);

    await expect(element).not.toHaveAttribute('required');

    await expect(element).not.toHaveAttribute('aria-required');
  });

  test('should be focusable by default', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <fluent-checkbox></fluent-checkbox>
    `);

    await element.focus();

    await expect(element).toBeFocused();
  });

  test('should NOT be focusable when the `disabled` attribute is set', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <fluent-checkbox disabled></fluent-checkbox>
    `);

    await element.focus();

    await expect(element).not.toBeFocused();
  });

  test('should set the `ariaChecked` attribute to "mixed" when `indeterminate` property is true', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <fluent-checkbox></fluent-checkbox>
    `);

    await element.evaluate((node: Checkbox) => {
      node.indeterminate = true;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'mixed');

    await element.evaluate((node: Checkbox) => {
      node.indeterminate = false;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');
  });

  test('should set off `indeterminate` on `checked` change by user click', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <fluent-checkbox></fluent-checkbox>
    `);

    await element.evaluate((node: Checkbox) => {
      node.indeterminate = true;
    });

    await expect(element).toHaveJSProperty('indeterminate', true);

    await element.click();

    await expect(element).toHaveJSProperty('indeterminate', false);
  });

  test('should clear the `indeterminate` state when the `checked` property is true', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <fluent-checkbox></fluent-checkbox>
    `);

    await element.evaluate((node: Checkbox) => {
      node.indeterminate = true;
    });

    await expect(element).toHaveJSProperty('indeterminate', true);

    await element.press(' ');

    await expect(element).toHaveJSProperty('indeterminate', false);
  });

  test('should initialize to the initial value if no value property is set', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <fluent-checkbox></fluent-checkbox>
    `);

    await expect(element).toHaveJSProperty('value', 'on');
  });

  test('should initialize to the provided `value` attribute when set pre-connection', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <fluent-checkbox value="foo"></fluent-checkbox>
    `);

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided `value` attribute when set post-connection', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <fluent-checkbox></fluent-checkbox>
    `);

    const expectedValue = 'foobar';

    await element.evaluate((node: Checkbox, expectedValue) => {
      node.setAttribute('value', expectedValue);
    }, expectedValue);

    await expect(element).toHaveJSProperty('value', expectedValue);
  });

  test('should initialize to the provided `value` property when set pre-connection', async ({ page }) => {
    // const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <fluent-checkbox></fluent-checkbox>
    `);

    const expectedValue = 'foobar';

    const value = await page.evaluate(expectedValue => {
      const node = document.createElement('fluent-checkbox') as Checkbox;

      node.value = expectedValue;

      return Promise.resolve(node.value);
    }, expectedValue);

    expect(value).toBe(expectedValue);
  });

  test('should be invalid when unchecked', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <form>
            <fluent-checkbox required></fluent-checkbox>
        </form>
    `);

    expect(await element.evaluate((node: Checkbox) => node.validity.valueMissing)).toBe(true);
  });

  test('should be valid when checked', async ({ page }) => {
    const element = page.locator('fluent-checkbox');

    await page.setContent(/* html */ `
        <form>
            <fluent-checkbox required>checkbox</fluent-checkbox>
        </form>
    `);

    await element.click();

    await expect(element).toHaveJSProperty('checked', true);

    expect(await element.evaluate((node: Checkbox) => node.validity.valueMissing)).toBe(false);
  });

  test('should set the `checked` property to false if the `checked` attribute is unset', async ({ page }) => {
    const element = page.locator('fluent-checkbox');
    const form = page.locator('form');

    await page.setContent(/* html */ `
        <form>
            <fluent-checkbox></fluent-checkbox>
        </form>
    `);

    await expect(element).toHaveJSProperty('checked', false);

    await element.evaluate((node: Checkbox) => {
      node.checked = true;
    });

    await expect(element).toHaveJSProperty('checked', true);

    await form.evaluate((node: HTMLFormElement) => {
      node.reset();
    });

    await expect(element).toHaveJSProperty('checked', false);
  });

  test('should set its checked property to true if the checked attribute is set', async ({ page }) => {
    const element = page.locator('fluent-checkbox');
    const form = page.locator('form');

    await page.setContent(/* html */ `
        <form>
            <fluent-checkbox></fluent-checkbox>
        </form>
    `);

    await expect(element).toHaveJSProperty('checked', false);

    await element.evaluate((node: Checkbox) => {
      node.setAttribute('checked', '');
    });

    await expect(element).toHaveJSProperty('checked', true);

    await form.evaluate((node: HTMLFormElement) => {
      node.reset();
    });

    await expect(element).toHaveJSProperty('checked', true);
  });

  test('should put the control into a clean state, where `checked` attribute modifications change the `checked` property prior to user or programmatic interaction', async ({
    page,
  }) => {
    const element = page.locator('fluent-checkbox');
    const form = page.locator('form');

    await page.setContent(/* html */ `
        <form>
            <fluent-checkbox required></fluent-checkbox>
        </form>
    `);

    await element.evaluate((node: Checkbox) => {
      node.checked = true;
      node.removeAttribute('checked');
    });

    await expect(element).toHaveJSProperty('checked', true);

    await form.evaluate((node: HTMLFormElement) => {
      node.reset();
    });

    await expect(element).toHaveJSProperty('checked', false);

    await element.evaluate((node: Checkbox) => {
      node.setAttribute('checked', '');
    });

    expect(await element.evaluate((node: Checkbox) => node.value)).toBeTruthy();
  });

  test('should submit the value of the checkbox when checked', async ({ page }) => {
    const element = page.locator('fluent-checkbox');
    const submitButton = page.locator('button');

    await page.setContent(/* html */ `
        <form>
            <fluent-checkbox name="checkbox" value="foo"></fluent-checkbox>
            <button type="submit">submit</button>
        </form>
    `);

    await element.click();

    await submitButton.click();

    expect(page.url()).toContain('?checkbox=foo');
  });

  test('should submit the values of multiple checkboxes when checked', async ({ page }) => {
    const checkboxes = page.locator('fluent-checkbox');
    const element1 = checkboxes.nth(0);
    const element2 = checkboxes.nth(1);
    const submitButton = page.locator('button');

    await page.setContent(/* html */ `
        <form>
            <fluent-checkbox name="checkbox" value="foo"></fluent-checkbox>
            <fluent-checkbox name="checkbox" value="bar"></fluent-checkbox>
            <button type="submit">submit</button>
        </form>
    `);

    await element1.click();
    await element2.click();

    await submitButton.click();

    expect(page.url()).toContain('?checkbox=foo&checkbox=bar');
  });
});
