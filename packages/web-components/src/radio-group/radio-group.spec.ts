import { expect, test } from '../../test/playwright/index.js';
import type { Radio } from '../radio/index.js';
import { tagName as RadioTagName } from '../radio/radio.options.js';
import type { RadioGroup } from './radio-group.js';
import { tagName } from './radio-group.options.js';

test.describe('RadioGroup', () => {
  test.use({
    tagName,
    waitFor: [RadioTagName],
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

  test('should have a role of `radiogroup`', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('elementInternals.role', 'radiogroup');
  });

  test('should set a default `aria-orientation` value when `orientation` is not defined', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should set the `aria-orientation` attribute to `horizontal` when the `orientation` attribute is set to `horizontal`', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: { orientation: 'horizontal' },
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should set the `aria-orientation` attribute to `vertical` when the `orientation` attribute is set to `vertical`', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      attributes: { orientation: 'vertical' },
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');
  });

  test('should set the `aria-setsize` and `aria-posinset` attributes on the radios', async ({ fastPage }) => {
    const { element } = fastPage;
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
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
    const radios = element.locator(RadioTagName);
    const firstRadio = radios.nth(0);
    const secondRadio = radios.nth(1);
    const thirdRadio = radios.nth(2);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName} disabled></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
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
      <button tabindex="0">First</button>
      <${tagName} disabled>
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
      </${tagName}>
      <button tabindex="0">Second</button>
    `);

    await expect(element).toHaveAttribute('disabled');

    await first.focus();

    await expect(first).toBeFocused();

    await first.press('Tab');

    await expect(second).toBeFocused();
  });

  test('should NOT be focusable via click when disabled', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const radios = element.locator(RadioTagName);
    const button = page.locator('button', { hasText: 'Button' });

    await fastPage.setTemplate(/* html */ `
      <button>Button</button>
      <${tagName}>
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
      </${tagName}>
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
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate({
      attributes: {
        value: 'foo',
      },
      innerHTML: /* html */ `
        <${RadioTagName} value="foo"></${RadioTagName}>
        <${RadioTagName} value="bar"></${RadioTagName}>
        <${RadioTagName} value="baz"></${RadioTagName}>
      `,
    });

    await expect(radios.nth(0)).toHaveAttribute('tabindex', '0');
  });

  test("should set tabindex of 0 to a child radio that's initially checked", async ({ fastPage }) => {
    const { element } = fastPage;
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${RadioTagName} value="foo"></${RadioTagName}>
        <${RadioTagName} value="bar" checked></${RadioTagName}>
        <${RadioTagName} value="baz"></${RadioTagName}>
      `,
    });

    await expect(radios.nth(1)).toHaveAttribute('tabindex', '0');
  });

  test('should check the first radio with a matching `value`', async ({ fastPage }) => {
    const { element } = fastPage;
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate(/* html */ `
      <${tagName} value="bar">
        <${RadioTagName} id="radio-1" name="radio" value="foo"></${RadioTagName}>
        <${RadioTagName} id="radio-2" name="radio" value="bar"></${RadioTagName}>
        <${RadioTagName} id="radio-3" name="radio" value="baz"></${RadioTagName}>
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
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate(/* html */ `
      <${tagName}>
        <${RadioTagName} id="radio-1" name="radio" value="foo"></${RadioTagName}>
        <${RadioTagName} id="radio-2" name="radio" value="bar"></${RadioTagName}>
        <${RadioTagName} id="radio-3" name="radio" value="baz"></${RadioTagName}>
      </${tagName}>
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
    const element = page.locator(tagName);
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${RadioTagName} id="radio-1" name="radio" value="foo"></${RadioTagName}>
        <${RadioTagName} id="radio-2" name="radio" value="bar"></${RadioTagName}>
        <${RadioTagName} id="radio-3" name="radio" value="baz"></${RadioTagName}>
      `,
    });

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
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate({
      attributes: {
        value: 'foo',
      },
      innerHTML: /* html */ `
        <${RadioTagName} value="foo"></${RadioTagName}>
        <${RadioTagName} value="bar"></${RadioTagName}>
        <${RadioTagName} value="baz"></${RadioTagName}>
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
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${RadioTagName} value="foo" checked></${RadioTagName}>
        <${RadioTagName} value="bar" checked></${RadioTagName}>
        <${RadioTagName} value="baz" checked></${RadioTagName}>
      `,
    });

    expect(await radios.evaluateAll((radios: Radio[]) => radios.filter(radio => radio.checked).length)).toBe(1);

    await expect(radios.nth(0)).toHaveJSProperty('checked', false);

    await expect(radios.nth(1)).toHaveJSProperty('checked', false);

    await expect(radios.nth(2)).toHaveJSProperty('checked', true);
  });

  test('should mark radio matching value on radio-group over any checked attributes', async ({ fastPage }) => {
    const { element } = fastPage;
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate({
      attributes: { value: 'foo' },
      innerHTML: /* html */ `
        <${RadioTagName} value="foo"></${RadioTagName}>
        <${RadioTagName} value="bar" checked></${RadioTagName}>
        <${RadioTagName} value="baz"></${RadioTagName}>
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
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate(/* html */ `
      <form>
        <${tagName}>
          <${RadioTagName} name="radio" value="foo"></${RadioTagName}>
          <${RadioTagName} name="radio" value="bar" checked></${RadioTagName}>
          <${RadioTagName} name="radio" value="baz"></${RadioTagName}>
        </${tagName}>
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
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
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
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${RadioTagName} disabled></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
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
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${RadioTagName} disabled></${RadioTagName}>
        <${RadioTagName} disabled></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
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
        <${RadioTagName} disabled></${RadioTagName}>
        <${RadioTagName} disabled></${RadioTagName}>
        <${RadioTagName} disabled></${RadioTagName}>
      `,
    });

    await page.keyboard.press('Tab');

    await expect(element).not.toBeFocused();
  });

  test('should move focus to the next radio when the radio group is focused and the arrow down key is pressed', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate(/* html */ `
      <button data-testid="before">before</button>
      <${tagName}>
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
      </${tagName}>
    `);

    await page.getByTestId('before').focus();
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
        <${RadioTagName} name="foo"></${RadioTagName}>
        <${RadioTagName} name="foo"></${RadioTagName}>
        <${RadioTagName} name="foo"></${RadioTagName}>
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
        <${RadioTagName} name="foo"></${RadioTagName}>
        <${RadioTagName} name="bar"></${RadioTagName}>
        <${RadioTagName} name="baz"></${RadioTagName}>
      `,
    });

    await expect(element).not.toHaveAttribute('name');
  });

  test('should set the `name` attribute of the radios to the `name` attribute of the radio group', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate({
      attributes: { name: 'foo' },
      innerHTML: /* html */ `
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
        <${RadioTagName}></${RadioTagName}>
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
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate({
      attributes: { name: 'foo' },
      innerHTML: /* html */ `
        <${RadioTagName} name="bar"></${RadioTagName}>
        <${RadioTagName} name="baz"></${RadioTagName}>
        <${RadioTagName} name="qux"></${RadioTagName}>
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
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate(/* html */ `
      <form>
        <${tagName} name="radio">
          <${RadioTagName} value="foo"></${RadioTagName}>
          <${RadioTagName} value="bar"></${RadioTagName}>
          <${RadioTagName} value="baz"></${RadioTagName}>
        </${tagName}>
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
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate(/* html */ `
      <form>
        <${tagName} name="radio" disabled>
          <${RadioTagName} value="foo"></${RadioTagName}>
          <${RadioTagName} value="bar"></${RadioTagName}>
          <${RadioTagName} value="baz"></${RadioTagName}>
        </${tagName}>
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
    const radios = element.locator(RadioTagName);

    await fastPage.setTemplate(/* html */ `
      <form>
        <${tagName}>
          <${RadioTagName} value="foo"></${RadioTagName}>
          <${RadioTagName} value="bar"></${RadioTagName}>
          <${RadioTagName} value="baz"></${RadioTagName}>
        </${tagName}>
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
        <${tagName} name="radio" value="foo"></${tagName}>
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
    const radios = element.locator(RadioTagName);
    const button = page.locator('button');

    await fastPage.setTemplate(/* html */ `
      <form>
        <${tagName} name="radio">
          <${RadioTagName} disabled value="foo"></${RadioTagName}>
          <${RadioTagName} disabled value="bar"></${RadioTagName}>
          <${RadioTagName} disabled value="baz"></${RadioTagName}>
        </${tagName}>
        <button type="submit">submit</button>
      </form>
    `);

    await radios.nth(1).click();

    await expect(radios.nth(1)).toHaveJSProperty('checked', false);

    await button.click();

    await expect(page).not.toHaveURL(/radio=/);
  });

  test('should NOT check the first radio when the group gains focus and check when space is hit', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const radios = element.locator(RadioTagName);
    const before = page.getByTestId('before');

    await fastPage.setTemplate(/* html */ `
      <button data-testid="before">before</button>
      <${tagName} name="radio">
        <${RadioTagName} value="foo"></${RadioTagName}>
        <${RadioTagName} value="bar"></${RadioTagName}>
        <${RadioTagName} value="baz"></${RadioTagName}>
      </${tagName}>
    `);

    await before.focus();
    await page.keyboard.press('Tab');

    await expect(radios.nth(0)).toBeFocused();
    await expect(radios.nth(0)).toHaveJSProperty('checked', false);

    await page.keyboard.press('Space');
    await expect(radios.nth(0)).toHaveJSProperty('checked', true);
  });

  test('should check the second radio when the focus is moved to it by directional navigation', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const radios = element.locator(RadioTagName);
    const before = page.getByTestId('before');

    await fastPage.setTemplate(/* html */ `
      <button data-testid="before">before</button>
      <${tagName} name="radio">
        <${RadioTagName} value="foo"></${RadioTagName}>
        <${RadioTagName} value="bar"></${RadioTagName}>
        <${RadioTagName} value="baz"></${RadioTagName}>
      </${tagName}>
    `);

    await before.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');

    await expect(radios.nth(1)).toBeFocused();
    await expect(radios.nth(1)).toHaveJSProperty('checked', true);
  });
});
