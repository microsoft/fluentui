import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Radio } from '../radio/index.js';
import type { RadioGroup } from './radio-group.js';

test.describe('RadioGroup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-radiogroup--radio-group'));

    await page.waitForFunction(() =>
      Promise.all([customElements.whenDefined('fluent-radio'), customElements.whenDefined('fluent-radio-group')]),
    );
  });

  test('should have a role of `radiogroup`', async ({ page }) => {
    const element = page.locator('fluent-radio-group');

    await page.setContent(/* html */ `
        <fluent-radio-group></fluent-radio-group>
    `);

    await expect(element).toHaveJSProperty('elementInternals.role', 'radiogroup');
  });

  test('should set a default `aria-orientation` value when `orientation` is not defined', async ({ page }) => {
    const element = page.locator('fluent-radio-group');

    await page.setContent(/* html */ `
        <fluent-radio-group></fluent-radio-group>
    `);

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should set the `aria-orientation` attribute equal to the `orientation` value', async ({ page }) => {
    const element = page.locator('fluent-radio-group');

    await page.setContent(/* html */ `
        <fluent-radio-group></fluent-radio-group>
    `);

    await element.evaluate((node: RadioGroup) => {
      node.orientation = 'horizontal';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');

    await element.evaluate((node: RadioGroup) => {
      node.orientation = 'vertical';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');
  });

  test('should NOT modify child radio elements disabled state when the `disabled` attribute is present', async ({
    page,
  }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio-group>
            <fluent-radio></fluent-radio>
            <fluent-radio disabled></fluent-radio>
            <fluent-radio></fluent-radio>
        </fluent-radio-group>
    `);

    const hasDisabledAttribute = await element.evaluate((node: Element) => node.hasAttribute('disabled'));
    expect(hasDisabledAttribute).toBe(false);

    const firstRadio = radios.nth(0);
    const secondRadio = radios.nth(1);
    const thirdRadio = radios.nth(2);

    const expectedFirst = await firstRadio.evaluate((node: Radio) => node.hasAttribute('disabled'));
    const expectedSecond = await secondRadio.evaluate((node: Radio) => node.hasAttribute('disabled'));
    const expectedThird = await thirdRadio.evaluate((node: Radio) => node.hasAttribute('disabled'));

    expect(await firstRadio.evaluate((radio: Radio) => radio.hasAttribute('disabled'))).toEqual(expectedFirst);

    expect(await secondRadio.evaluate((radio: Radio) => radio.hasAttribute('disabled'))).toEqual(expectedSecond);

    expect(await thirdRadio.evaluate((radio: Radio) => radio.hasAttribute('disabled'))).toEqual(expectedThird);

    element.evaluate((node: RadioGroup) => {
      node.toggleAttribute('disabled');
    });

    const hasDisabledAttributeAfter = await element.evaluate((node: Element) => node.hasAttribute('disabled'));

    expect(hasDisabledAttributeAfter).toBe(true);

    expect(await firstRadio.evaluate((radio: Radio) => radio.hasAttribute('disabled'))).toEqual(expectedFirst);

    expect(await secondRadio.evaluate((radio: Radio) => radio.hasAttribute('disabled'))).toEqual(expectedSecond);

    expect(await thirdRadio.evaluate((radio: Radio) => radio.hasAttribute('disabled'))).toEqual(expectedThird);
  });

  test('should NOT be focusable when disabled', async ({ page }) => {
    const element = page.locator('fluent-radio-group');

    const first = page.locator('button', { hasText: 'First' });
    const second = page.locator('button', { hasText: 'Second' });

    await page.setContent(/* html */ `
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

  test('should NOT be focusable via click when disabled', async ({ page }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
      <button>Button</button>
      <fluent-radio-group>
          <fluent-radio></fluent-radio>
          <fluent-radio></fluent-radio>
          <fluent-radio></fluent-radio>
      </fluent-radio-group>
  `);

    const radioItemsCount = await radios.count();
    const button = page.locator('button', { hasText: 'Button' });

    await button.focus();
    await expect(button).toBeFocused();

    for (let i = 0; i < radioItemsCount; i++) {
      const item = radios.nth(i);
      await item.click();
      await expect(item).toBeFocused();
    }

    await element.evaluate(node => node.setAttribute('disabled', ''));

    const isDisabled = await element.evaluate((node: Element) => node.hasAttribute('disabled'));

    expect(isDisabled).toBe(true);

    for (let i = 0; i < radioItemsCount; i++) {
      const item = radios.nth(i);

      // Using page.evaluate to manually simulate what would happen with a click event
      const isClickable = await page.evaluate(el => {
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        });

        // The return value of dispatchEvent will be false if any event listener called preventDefault, or true otherwise.
        return el?.dispatchEvent(event);
      }, await item.elementHandle());

      // Since the radio group is disabled, the click event should be canceled, so we expect isClickable to be false
      await expect(isClickable).toBe(false);
    }
  });

  test('should set tabindex of 0 to a child radio with a matching `value`', async ({ page }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio-group value="foo">
            <fluent-radio value="foo"></fluent-radio>
            <fluent-radio value="bar"></fluent-radio>
            <fluent-radio value="baz"></fluent-radio>
        </fluent-radio-group>
    `);

    await expect(radios.nth(0)).toHaveAttribute('tabindex', '0');
  });

  test('should check the first radio with a matching `value`', async ({ page }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
      <fluent-radio-group value="bar">
        <fluent-radio id="radio-1" name="radio" value="foo"></fluent-radio>
        <fluent-radio id="radio-2" name="radio" value="bar"></fluent-radio>
        <fluent-radio id="radio-3" name="radio" value="baz"></fluent-radio>
      </fluent-radio-group>
    `);

    await expect(radios.nth(0)).toHaveJSProperty('checked', false);

    await expect(radios.nth(1)).toHaveJSProperty('checked', true);

    await expect(radios.nth(2)).toHaveJSProperty('checked', false);
  });

  test('should set a child radio with a matching `value` to `checked` when value changes', async ({ page }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
            <fluent-radio-group value="foo">
                <fluent-radio value="foo"></fluent-radio>
                <fluent-radio value="bar"></fluent-radio>
                <fluent-radio value="baz"></fluent-radio>
        </fluent-radio-group>
    `);

    await element.evaluate((node: RadioGroup) => {
      node.value = 'bar';
    });

    await expect(radios.nth(0)).toHaveJSProperty('checked', false);

    await expect(radios.nth(1)).toHaveJSProperty('checked', true);

    await expect(radios.nth(2)).toHaveJSProperty('checked', false);
  });

  test('should mark only the last radio defaulted to checked as checked', async ({ page }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio-group>
            <fluent-radio value="foo" checked></fluent-radio>
            <fluent-radio value="bar" checked></fluent-radio>
            <fluent-radio value="baz" checked></fluent-radio>
        </fluent-radio-group>
    `);

    expect(await radios.evaluateAll((radios: Radio[]) => radios.filter(radio => radio.checked).length)).toBe(1);

    await expect(radios.nth(0)).toHaveJSProperty('checked', false);

    await expect(radios.nth(1)).toHaveJSProperty('checked', false);

    await expect(radios.nth(2)).toHaveJSProperty('checked', true);
  });

  test('should mark radio matching value on radio-group over any checked attributes', async ({ page }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio-group value="foo">
            <fluent-radio value="foo"></fluent-radio>
            <fluent-radio value="bar" checked></fluent-radio>
            <fluent-radio value="baz"></fluent-radio>
        </fluent-radio-group>
    `);

    expect(await radios.evaluateAll((radios: Radio[]) => radios.filter(radio => radio.checked).length)).toBe(1);

    await expect(radios.nth(0)).toHaveJSProperty('checked', true);

    await expect(radios.nth(1)).toHaveJSProperty('checked', false);

    await expect(radios.nth(1)).toHaveAttribute('checked');

    await expect(radios.nth(2)).toHaveJSProperty('checked', false);
  });

  test('should allow resetting of elements by the parent form', async ({ page }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
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

  test('should focus the first radio when the radio group is focused', async ({ page }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio-group>
            <fluent-radio></fluent-radio>
            <fluent-radio></fluent-radio>
            <fluent-radio></fluent-radio>
        </fluent-radio-group>
    `);

    await page.keyboard.press('Tab');

    await expect(radios.nth(0)).toBeFocused();
  });

  test('should focus the second radio when the radio group is focused and the first radio is disabled', async ({
    page,
  }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio-group>
            <fluent-radio disabled></fluent-radio>
            <fluent-radio></fluent-radio>
            <fluent-radio></fluent-radio>
        </fluent-radio-group>
    `);

    await page.keyboard.press('Tab');

    await expect(radios.nth(1)).toBeFocused();
  });

  test('should focus the third radio when the radio group is focused and the first two radios are disabled', async ({
    page,
  }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio-group>
            <fluent-radio disabled></fluent-radio>
            <fluent-radio disabled></fluent-radio>
            <fluent-radio></fluent-radio>
        </fluent-radio-group>
    `);

    await page.keyboard.press('Tab');

    await expect(radios.nth(2)).toBeFocused();
  });

  test('should NOT focus any radio when the radio group is focused and all radios are disabled', async ({ page }) => {
    const element = page.locator('fluent-radio-group');

    await page.setContent(/* html */ `
        <fluent-radio-group>
            <fluent-radio disabled></fluent-radio>
            <fluent-radio disabled></fluent-radio>
            <fluent-radio disabled></fluent-radio>
        </fluent-radio-group>
    `);

    await page.keyboard.press('Tab');

    await expect(element).not.toBeFocused();
  });

  test('should move focus to the next radio when the radio group is focused and the arrow down key is pressed', async ({
    page,
  }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio-group>
            <fluent-radio></fluent-radio>
            <fluent-radio></fluent-radio>
            <fluent-radio></fluent-radio>
        </fluent-radio-group>
    `);

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
    page,
  }) => {
    const element = page.locator('fluent-radio-group');

    await page.setContent(/* html */ `
        <fluent-radio-group>
            <fluent-radio name="foo"></fluent-radio>
            <fluent-radio name="foo"></fluent-radio>
            <fluent-radio name="foo"></fluent-radio>
        </fluent-radio-group>
    `);

    await expect(element).toHaveJSProperty('name', 'foo');
  });

  test('should NOT adopt the `name` of the radios when the radios have different `name` attributes', async ({
    page,
  }) => {
    const element = page.locator('fluent-radio-group');

    await page.setContent(/* html */ `
        <fluent-radio-group>
            <fluent-radio name="foo"></fluent-radio>
            <fluent-radio name="bar"></fluent-radio>
            <fluent-radio name="baz"></fluent-radio>
        </fluent-radio-group>
    `);

    await expect(element).not.toHaveAttribute('name');
  });

  test('should set the `name` attribute of the radios to the `name` attribute of the radio group', async ({ page }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio-group name="foo">
            <fluent-radio></fluent-radio>
            <fluent-radio></fluent-radio>
            <fluent-radio></fluent-radio>
        </fluent-radio-group>
    `);

    expect(await radios.evaluateAll((radios: Radio[]) => radios.every(radio => radio.name === 'foo'))).toBe(true);
  });

  test('should override the `name` attribute of the radios with the `name` attribute of the radio group', async ({
    page,
  }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
        <fluent-radio-group name="foo">
            <fluent-radio name="bar"></fluent-radio>
            <fluent-radio name="baz"></fluent-radio>
            <fluent-radio name="qux"></fluent-radio>
        </fluent-radio-group>
    `);

    await expect(element).toHaveAttribute('name', 'foo');

    expect(
      await radios.evaluateAll((radios: Radio[]) => radios.every(radio => radio.getAttribute('name') === 'foo')),
    ).toBe(true);

    expect(await radios.evaluateAll((radios: Radio[]) => radios.every(radio => radio.name === 'foo'))).toBe(true);
  });

  test('should submit the value of the checked radio when the radio group is in a form and the form is submitted', async ({
    page,
  }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
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
    page,
  }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
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
    page,
  }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');

    await page.setContent(/* html */ `
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
    page,
  }) => {
    await page.setContent(/* html */ `
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
    page,
  }) => {
    const element = page.locator('fluent-radio-group');
    const radios = element.locator('fluent-radio');
    const button = page.locator('button');

    await page.setContent(/* html */ `
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
