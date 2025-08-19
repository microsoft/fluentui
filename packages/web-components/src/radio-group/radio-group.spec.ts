import { expect, test } from '../../test/playwright/index.js';
import type { Radio } from '../radio/index.js';
import type { RadioGroup } from './radio-group.js';

test.describe('RadioGroup', () => {
  test.use({
    tagName: 'fluent-radio-group',
    waitFor: ['fluent-radio'],
    innerHTML: '',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-radio-group');
    });

    expect(hasError).toBe(false);
  });

  test('should have a role of `radiogroup`', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.role', 'radiogroup');
  });

  test('should set a default `aria-orientation` value when `orientation` is not defined', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should set the `aria-orientation` attribute equal to the `orientation` value', async ({ fastPage }) => {
    const { element } = fastPage;

    await test.step('horizontal', async () => {
      await fastPage.setTemplate({ attributes: { orientation: 'horizontal' } });

      await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
    });

    await test.step('vertical', async () => {
      await element.evaluate(node => {
        node.setAttribute('orientation', 'vertical');
      });

      await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');
    });
  });

  test('should set the `aria-setsize` and `aria-posinset` attributes on the radios', async ({ fastPage }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-radio></fluent-radio>
        <fluent-radio></fluent-radio>
        <fluent-radio></fluent-radio>
      `,
    });

    await expect(radios.nth(0)).toHaveAttribute('aria-posinset', '1');
    await expect(radios.nth(0)).toHaveAttribute('aria-setsize', '3');

    await expect(radios.nth(1)).toHaveAttribute('aria-posinset', '2');
    await expect(radios.nth(1)).toHaveAttribute('aria-setsize', '3');

    await expect(radios.nth(2)).toHaveAttribute('aria-posinset', '3');
    await expect(radios.nth(2)).toHaveAttribute('aria-setsize', '3');
  });

  test('should NOT modify the "disabled" state for child radios when the `disabled` attribute is present', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');
    const firstRadio = radios.nth(0);
    const secondRadio = radios.nth(1);
    const thirdRadio = radios.nth(2);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-radio></fluent-radio>
        <fluent-radio disabled></fluent-radio>
        <fluent-radio></fluent-radio>
      `,
    });

    await expect(element).not.toHaveAttribute('disabled');

    await expect(firstRadio).not.toHaveAttribute('disabled');

    await expect(secondRadio).toHaveAttribute('disabled');

    await expect(thirdRadio).not.toHaveAttribute('disabled');

    element.evaluate((node: RadioGroup) => {
      node.toggleAttribute('disabled');
    });

    await expect(element).toHaveAttribute('disabled');

    await expect(firstRadio).not.toHaveAttribute('disabled');

    await expect(secondRadio).toHaveAttribute('disabled');

    await expect(thirdRadio).not.toHaveAttribute('disabled');
  });

  test('should NOT be focusable when disabled', async ({ fastPage, page }) => {
    const { element } = fastPage;

    const first = page.locator('button', { hasText: 'First' });
    const second = page.locator('button', { hasText: 'Second' });

    await fastPage.setTemplate(/* html */ `
      <button>First</button>
      <fluent-radio-group disabled>
        <fluent-radio></fluent-radio>
        <fluent-radio></fluent-radio>
        <fluent-radio></fluent-radio>
      </fluent-radio-group>
      <button>Second</button>
    `);

    await expect(element).toHaveAttribute('disabled');

    await first.focus();

    await expect(first).toBeFocused();

    await first.press('Tab');

    await expect(second).toBeFocused();
  });

  test('should NOT be focusable via click when disabled', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');
    const button = page.locator('button', { hasText: 'Button' });

    await fastPage.setTemplate(/* html */ `
      <button>Button</button>
      <fluent-radio-group>
        <fluent-radio></fluent-radio>
        <fluent-radio></fluent-radio>
        <fluent-radio></fluent-radio>
      </fluent-radio-group>
    `);

    await button.focus();
    await expect(button).toBeFocused();

    for (const radio of await radios.all()) {
      await radio.click();
      await expect(radio).toBeFocused();
    }

    await element.evaluate(node => node.setAttribute('disabled', ''));

    const isDisabled = await element.evaluate((node: Element) => node.hasAttribute('disabled'));

    expect(isDisabled).toBe(true);

    for (const radio of await radios.all()) {
      // Using page.evaluate to manually simulate what would happen with a click event
      const isClickable = await page.evaluate(el => {
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        });

        // The return value of dispatchEvent will be false if any event listener called preventDefault, or true otherwise.
        return el?.dispatchEvent(event);
      }, await radio.elementHandle());

      // Since the radio group is disabled, the click event should be canceled, so we expect isClickable to be false
      expect(isClickable).toBe(false);
    }
  });

  test('should set tabindex of 0 to a child radio with a matching `value`', async ({ fastPage }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate({
      attributes: {
        value: 'foo',
      },
      innerHTML: /* html */ `
        <fluent-radio value="foo"></fluent-radio>
        <fluent-radio value="bar"></fluent-radio>
        <fluent-radio value="baz"></fluent-radio>
      `,
    });

    await expect(radios.nth(0)).toHaveAttribute('tabindex', '0');
  });

  test('should set tabindex of 0 to a child radio that’s initially checked', async ({ fastPage }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-radio value="foo"></fluent-radio>
        <fluent-radio value="bar" checked></fluent-radio>
        <fluent-radio value="baz"></fluent-radio>
      `,
    });

    await expect(radios.nth(1)).toHaveAttribute('tabindex', '0');
  });

  test('should check the first radio with a matching `value`', async ({ fastPage }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate(/* html */ `
      <fluent-radio-group value="bar">
        <fluent-radio id="radio-1" name="radio" value="foo"></fluent-radio>
        <fluent-radio id="radio-2" name="radio" value="bar"></fluent-radio>
        <fluent-radio id="radio-3" name="radio" value="baz"></fluent-radio>
    `);

    await expect(radios.nth(0)).toHaveJSProperty('checked', false);

    await expect(radios.nth(1)).toHaveJSProperty('checked', true);

    await expect(radios.nth(2)).toHaveJSProperty('checked', false);
  });

  test('radio should remain checked after it is set to disabled and uncheck when a new radio is checked', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate(/* html */ `
      <fluent-radio-group>
        <fluent-radio id="radio-1" name="radio" value="foo"></fluent-radio>
        <fluent-radio id="radio-2" name="radio" value="bar"></fluent-radio>
        <fluent-radio id="radio-3" name="radio" value="baz"></fluent-radio>
      </fluent-radio-group>
    `);

    await radios.nth(0).evaluate((node: Radio) => {
      node.checked = true;
      node.disabled = true;
    });

    await expect(radios.nth(0)).toHaveJSProperty('checked', true);

    await radios.nth(1).click();

    await expect(radios.nth(1)).toBeFocused();

    await page.keyboard.press('ArrowRight');

    await expect(radios.nth(0)).toHaveJSProperty('checked', false);
    await expect(radios.nth(1)).toHaveJSProperty('checked', false);
    await expect(radios.nth(2)).toHaveJSProperty('checked', true);
  });

  test('should emit `change` event when using keyboard', async ({ fastPage, page }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate(/* html */ `
      <fluent-radio-group>
        <fluent-radio id="radio-1" name="radio" value="foo"></fluent-radio>
        <fluent-radio id="radio-2" name="radio" value="bar"></fluent-radio>
        <fluent-radio id="radio-3" name="radio" value="baz"></fluent-radio>
      </fluent-radio-group>
    `);

    const wasChanged = element.evaluate((node: RadioGroup) => {
      return new Promise(resolve => {
        node.addEventListener('change', () => resolve(true), { once: true });
      });
    });

    await radios.nth(1).click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await expect(wasChanged).resolves.toBeTruthy();
  });

  test('should set a child radio with a matching `value` to `checked` when value changes', async ({ fastPage }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate({
      attributes: {
        value: 'foo',
      },
      innerHTML: /* html */ `
        <fluent-radio value="foo"></fluent-radio>
        <fluent-radio value="bar"></fluent-radio>
        <fluent-radio value="baz"></fluent-radio>
      `,
    });

    await element.evaluate((node: RadioGroup) => {
      node.value = 'bar';
    });

    await expect(radios.nth(0)).toHaveJSProperty('checked', false);

    await expect(radios.nth(1)).toHaveJSProperty('checked', true);

    await expect(radios.nth(2)).toHaveJSProperty('checked', false);
  });

  test('should mark only the last radio defaulted to checked as checked', async ({ fastPage }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-radio value="foo" checked></fluent-radio>
        <fluent-radio value="bar" checked></fluent-radio>
        <fluent-radio value="baz" checked></fluent-radio>
      `,
    });

    expect(await radios.evaluateAll((radios: Radio[]) => radios.filter(radio => radio.checked).length)).toBe(1);

    await expect(radios.nth(0)).toHaveJSProperty('checked', false);

    await expect(radios.nth(1)).toHaveJSProperty('checked', false);

    await expect(radios.nth(2)).toHaveJSProperty('checked', true);
  });

  test('should mark radio matching value on radio-group over any checked attributes', async ({ fastPage }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate({
      attributes: { value: 'foo' },
      innerHTML: /* html */ `
        <fluent-radio value="foo"></fluent-radio>
        <fluent-radio value="bar" checked></fluent-radio>
        <fluent-radio value="baz"></fluent-radio>
      `,
    });

    expect(await radios.evaluateAll((radios: Radio[]) => radios.filter(radio => radio.checked).length)).toBe(1);

    await expect(radios.nth(0)).toHaveJSProperty('checked', true);

    await expect(radios.nth(1)).toHaveJSProperty('checked', false);

    await expect(radios.nth(1)).toHaveAttribute('checked');

    await expect(radios.nth(2)).toHaveJSProperty('checked', false);
  });

  test('should allow resetting of elements by the parent form', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-radio-group>
          <fluent-radio name="radio" value="foo"></fluent-radio>
          <fluent-radio name="radio" value="bar" checked></fluent-radio>
          <fluent-radio name="radio" value="baz"></fluent-radio>
        </fluent-radio-group>
      </form>
    `);

    const form = page.locator('form');

    await expect(radios.nth(0)).toHaveJSProperty('checked', false);

    await expect(radios.nth(1)).toHaveJSProperty('checked', true);

    await expect(radios.nth(2)).toHaveJSProperty('checked', false);

    await radios.nth(2).click();

    await expect(radios.nth(0)).toHaveJSProperty('checked', false);

    await expect(radios.nth(1)).toHaveJSProperty('checked', false);

    await expect(radios.nth(2)).toHaveJSProperty('checked', true);

    await form.evaluate((node: HTMLFormElement) => {
      node.reset();
    });

    await expect(radios.nth(0)).toHaveJSProperty('checked', false);

    await expect(radios.nth(1)).toHaveJSProperty('checked', true);

    await expect(radios.nth(2)).toHaveJSProperty('checked', false);
  });

  test('should focus the first radio when the radio group is focused', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-radio></fluent-radio>
        <fluent-radio></fluent-radio>
        <fluent-radio></fluent-radio>
      `,
    });

    await page.keyboard.press('Tab');

    await expect(radios.nth(0)).toBeFocused();
  });

  test('should focus the second radio when the radio group is focused and the first radio is disabled', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-radio disabled></fluent-radio>
        <fluent-radio></fluent-radio>
        <fluent-radio></fluent-radio>
      `,
    });

    await page.keyboard.press('Tab');

    await expect(radios.nth(1)).toBeFocused();
  });

  test('should focus the third radio when the radio group is focused and the first two radios are disabled', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-radio disabled></fluent-radio>
        <fluent-radio disabled></fluent-radio>
        <fluent-radio></fluent-radio>
      `,
    });

    await page.keyboard.press('Tab');

    await expect(radios.nth(2)).toBeFocused();
  });

  test('should NOT focus any radio when the radio group is focused and all radios are disabled', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-radio disabled></fluent-radio>
        <fluent-radio disabled></fluent-radio>
        <fluent-radio disabled></fluent-radio>
      `,
    });

    await page.keyboard.press('Tab');

    await expect(element).not.toBeFocused();
  });

  // @FIXME: This test is failing on OSX - https://github.com/microsoft/fluentui/issues/33172
  test('should move focus to the next radio when the radio group is focused and the arrow down key is pressed', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-radio></fluent-radio>
        <fluent-radio></fluent-radio>
        <fluent-radio></fluent-radio>
      `,
    });

    await page.keyboard.press('Tab');

    await expect(radios.nth(0)).toBeFocused();

    await page.keyboard.press('ArrowDown');

    await expect(radios.nth(1)).toBeFocused();

    await test.step('should move focus to the next radio when the radio group is focused and the arrow down key is pressed', async () => {
      await page.keyboard.press('ArrowDown');

      await expect(radios.nth(2)).toBeFocused();
    });

    await test.step('should move focus to the first radio when the last radio is focused and the arrow down key is pressed', async () => {
      await page.keyboard.press('ArrowDown');

      await expect(radios.nth(0)).toBeFocused();
    });
  });

  test('should adopt the `name` of the radios when every radio has the same `name` and the radio group has no `name` attribute', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-radio name="foo"></fluent-radio>
        <fluent-radio name="foo"></fluent-radio>
        <fluent-radio name="foo"></fluent-radio>
      `,
    });

    await expect(element).toHaveJSProperty('name', 'foo');
  });

  test('should NOT adopt the `name` of the radios when the radios have different `name` attributes', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-radio name="foo"></fluent-radio>
        <fluent-radio name="bar"></fluent-radio>
        <fluent-radio name="baz"></fluent-radio>
      `,
    });

    await expect(element).not.toHaveAttribute('name');
  });

  // @FIXME: This test is failing on OSX - https://github.com/microsoft/fluentui/issues/33172
  test('should set the `name` attribute of the radios to the `name` attribute of the radio group', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate({
      attributes: { name: 'foo' },
      innerHTML: /* html */ `
        <fluent-radio></fluent-radio>
        <fluent-radio></fluent-radio>
        <fluent-radio></fluent-radio>
      `,
    });

    for (const radio of await radios.all()) {
      await expect(radio).toHaveAttribute('name', 'foo');

      await expect(radio).toHaveJSProperty('name', 'foo');
    }
  });

  test('should override the `name` attribute of the radios with the `name` attribute of the radio group', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate({
      attributes: { name: 'foo' },
      innerHTML: /* html */ `
        <fluent-radio name="bar"></fluent-radio>
        <fluent-radio name="baz"></fluent-radio>
        <fluent-radio name="qux"></fluent-radio>
      `,
    });

    await expect(element).toHaveAttribute('name', 'foo');

    for (const radio of await radios.all()) {
      await expect(radio).toHaveAttribute('name', 'foo');

      await expect(radio).toHaveJSProperty('name', 'foo');
    }
  });

  test('should submit the value of the checked radio when the radio group is in a form and the form is submitted', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-radio-group name="radio">
          <fluent-radio value="foo"></fluent-radio>
          <fluent-radio value="bar"></fluent-radio>
          <fluent-radio value="baz"></fluent-radio>
        </fluent-radio-group>
        <button type="submit">submit</button>
      </form>
    `);

    const button = page.locator('button');

    await radios.nth(1).click();

    await button.click();

    await expect(page).toHaveURL(/radio=bar/);
  });

  test('should NOT submit the value of the checked radio when the radio group is in a form and the form is submitted and the radio group is disabled', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-radio-group name="radio" disabled>
          <fluent-radio value="foo"></fluent-radio>
          <fluent-radio value="bar"></fluent-radio>
          <fluent-radio value="baz"></fluent-radio>
        </fluent-radio-group>
        <button type="submit">submit</button>
      </form>
    `);

    const button = page.locator('button');

    await radios.nth(1).click();

    await button.click();

    await expect(page).not.toHaveURL(/radio=/);
  });

  test('should NOT submit the value of the checked radio when the radio group is in a form and the form is submitted and the radio group has no name', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-radio-group>
          <fluent-radio value="foo"></fluent-radio>
          <fluent-radio value="bar"></fluent-radio>
          <fluent-radio value="baz"></fluent-radio>
        </fluent-radio-group>
        <button type="submit">submit</button>
      </form>
    `);

    const button = page.locator('button');

    await radios.nth(1).click();

    await button.click();

    await expect(page).not.toHaveURL(/radio=/);
  });

  test('should NOT submit the value of the checked radio when the radio group is in a form and the form is submitted and the radio group has no radios', async ({
    fastPage,
    page,
  }) => {
    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-radio-group name="radio" value="foo"></fluent-radio-group>
        <button type="submit">submit</button>
      </form>
    `);

    const button = page.locator('button');

    await button.click();

    await expect(page).not.toHaveURL(/radio=/);
  });

  test('should NOT submit the value of the checked radio when the radio group is in a form and the form is submitted and the radio group has no enabled radios', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const radios = element.locator('fluent-radio');
    const button = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-radio-group name="radio">
          <fluent-radio disabled value="foo"></fluent-radio>
          <fluent-radio disabled value="bar"></fluent-radio>
          <fluent-radio disabled value="baz"></fluent-radio>
        </fluent-radio-group>
        <button type="submit">submit</button>
      </form>
    `);

    await radios.nth(1).click();

    await expect(radios.nth(1)).toHaveJSProperty('checked', false);

    await button.click();

    await expect(page).not.toHaveURL(/radio=/);
  });
});
