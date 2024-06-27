import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Radio } from './radio.js';

test.describe('Radio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-radio--radio'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-radio'));
  });

  test('should have a role of `radio`', async ({ page }) => {
    const element = page.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio>Radio</fluent-radio>
    `);

    await expect(element).toHaveJSProperty('elementInternals.role', 'radio');
  });

  test('should set ARIA attributes to match the state', async ({ page }) => {
    const element = page.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio>Radio</fluent-radio>
    `);

    await test.step('ariaChecked', async () => {
      await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');

      await element.evaluate((node: Radio) => (node.checked = true));

      await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'true');

      await element.evaluate((node: Radio) => (node.checked = false));

      await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');
    });

    await test.step('ariaDisabled', async () => {
      await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', null);

      await element.evaluate((node: Radio) => (node.disabled = true));

      await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');

      await element.evaluate((node: Radio) => (node.disabled = false));

      await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');
    });
  });

  test('should set a tabindex of 0 on the element', async ({ page }) => {
    const element = page.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio>Radio</fluent-radio>
    `);

    await expect(element).toHaveAttribute('tabindex', '0');
  });

  test('should NOT set a tabindex when disabled is `true`', async ({ page }) => {
    const element = page.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio disabled></fluent-radio>
    `);

    await expect(element).not.toHaveAttribute('tabindex', '');
  });

  test('should initialize to the initial value if no value property is set', async ({ page }) => {
    const element = page.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio>Radio</fluent-radio>
    `);

    await expect(element).toHaveJSProperty('value', 'on');

    await expect(element).toHaveJSProperty('initialValue', 'on');
  });

  test('should initialize to the provided value attribute if set pre-connection', async ({ page }) => {
    const element = page.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio>Radio</fluent-radio>
    `);

    await element.evaluate((node: Radio) => node.setAttribute('value', 'foo'));

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided value attribute if set post-connection', async ({ page }) => {
    const element = page.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio>Radio</fluent-radio>
    `);

    await element.evaluate((node: Radio) => node.setAttribute('value', 'foo'));

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided value property if set pre-connection', async ({ page }) => {
    const element = page.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio value="foo"></fluent-radio>
    `);

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should fire an event when spacebar is pressed', async ({ page }) => {
    const element = page.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio>Radio</fluent-radio>
    `);

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

  test('should NOT fire events when clicked', async ({ page }) => {
    const element = page.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio>Radio</fluent-radio>
    `);

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
    test('should set its checked property to false if the checked attribute is unset', async ({ page }) => {
      const element = page.locator('fluent-radio');
      const form = page.locator('form');

      await page.setContent(/* html */ `
          <form>
              <fluent-radio>Radio</fluent-radio>
          </form>
      `);

      await element.evaluate((node: Radio) => {
        node.checked = true;
      });

      await expect(element).toHaveJSProperty('checked', true);

      await form.evaluate((node: HTMLFormElement) => {
        node.reset();
      });

      await expect(element).toHaveJSProperty('checked', false);
    });

    test('should set its `checked` property to true if the `checked` attribute is set', async ({ page }) => {
      const element = page.locator('fluent-radio');
      const form = page.locator('form');

      await page.setContent(/* html */ `
          <form>
              <fluent-radio checked></fluent-radio>
          </form>
      `);

      await expect(element).toHaveAttribute('checked');

      await expect(element).toHaveJSProperty('checked', true);

      await element.evaluate((node: Radio) => (node.checked = false));

      await expect(element).toHaveAttribute('checked');

      await expect(element).toHaveJSProperty('checked', false);

      await form.evaluate((node: HTMLFormElement) => {
        node.reset();
      });

      await expect(element).toHaveAttribute('checked');

      await expect(element).toHaveJSProperty('checked', true);
    });

    test('should put the control into a clean state, where `checked` attribute modifications modify the `checked` property prior to user or programmatic interaction', async ({
      page,
    }) => {
      const element = page.locator('fluent-radio');
      const form = page.locator('form');

      await page.setContent(/* html */ `
          <form>
              <fluent-radio>Radio</fluent-radio>
          </form>
      `);

      await element.evaluate((node: Radio) => {
        node.checked = true;
      });

      await element.evaluate(node => node.removeAttribute('checked'));

      await expect(element).toHaveJSProperty('checked', true);

      await form.evaluate((node: HTMLFormElement) => {
        node.reset();
      });

      await expect(element).toHaveJSProperty('checked', false);

      await element.evaluate(node => node.setAttribute('checked', ''));

      await expect(element).toHaveJSProperty('checked', true);
    });
  });
});
