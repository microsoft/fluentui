import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Radio } from './radio.js';

test.describe('Radio', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-radio');

    root = page.locator('#root');

    await page.goto(fixtureURL('components-radio--radio'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should have a role of `radio`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-radio>Radio</fluent-radio>
            `;
    });

    await expect(element).toHaveAttribute('role', 'radio');
  });

  test('should set ARIA attributes to match the state', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-radio>Radio</fluent-radio>
            `;
    });

    // Checked
    await expect(element).toHaveAttribute('aria-checked', 'false');

    await element.evaluate((node: Radio) => (node.checked = true));

    await expect(element).toHaveAttribute('aria-checked', 'true');

    await element.evaluate((node: Radio) => (node.checked = false));

    await expect(element).toHaveAttribute('aria-checked', 'false');

    // Required
    await expect(element).toHaveAttribute('aria-required', 'false');

    await element.evaluate((node: Radio) => (node.required = true));

    await expect(element).toHaveAttribute('aria-required', 'true');

    await element.evaluate((node: Radio) => (node.required = false));

    await expect(element).toHaveAttribute('aria-required', 'false');

    // Disabled
    await expect(element).toHaveAttribute('aria-disabled', 'false');

    await element.evaluate((node: Radio) => (node.disabled = true));

    await expect(element).toHaveAttribute('aria-disabled', 'true');

    await element.evaluate((node: Radio) => (node.disabled = false));

    await expect(element).toHaveAttribute('aria-disabled', 'false');
  });

  test('should set a tabindex of 0 on the element', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-radio>Radio</fluent-radio>
            `;
    });

    await expect(element).toHaveAttribute('tabindex', '0');
  });

  test('should NOT set a tabindex when disabled is `true`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-radio disabled></fluent-radio>
            `;
    });

    await expect(element).not.toHaveAttribute('tabindex', '');
  });

  test('should initialize to the initial value if no value property is set', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-radio>Radio</fluent-radio>
            `;
    });

    await expect(element).toHaveJSProperty('value', 'on');

    await expect(element).toHaveJSProperty('initialValue', 'on');
  });

  test('should initialize to the provided value attribute if set pre-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-radio>Radio</fluent-radio>
            `;
    });

    await element.evaluate((node: Radio) => node.setAttribute('value', 'foo'));

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided value attribute if set post-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-radio>Radio</fluent-radio>
            `;
    });

    await element.evaluate((node: Radio) => node.setAttribute('value', 'foo'));

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided value property if set pre-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-radio value="foo"></fluent-radio>
            `;
    });

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should set the `label__hidden` class on the internal label when default slotted content does not exist', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-radio>label</fluent-radio>
            `;
    });

    const label = element.locator('label');

    await expect(label).toHaveClass(/^label$/);

    await element.evaluate(node => {
      node.textContent = '';
    });

    await expect(label).toHaveClass(/label__hidden/);
  });

  test('should fire an event when spacebar is pressed', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-radio>Radio</fluent-radio>
            `;
    });

    const [wasPressed] = await Promise.all([
      element.evaluate(
        (node: Radio) =>
          new Promise(resolve =>
            node.addEventListener('keydown', () => resolve(true), {
              once: true,
            }),
          ),
      ),
      // FIXME: Playwright's keyboard API is not working as expected.
      element.evaluate(node => node.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))),
    ]);

    expect(wasPressed).toBeTruthy();
  });

  test('should NOT fire events when clicked', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-radio>Radio</fluent-radio>
            `;
    });

    const [wasClicked] = await Promise.all([
      element.evaluate(
        (node: Radio) =>
          new Promise(resolve =>
            node.addEventListener('click', () => resolve(false), {
              once: true,
            }),
          ),
      ),
      element.evaluate(node => {
        node.dispatchEvent(new MouseEvent('click'));
      }),
    ]);

    expect(wasClicked).toBeFalsy();
  });

  test.describe('whose parent form has its reset() method invoked', () => {
    test('should set its checked property to false if the checked attribute is unset', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <form>
                        <fluent-radio>Radio</fluent-radio>
                    </form>
                `;
      });

      const form = page.locator('form');

      await element.evaluate((node: Radio) => (node.checked = true));

      await expect(element).toBeChecked();

      await form.evaluate((node: HTMLFormElement) => {
        node.reset();
      });

      await expect(element).not.toBeChecked();
    });

    test('should set its checked property to true if the checked attribute is set', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <form>
                        <fluent-radio checked></fluent-radio>
                    </form>
                `;
      });

      const form = page.locator('form');

      expect(await element.evaluate(node => node.hasAttribute('checked'))).toBeTruthy();

      await expect(element).toBeChecked();

      await element.evaluate((node: Radio) => (node.checked = false));

      await expect(element).not.toBeChecked();

      await form.evaluate((node: HTMLFormElement) => {
        node.reset();
      });

      await expect(element).toBeChecked();
    });

    test('should put the control into a clean state, where `checked` attribute modifications modify the `checked` property prior to user or programmatic interaction', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                    <form>
                        <fluent-radio>Radio</fluent-radio>
                    </form>
                `;
      });

      const form = page.locator('form');

      await element.evaluate((node: Radio) => {
        node.checked = true;
      });

      await element.evaluate(node => node.removeAttribute('checked'));

      await expect(element).toBeChecked();

      await form.evaluate((node: HTMLFormElement) => {
        node.reset();
      });

      await expect(element).not.toBeChecked();

      await element.evaluate(node => node.setAttribute('checked', ''));

      await expect(element).toBeChecked();
    });
  });
});
