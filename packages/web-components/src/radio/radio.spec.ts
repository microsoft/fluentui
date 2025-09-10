import { expect, test } from '../../test/playwright/index.js';
import type { Radio } from './radio.js';

test.describe('Radio', () => {
  test.use({ tagName: 'fluent-radio' });

  test('should have a role of `radio`', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.role', 'radio');
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-radio');
    });

    expect(hasError).toBe(false);
  });

  test('should set ARIA attributes to match the state', async ({ fastPage }) => {
    const { element } = fastPage;

    await test.step('ariaChecked', async () => {
      await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');

      await element.evaluate((node: Radio) => (node.checked = true));

      await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'true');

      await element.evaluate((node: Radio) => (node.checked = false));

      await expect(element).toHaveJSProperty('elementInternals.ariaChecked', 'false');
    });

    await test.step('ariaDisabled', async () => {
      await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');

      await element.evaluate((node: Radio) => (node.disabled = true));

      await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');

      await element.evaluate((node: Radio) => (node.disabled = false));

      await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');
    });
  });

  test('should set a `tabindex` of 0 on the element', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveAttribute('tabindex', '0');
  });

  test('should not be focusable when disabled is `true`', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await expect(element).toHaveJSProperty('tabIndex', -1);
  });

  test('should initialize to the initial value if no value property is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('value', 'on');

    await expect(element).toHaveJSProperty('initialValue', 'on');
  });

  test('should initialize to the provided value attribute if set pre-connection', async ({ fastPage, page }) => {
    await fastPage.setTemplate('');

    const value = await page.evaluate(() => {
      const radio = document.createElement('fluent-radio') as Radio;
      radio.setAttribute('value', 'foo');

      return radio.value;
    });

    expect(value).toBe('foo');
  });

  test('should initialize to the provided value attribute if set post-connection', async ({ fastPage }) => {
    const { element } = fastPage;

    await element.evaluate((node: Radio) => node.setAttribute('value', 'foo'));

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should initialize to the provided value property if set pre-connection', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { value: 'foo' } });

    await expect(element).toHaveJSProperty('value', 'foo');
  });

  test('should fire an event when spacebar is pressed', async ({ fastPage }) => {
    const { element } = fastPage;

    const wasPressed = element.evaluate(
      node => new Promise(resolve => node.addEventListener('keydown', () => resolve(true))),
    );

    await element.focus();

    await element.press(' ');

    await expect(wasPressed).resolves.toBe(true);
  });

  test('should NOT fire events when clicked', async ({ fastPage, page }) => {
    const { element } = fastPage;

    const wasNotClicked = await page.evaluate(el => {
      const event = new KeyboardEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      // The return value of dispatchEvent will be false if any event listener called preventDefault, or true otherwise.
      return el?.dispatchEvent(event);
    }, await element.elementHandle());

    expect(wasNotClicked).toEqual(true);
  });

  test.describe('whose parent form has its reset() method invoked', () => {
    test('should set its checked property to false if the checked attribute is unset', async ({ fastPage, page }) => {
      const { element } = fastPage;
      const form = page.locator('form');

      await fastPage.setTemplate(/* html */ `
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

    test('should set its `checked` property to true if the `checked` attribute is set', async ({ fastPage, page }) => {
      const { element } = fastPage;
      const form = page.locator('form');

      await fastPage.setTemplate(/* html */ `
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
      fastPage,
      page,
    }) => {
      const { element } = fastPage;
      const form = page.locator('form');

      await fastPage.setTemplate(/* html */ `
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

  test('should set the `checked` property to false if the `checked` attribute is unset', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const form = page.locator('form');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-radio></fluent-radio>
      </form>
    `);

    await expect(element).toHaveJSProperty('checked', false);

    await element.evaluate((node: Radio) => {
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
        <fluent-radio></fluent-radio>
      </form>
    `);

    await expect(element).toHaveJSProperty('checked', false);

    await element.evaluate((node: Radio) => {
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
        <fluent-radio required></fluent-radio>
      </form>
    `);

    await element.evaluate((node: Radio) => {
      node.checked = true;
      node.removeAttribute('checked');
    });

    await expect(element).toHaveJSProperty('checked', true);

    await form.evaluate((node: HTMLFormElement) => {
      node.reset();
    });

    await expect(element).toHaveJSProperty('checked', false);

    await element.evaluate((node: Radio) => {
      node.toggleAttribute('checked', true);
    });

    await expect(element).toHaveJSProperty('checked', true);
  });

  test('should NOT submit the value of the radio when checked', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const submitButton = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-radio name="radio" value="foo"></fluent-radio>
        <button type="submit">submit</button>
      </form>
    `);

    await element.click();

    await submitButton.click();

    await expect(page).not.toHaveURL(/\?radio=foo/);
  });
});
