import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Switch } from './switch.js';

test.describe('Switch', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-switch--switch'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-switch'));
  });

  test('should have a role of `checkbox`', async ({ page }) => {
    const element = page.locator('fluent-switch');

    await page.setContent(/* html */ `
        <fluent-switch></fluent-switch>
    `);

    await expect(element).toHaveJSProperty('elementInternals.role', 'checkbox');
  });

  test('should set the `ariaChecked` property to `false` when `checked` is not defined', async ({ page }) => {
    const element = page.locator('fluent-switch');

    await page.setContent(/* html */ `
        <fluent-switch></fluent-switch>
    `);

    await expect(element).not.toHaveAttribute('checked');

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');
  });

  test('should set the `ariaChecked` property equal to the `checked` property', async ({ page }) => {
    const element = page.locator('fluent-switch');

    await page.setContent(/* html */ `
        <fluent-switch checked></fluent-switch>
    `);

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'true');

    await element.evaluate((node: Switch) => {
      node.checked = false;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');
  });

  test('should NOT set a default `aria-required` value when `required` is not defined', async ({ page }) => {
    const element = page.locator('fluent-switch');

    await page.setContent(/* html */ `
        <fluent-switch></fluent-switch>
    `);

    await expect(element).not.toHaveAttribute('required');

    await expect(element).not.toHaveAttribute('aria-required');
  });

  test('should be focusable by default', async ({ page }) => {
    const element = page.locator('fluent-switch');

    await page.setContent(/* html */ `
        <fluent-switch></fluent-switch>
    `);

    await element.focus();

    await expect(element).toBeFocused();
  });

  test('should NOT be focusable when the `disabled` attribute is set', async ({ page }) => {
    const element = page.locator('fluent-switch');

    await page.setContent(/* html */ `
        <fluent-switch disabled></fluent-switch>
    `);

    await element.focus();

    await expect(element).not.toBeFocused();
  });

  test('should initialize to the initial value if no value property is set', async ({ page }) => {
    const element = page.locator('fluent-switch');

    await page.setContent(/* html */ `
        <fluent-switch></fluent-switch>
    `);

    await expect(element).toHaveJSProperty('value', 'on');
  });

  test('should initialize to the provided `value` attribute when set pre-connection', async ({ page }) => {
    const element = page.locator('fluent-switch');

    await page.setContent(/* html */ `
        <fluent-switch value="foo"></fluent-switch>
    `);

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided `value` attribute when set post-connection', async ({ page }) => {
    const element = page.locator('fluent-switch');

    await page.setContent(/* html */ `
        <fluent-switch></fluent-switch>
    `);

    const expectedValue = 'foobar';

    await element.evaluate((node: Switch, expectedValue) => {
      node.setAttribute('value', expectedValue);
    }, expectedValue);

    await expect(element).toHaveJSProperty('value', expectedValue);
  });

  test('should initialize to the provided `value` property when set pre-connection', async ({ page }) => {
    // const element = page.locator('fluent-switch');

    await page.setContent(/* html */ `
        <fluent-switch></fluent-switch>
    `);

    const expectedValue = 'foobar';

    const value = await page.evaluate(expectedValue => {
      const node = document.createElement('fluent-switch') as Switch;

      node.value = expectedValue;

      return Promise.resolve(node.value);
    }, expectedValue);

    expect(value).toBe(expectedValue);
  });

  test('should be invalid when unchecked', async ({ page }) => {
    const element = page.locator('fluent-switch');

    await page.setContent(/* html */ `
        <form>
            <fluent-switch required></fluent-switch>
        </form>
    `);

    expect(await element.evaluate((node: Switch) => node.validity.valueMissing)).toBe(true);
  });

  test('should be valid when checked', async ({ page }) => {
    const element = page.locator('fluent-switch');

    await page.setContent(/* html */ `
        <form>
            <fluent-switch required>checkbox</fluent-switch>
        </form>
    `);

    await element.click();

    await expect(element).toHaveJSProperty('checked', true);

    expect(await element.evaluate((node: Switch) => node.validity.valueMissing)).toBe(false);
  });

  test('should set the `checked` property to false if the `checked` attribute is unset', async ({ page }) => {
    const element = page.locator('fluent-switch');
    const form = page.locator('form');

    await page.setContent(/* html */ `
        <form>
            <fluent-switch></fluent-switch>
        </form>
    `);

    await expect(element).toHaveJSProperty('checked', false);

    await element.evaluate((node: Switch) => {
      node.checked = true;
    });

    await expect(element).toHaveJSProperty('checked', true);

    await form.evaluate((node: HTMLFormElement) => {
      node.reset();
    });

    await expect(element).toHaveJSProperty('checked', false);
  });

  test('should set its checked property to true if the checked attribute is set', async ({ page }) => {
    const element = page.locator('fluent-switch');
    const form = page.locator('form');

    await page.setContent(/* html */ `
        <form>
            <fluent-switch></fluent-switch>
        </form>
    `);

    await expect(element).toHaveJSProperty('checked', false);

    await element.evaluate((node: Switch) => {
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
    const element = page.locator('fluent-switch');
    const form = page.locator('form');

    await page.setContent(/* html */ `
        <form>
            <fluent-switch required></fluent-switch>
        </form>
    `);

    await element.evaluate((node: Switch) => {
      node.checked = true;
      node.removeAttribute('checked');
    });

    await expect(element).toHaveJSProperty('checked', true);

    await form.evaluate((node: HTMLFormElement) => {
      node.reset();
    });

    await expect(element).toHaveJSProperty('checked', false);

    await element.evaluate((node: Switch) => {
      node.setAttribute('checked', '');
    });

    expect(await element.evaluate((node: Switch) => node.value)).toBeTruthy();
  });

  test('should submit the value of the switch when checked', async ({ page }) => {
    const element = page.locator('fluent-switch');
    const submitButton = page.locator('button');

    await page.setContent(/* html */ `
        <form>
            <fluent-switch name="switch" value="foo"></fluent-switch>
            <button type="submit">submit</button>
        </form>
    `);

    await element.click();

    await submitButton.click();

    expect(page.url()).toContain('?switch=foo');
  });

  test('should submit the values of multiple switches when checked', async ({ page }) => {
    const switches = page.locator('fluent-switch');
    const element1 = switches.nth(0);
    const element2 = switches.nth(1);
    const submitButton = page.locator('button');

    await page.setContent(/* html */ `
        <form>
            <fluent-switch name="switch" value="foo"></fluent-switch>
            <fluent-switch name="switch" value="bar"></fluent-switch>
            <button type="submit">submit</button>
        </form>
    `);

    await element1.click();
    await element2.click();

    await submitButton.click();

    expect(page.url()).toContain('?switch=foo&switch=bar');
  });
});
