import { type InitialTemplateAttributes } from '@microsoft/fast-test-harness';
import { expect, test } from '../../test/playwright/index.js';

import type { Checkbox } from './checkbox.js';
import { CheckboxShape, CheckboxSize, tagName } from './checkbox.options.js';

test.describe('Checkbox', () => {
  test.use({
    tagName,
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(tagName => {
      document.createElement(tagName);
    }, tagName);

    expect(hasError).toBe(false);
  });

  test('should have a role of `checkbox`', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('elementInternals.role', 'checkbox');
  });

  test('should initialize to the initial value if no value property is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('value', 'on');
  });

  test('should set the `shape` property to match the `shape` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    for (const shape of Object.values(CheckboxShape)) {
      await test.step(`should set the \`shape\` property to "${shape}"`, async () => {
        await fastPage.updateTemplate(element, { attributes: { shape } });

        await expect(element).toHaveAttribute('shape', shape);

        await expect(element).toHaveJSProperty('shape', shape);
      });
    }
  });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    for (const size of Object.values(CheckboxSize)) {
      await test.step(`should set the \`size\` property to "${size}"`, async () => {
        await fastPage.updateTemplate(element, { attributes: { size } });

        await expect(element).toHaveJSProperty('size', size);

        await expect(element).toHaveAttribute('size', size);
      });
    }
  });

  test('should set the `ariaChecked` property equal to the `checked` property', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');

    await element.evaluate((node: Checkbox) => {
      node.checked = true;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'true');
  });

  test('should NOT set a default `aria-required` value when `required` is not defined', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).not.toHaveAttribute('required');

    await expect(element).not.toHaveAttribute('aria-required');
  });

  test('should be focusable by default', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

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

    await fastPage.setTemplate();

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

    await fastPage.setTemplate();

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
        <${tagName}></${tagName}>
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

    const value = await page.evaluate(
      ([expectedValue, tagName]) => {
        const node = document.createElement(tagName) as Checkbox;

        node.setAttribute('value', expectedValue);

        return node.value;
      },
      [expectedValue, tagName],
    );

    expect(value).toBe(expectedValue);
  });

  test('should initialize to the provided `value` attribute when set post-connection', async ({ fastPage }) => {
    const { element } = fastPage;
    const expectedValue = 'foobar';

    await fastPage.setTemplate();

    await element.evaluate((node: Checkbox, expectedValue) => {
      node.setAttribute('value', expectedValue);
    }, expectedValue);

    await expect(element).toHaveJSProperty('value', expectedValue);
  });

  test('should initialize to the provided `value` property when set pre-connection', async ({ fastPage, page }) => {
    await fastPage.setTemplate('');

    await expect(fastPage.element).not.toBeAttached();

    const expectedValue = 'foobar';

    const value = await page.evaluate(
      ([expectedValue, tagName]) => {
        const node = document.createElement(tagName) as Checkbox;

        node.value = expectedValue;

        return node.value;
      },
      [expectedValue, tagName],
    );

    expect(value).toBe(expectedValue);
  });

  test('should be invalid when unchecked', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form>
        <${tagName} required></${tagName}>
      </form>
    `);

    await expect(element).toHaveJSProperty('validity.valueMissing', true);
  });

  test('should be valid when checked', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form>
        <${tagName} required>checkbox</${tagName}>
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
        <${tagName}></${tagName}>
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
        <${tagName}></${tagName}>
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
        <${tagName} required></${tagName}>
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
        <${tagName} name="checkbox" value="foo"></${tagName}>
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
        <${tagName} name="checkbox" value="foo"></${tagName}>
        <${tagName} name="checkbox" value="bar"></${tagName}>
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
    const submitButton = page.locator('button[type="submit"]');

    await fastPage.setTemplate(/* html */ `
      <form>
        <label for="checkbox">Checkbox</label>
        <${tagName} required name="checkbox" id="checkbox"></${tagName}>
        <button type="submit">submit</button>
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

  test('should focus the element when the `autofocus` attribute is present', async ({ fastPage, ssr }) => {
    const { element } = fastPage;

    const attributes: InitialTemplateAttributes = { autofocus: true };

    if (ssr) {
      // the host element needs to be focusable for autofocus to work on the server,
      // so we need to set tabindex="0"
      attributes.tabindex = '0';
    }

    await fastPage.setTemplate({ attributes });

    await expect(element).toBeFocused();
  });
});
