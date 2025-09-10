import { expect, test } from '../../test/playwright/index.js';
import type { Checkbox } from './checkbox.js';
import { CheckboxShape, CheckboxSize } from './checkbox.options.js';

test.describe('Checkbox', () => {
  test.use({
    tagName: 'fluent-checkbox',
    waitFor: ['fluent-button'],
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-checkbox');
    });

    expect(hasError).toBe(false);
  });

  test('should have a role of `checkbox`', async ({ fastPage }) => {
    await expect(fastPage.element).toHaveJSProperty('elementInternals.role', 'checkbox');
  });

  test('should initialize to the initial value if no value property is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('value', 'on');
  });

  test('should set the `shape` property to match the `shape` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const shape of Object.values(CheckboxShape)) {
      await test.step(`should set the \`shape\` property to "${shape}"`, async () => {
        await fastPage.setTemplate({
          attributes: {
            shape,
          },
        });

        await expect(element).toHaveAttribute('shape', shape);

        await expect(element).toHaveJSProperty('shape', shape);
      });
    }
  });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const size of Object.values(CheckboxSize)) {
      await test.step(`should set the \`size\` property to "${size}"`, async () => {
        await fastPage.setTemplate({ attributes: { size: size } });

        await expect(element).toHaveJSProperty('size', size);

        await expect(element).toHaveAttribute('size', size);
      });
    }
  });

  test('should set the `ariaChecked` property equal to the `checked` property', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');

    await element.evaluate((node: Checkbox) => {
      node.checked = true;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'true');
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

  test('should set the `ariaChecked` attribute to "mixed" when `indeterminate` property is true', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await element.evaluate((node: Checkbox) => {
      node.indeterminate = true;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'mixed');

    await element.evaluate((node: Checkbox) => {
      node.indeterminate = false;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');
  });

  test('should set `indeterminate` to false when the `checked` state changes via click', async ({ fastPage }) => {
    const { element } = fastPage;

    await element.evaluate((node: Checkbox) => {
      node.indeterminate = true;
    });

    await expect(element).toHaveJSProperty('indeterminate', true);

    await element.click();

    await expect(element).toHaveJSProperty('indeterminate', false);
  });

  test('should NOT change the `indeterminate` property when the owning form is reset', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const form = page.locator('form');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-checkbox></fluent-checkbox>
      </form>
    `);

    await element.evaluate((node: Checkbox) => {
      node.indeterminate = true;
    });

    await expect(element).toHaveJSProperty('indeterminate', true);

    await form.evaluate((node: HTMLFormElement) => {
      node.reset();
    });

    await expect(element).toHaveJSProperty('indeterminate', true);

    await test.step('should retain the `indeterminate` property after being set to `false` via user interaction', async () => {
      await element.click();

      await expect(element).toHaveJSProperty('indeterminate', false);

      await form.evaluate((node: HTMLFormElement) => {
        node.reset();
      });

      await expect(element).toHaveJSProperty('indeterminate', false);
    });
  });

  test('should initialize to the provided `value` attribute when set pre-connection', async ({ fastPage, page }) => {
    const expectedValue = 'foobar';

    await fastPage.setTemplate('');

    const value = await page.evaluate(expectedValue => {
      const node = document.createElement('fluent-checkbox') as Checkbox;

      node.setAttribute('value', expectedValue);

      return node.value;
    }, expectedValue);

    expect(value).toBe(expectedValue);
  });

  test('should initialize to the provided `value` attribute when set post-connection', async ({ fastPage }) => {
    const { element } = fastPage;

    const expectedValue = 'foobar';

    await element.evaluate((node: Checkbox, expectedValue) => {
      node.setAttribute('value', expectedValue);
    }, expectedValue);

    await expect(element).toHaveJSProperty('value', expectedValue);
  });

  test('should initialize to the provided `value` property when set pre-connection', async ({ fastPage, page }) => {
    await fastPage.setTemplate('');

    await expect(fastPage.element).not.toBeAttached();

    const expectedValue = 'foobar';

    const value = await page.evaluate(expectedValue => {
      const node = document.createElement('fluent-checkbox') as Checkbox;

      node.value = expectedValue;

      return node.value;
    }, expectedValue);

    expect(value).toBe(expectedValue);
  });

  test('should be invalid when unchecked', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-checkbox required></fluent-checkbox>
      </form>
    `);

    await expect(element).toHaveJSProperty('validity.valueMissing', true);
  });

  test('should be valid when checked', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-checkbox required>checkbox</fluent-checkbox>
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

  test('should set its checked property to true if the checked attribute is set', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const form = page.locator('form');

    await fastPage.setTemplate(/* html */ `
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
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const form = page.locator('form');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-checkbox required></fluent-checkbox>
      </form>
    `);

    await element.evaluate((node: Checkbox) => {
      node.checked = true;
      node.toggleAttribute('checked', false);
    });

    await expect(element).toHaveJSProperty('checked', true);

    await form.evaluate((node: HTMLFormElement) => {
      node.reset();
    });

    await expect(element).toHaveJSProperty('checked', false);

    await element.evaluate((node: Checkbox) => {
      node.toggleAttribute('checked', true);
    });

    expect(await element.evaluate((node: Checkbox) => node.value)).toBeTruthy();
  });

  test('should submit the value of the checkbox when checked', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const submitButton = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-checkbox name="checkbox" value="foo"></fluent-checkbox>
        <button type="submit">submit</button>
      </form>
    `);

    await element.click();

    await submitButton.click();

    expect(page.url()).toContain('?checkbox=foo');
  });

  test('should submit the values of multiple checkboxes when checked', async ({ fastPage, page }) => {
    const { element: checkboxes } = fastPage;
    const element1 = checkboxes.nth(0);
    const element2 = checkboxes.nth(1);
    const submitButton = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-checkbox name="checkbox" value="foo"></fluent-checkbox>
        <fluent-checkbox name="checkbox" value="bar"></fluent-checkbox>
        <button type="submit">submit</button>
      </form>
    `);

    await element1.click();
    await element2.click();

    await submitButton.click();

    await expect(page).toHaveURL(/\?checkbox=foo&checkbox=bar/);
  });

  test('should not change the checkedness when the form is submitted and the checkbox is invalid (required and unchecked)', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const submitButton = page.locator('fluent-button');

    await fastPage.setTemplate(/* html */ `
      <form>
        <label for="checkbox">Checkbox</label>
        <fluent-checkbox required name="checkbox" id="checkbox"></fluent-checkbox>
        <fluent-button type="submit">submit</fluent-button>
      </form>
    `);

    await expect(element).toHaveJSProperty('checked', false);
    await expect(element).toHaveJSProperty('validity.valueMissing', true);

    await submitButton.focus();

    await expect(submitButton).toBeFocused();

    await page.keyboard.down(' ');

    await page.keyboard.up(' ');

    await expect(element).toHaveJSProperty('checked', false);
  });
});
