import { expect, test } from '../../test/playwright/index.js';
import type { Switch } from './switch.js';

test.describe('Switch', () => {
  test.use({ tagName: 'fluent-switch' });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-switch');
    });

    expect(hasError).toBe(false);
  });

  test('should have a role of `switch`', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.role', 'switch');
  });

  test('should set the `ariaChecked` property to `false` when `checked` is not defined', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).not.toHaveAttribute('checked');

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');
  });

  test('should set the `ariaChecked` property equal to the `checked` property', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { checked: true } });

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'true');

    await element.evaluate((node: Switch) => {
      node.checked = false;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');
  });

  test('should NOT set a default `aria-required` value when `required` is not defined', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).not.toHaveAttribute('required');

    await expect(element).not.toHaveAttribute('aria-required');
  });

  test('should be focusable by default', async ({ fastPage }) => {
    const { element } = fastPage;

    await element.focus();

    await expect(element).toBeFocused();
  });

  test('should NOT be focusable when the `disabled` attribute is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await element.focus();

    await expect(element).not.toBeFocused();
  });

  test('should initialize to the initial value if no `value` property is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('value', 'on');
  });

  test('should initialize to the provided `value` attribute when set pre-connection', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { value: 'foo' } });

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided `value` attribute when set post-connection', async ({ fastPage }) => {
    const { element } = fastPage;

    const expectedValue = 'foobar';

    await element.evaluate((node: Switch, expectedValue) => {
      node.setAttribute('value', expectedValue);
    }, expectedValue);

    await expect(element).toHaveJSProperty('value', expectedValue);
  });

  test('should initialize to the provided `value` property when set pre-connection', async ({ fastPage, page }) => {
    await fastPage.setTemplate('');

    const expectedValue = 'foobar';

    const value = await page.evaluate(expectedValue => {
      const node = document.createElement('fluent-switch') as Switch;

      node.value = expectedValue;

      return node.value;
    }, expectedValue);

    expect(value).toBe(expectedValue);
  });

  test('should be invalid when unchecked', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-switch required></fluent-switch>
      </form>
    `);

    await expect(element).toHaveJSProperty('validity.valueMissing', true);
  });

  test('should be valid when checked', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-switch required></fluent-switch>
      </form>
    `);

    await element.click();

    await expect(element).toHaveJSProperty('checked', true);

    await expect(element).toHaveJSProperty('validity.valueMissing', false);
  });

  test('should set the `checked` property to false if the `checked` attribute is unset', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const form = page.locator('form');

    await fastPage.setTemplate(/* html */ `
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

  test('should set its checked property to true if the checked attribute is set', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const form = page.locator('form');

    await fastPage.setTemplate(/* html */ `
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
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const form = page.locator('form');

    await fastPage.setTemplate(/* html */ `
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

    await expect(element).toHaveJSProperty('value', 'on');
  });

  test('should submit the value of the switch when checked', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const submitButton = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-switch name="switch" value="foo"></fluent-switch>
        <button type="submit">submit</button>
      </form>
    `);

    await element.click();

    await submitButton.click();

    await expect(page).toHaveURL(/\?switch=foo/);
  });

  test('should submit the values of multiple switches when checked', async ({ fastPage, page }) => {
    const switches = page.locator('fluent-switch');
    const element1 = switches.nth(0);
    const element2 = switches.nth(1);
    const submitButton = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-switch name="switch" value="foo"></fluent-switch>
        <fluent-switch name="switch" value="bar"></fluent-switch>
        <button type="submit">submit</button>
      </form>
    `);

    await element1.click();
    await element2.click();

    await submitButton.click();

    await expect(page).toHaveURL(/\?switch=foo&switch=bar/);
  });
});
