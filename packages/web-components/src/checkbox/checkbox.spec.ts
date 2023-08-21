import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Checkbox } from './checkbox.js';

test.describe('Checkbox', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;
  let form: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-checkbox');

    root = page.locator('#root');

    form = page.locator('form');

    await page.goto(fixtureURL('components-checkbox--checkbox'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should set and retrieve the `shape` property correctly', async () => {
    await element.evaluate((node: Checkbox) => {
      node.shape = 'circular';
    });

    await expect(element).toHaveJSProperty('shape', 'circular');

    await element.evaluate((node: Checkbox) => {
      node.shape = 'square';
    });

    await expect(element).toHaveJSProperty('shape', 'square');
  });

  test('should set and retrieve the `size` property correctly', async () => {
    await element.evaluate((node: Checkbox) => {
      node.size = 'medium';
    });

    await expect(element).toHaveJSProperty('size', 'medium');

    await element.evaluate((node: Checkbox) => {
      node.size = 'large';
    });

    await expect(element).toHaveJSProperty('size', 'large');
  });

  test('should set and retrieve the `position` property correctly', async () => {
    await element.evaluate((node: Checkbox) => {
      node.labelPosition = 'before';
    });

    await expect(element).toHaveJSProperty('labelPosition', 'before');

    await element.evaluate((node: Checkbox) => {
      node.labelPosition = 'after';
    });

    await expect(element).toHaveJSProperty('labelPosition', 'after');
  });

  test('should have a role of `checkbox`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox></fluent-checkbox>
        `;
    });
    await expect(element).toHaveAttribute('role', 'checkbox');
  });

  test('should set a tabindex of 0 on the element', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox></fluent-checkbox>
        `;
    });

    await expect(element).toHaveJSProperty('tabIndex', 0);

    await expect(element).toHaveAttribute('tabindex', '0');
  });

  test('should set a default `aria-checked` value when `checked` is not defined', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox></fluent-checkbox>
        `;
    });

    const hasCheckedAttribute = await element.evaluate((node: Element) => node.hasAttribute('checked'));

    expect(hasCheckedAttribute).toBe(false);

    await expect(element).toHaveAttribute('aria-checked', 'false');
  });

  test('should set the `aria-checked` attribute equal to the `checked` property', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox checked></fluent-checkbox>
        `;
    });

    await expect(element).toHaveAttribute('aria-checked', 'true');

    await element.evaluate((node: Checkbox) => {
      node.checked = false;
    });

    await expect(element).toHaveAttribute('aria-checked', 'false');
  });

  test('should NOT set a default `aria-required` value when `required` is not defined', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox></fluent-checkbox>
        `;
    });
    const hasRequiredAttribute = await element.evaluate((node: Element) => node.hasAttribute('required'));

    expect(hasRequiredAttribute).toBe(false);

    await expect(element).toHaveAttribute('aria-required', 'false');
  });

  test('should set the `aria-required` attribute equal to the `required` property', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox></fluent-checkbox>
        `;
    });

    await element.evaluate((node: Checkbox) => {
      node.required = true;
    });

    await expect(element).toHaveAttribute('aria-required', 'true');

    await element.evaluate((node: Checkbox) => {
      node.required = false;
    });

    await expect(element).toHaveAttribute('aria-required', 'false');
  });

  test('should set a default `aria-disabled` value when `disabled` is not defined', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox></fluent-checkbox>
        `;
    });

    const hasDisabledAttribute = await element.evaluate((node: Element) => node.hasAttribute('disabled'));

    expect(hasDisabledAttribute).toBe(false);

    await expect(element).toHaveAttribute('aria-disabled', 'false');
  });

  test('should set the `aria-disabled` attribute equal to the `disabled` property', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox></fluent-checkbox>
        `;
    });

    await element.evaluate((node: Checkbox) => {
      node.disabled = true;
    });

    await expect(element).toHaveAttribute('aria-disabled', 'true');

    await element.evaluate((node: Checkbox) => {
      node.disabled = false;
    });

    await expect(element).toHaveAttribute('aria-disabled', 'false');
  });

  test('should NOT set a tabindex when `disabled` is true', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox disabled></fluent-checkbox>
        `;
    });

    await expect(element).not.toHaveJSProperty('tabIndex', 0);

    await expect(element).not.toHaveAttribute('tabindex', '0');
  });

  test("should set the aria-checked value to 'mixed' when indeterminate property is true", async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox></fluent-checkbox>
        `;
    });

    await element.evaluate((node: Checkbox) => {
      node.indeterminate = true;
    });

    await expect(element).toHaveAttribute('aria-checked', 'mixed');

    await element.evaluate((node: Checkbox) => {
      node.indeterminate = false;
    });

    await expect(element).toHaveAttribute('aria-checked', 'false');
  });

  test('should set off `indeterminate` on `checked` change by user click', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox>checkbox</fluent-checkbox>
        `;
    });

    await element.evaluate((node: Checkbox) => {
      node.indeterminate = true;
    });

    await expect(element).toHaveJSProperty('indeterminate', true);

    await element.click();

    await expect(element).toHaveJSProperty('indeterminate', false);
  });

  test('should set off `indeterminate` on `checked` change by user keypress', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox></fluent-checkbox>
        `;
    });

    await element.evaluate((node: Checkbox) => {
      node.indeterminate = true;
    });

    await expect(element).toHaveJSProperty('indeterminate', true);

    await element.press(' ');

    await expect(element).toHaveJSProperty('indeterminate', false);
  });

  test('should add a class of `label` to the internal label when default slotted content exists', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox>
                <span>Label</span>
            </fluent-checkbox>
        `;
    });

    const label = element.locator('label');

    await expect(label).toHaveClass(/label/);
  });

  test('should add classes of `label` and `label__hidden` to the internal label when default slotted content exists', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox>
                <span>Label</span>
            </fluent-checkbox>
        `;
    });

    const label = element.locator('label');

    await element.evaluate((node: Checkbox) => {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    });

    await expect(label).toHaveClass(/label label__hidden/);
  });

  test('should initialize to the initial value if no value property is set', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox></fluent-checkbox>
        `;
    });

    const initialValue = await element.evaluate((node: Checkbox) => node.initialValue);

    // Playwright doesn't yet see our components as input elements
    await expect(element).toHaveJSProperty('value', initialValue);
  });

  test('should initialize to the provided `value` attribute when set pre-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox value="foo"></fluent-checkbox>
        `;
    });

    const element = page.locator('fluent-checkbox');

    const value = await element.evaluate((node: Checkbox) => node.value);

    expect(value).toBe('foo');
  });

  test('should initialize to the provided `value` attribute when set post-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox></fluent-checkbox>
        `;
    });

    const element = page.locator('fluent-checkbox');

    const expectedValue = 'foobar';

    await element.evaluate((node: Checkbox, expectedValue) => {
      node.setAttribute('value', expectedValue);
    }, expectedValue);

    await expect(element).toHaveJSProperty('value', expectedValue);
  });

  test('should initialize to the provided `value` property when set pre-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-checkbox></fluent-checkbox>
        `;
    });

    const expectedValue = 'foobar';

    const value = await page.evaluate(expectedValue => {
      const node = document.createElement('fluent-checkbox') as Checkbox;

      node.value = expectedValue;

      return Promise.resolve(node.value);
    }, expectedValue);

    expect(value).toBe(expectedValue);
  });

  test('should be invalid when unchecked', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <form>
                <fluent-checkbox required></fluent-checkbox>
            </form>
        `;
    });

    expect(await element.evaluate((node: Checkbox) => node.validity.valueMissing)).toBe(true);
  });

  test('should be valid when checked', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <form>
                <fluent-checkbox required>checkbox</fluent-checkbox>
            </form>
        `;
    });

    await element.click();

    await expect(element).toHaveJSProperty('checked', true);

    expect(await element.evaluate((node: Checkbox) => node.validity.valueMissing)).toBe(false);
  });

  test('should set the `checked` property to false if the `checked` attribute is unset', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <form>
                <fluent-checkbox></fluent-checkbox>
            </form>
        `;
    });

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

  test('should set its checked property to true if the checked attribute is set', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <form>
                <fluent-checkbox></fluent-checkbox>
            </form>
        `;
    });

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

  test('should put the control into a clean state, where checked attribute modifications change the checked property prior to user or programmatic interaction', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <form>
                <fluent-checkbox required></fluent-checkbox>
            </form>
        `;
    });

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
});
