import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import type { Radio } from '../radio/index.js';
import { fixtureURL } from '../helpers.tests.js';
import type { RadioGroup } from './radio-group.js';

test.describe('Radio', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;
  let radios: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-radio-group');

    root = page.locator('#root');

    radios = element.locator('fluent-radio');

    await page.goto(fixtureURL('components-radiogroup--radio-group'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should set and retrieve the `stacked` property correctly', async () => {
    await element.evaluate((node: RadioGroup) => {
      node.stacked = true;
    });

    const isStackedTrue = await element.evaluate((node: RadioGroup) => node.stacked);
    expect(isStackedTrue).toBe(true);

    await element.evaluate((node: RadioGroup) => {
      node.stacked = false;
    });

    const isStackedFalse = await element.evaluate((node: RadioGroup) => node.stacked);
    expect(isStackedFalse).toBe(false);
  });

  test('should have a role of `radiogroup`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group></fluent-radio-group>
        `;
    });

    await expect(element).toHaveAttribute('role', 'radiogroup');
  });

  test('should set a default `aria-orientation` value when `orientation` is not defined', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group></fluent-radio-group>
        `;
    });

    await expect(element).toHaveAttribute('aria-orientation', 'horizontal');
  });

  test('should set a matching class on the `positioning-region` when an orientation is provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group></fluent-radio-group>
        `;
    });

    const positioningRegion = element.locator('.positioning-region');

    // Horizontal by default
    await expect(positioningRegion).toHaveClass(/horizontal/);

    await element.evaluate((node: RadioGroup, RadioGroupOrientation) => {
      node.orientation = 'vertical';
    });

    await expect(positioningRegion).toHaveClass(/vertical/);

    await element.evaluate((node: RadioGroup, RadioGroupOrientation) => {
      node.orientation = 'horizontal';
    });

    await expect(positioningRegion).toHaveClass(/horizontal/);
  });

  test('should set the `aria-orientation` attribute equal to the `orientation` value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group></fluent-radio-group>
        `;
    });

    await element.evaluate((node: RadioGroup, RadioGroupOrientation) => {
      node.orientation = 'horizontal';
    });

    await expect(element).toHaveAttribute('aria-orientation', 'horizontal');

    await element.evaluate((node: RadioGroup, RadioGroupOrientation) => {
      node.orientation = 'vertical';
    });

    await expect(element).toHaveAttribute('aria-orientation', 'vertical');
  });

  test('should set the `stacked` attribute equal to the `stacked` value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group></fluent-radio-group>
        `;
    });

    await element.evaluate((node: RadioGroup, RadioGroupOrientation) => {
      node.stacked = true;
    });

    await expect(element).toHaveAttribute('stacked', '');

    await element.evaluate((node: RadioGroup, RadioGroupOrientation) => {
      node.stacked = false;
    });

    await expect(element).not.toHaveAttribute('stacked', '');
  });

  test('should set the `aria-disabled` attribute when disabled', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group disabled></fluent-radio-group>
        `;
    });

    await expect(element).toHaveAttribute('aria-disabled', 'true');
  });

  test('should set the `aria-disabled` attribute equal to the `disabled` property', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group></fluent-radio-group>
        `;
    });

    const hasAriaDisabledInitially = await element.evaluate((node: Element) => node.hasAttribute('aria-disabled'));
    expect(hasAriaDisabledInitially).toBe(false);

    await element.evaluate<void, RadioGroup>(node => {
      node.disabled = true;
    });

    await expect(element).toHaveAttribute('aria-disabled', 'true');

    await element.evaluate<void, RadioGroup>(node => {
      node.disabled = false;
    });

    await expect(element).toHaveAttribute('aria-disabled', 'false');
  });

  test('should set the `aria-readonly` attribute when the `readonly` attribute is present', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group readonly></fluent-radio-group>
        `;
    });

    await expect(element).toHaveAttribute('aria-readonly', 'true');
  });

  test('should set the `aria-readonly` attribute equal to the `readonly` property', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group></fluent-radio-group>
        `;
    });

    const hasAriaReadOnly = await element.evaluate((node: Element) => node.hasAttribute('aria-readonly'));
    expect(hasAriaReadOnly).toBe(false);

    await element.evaluate<void, RadioGroup>(node => {
      node.readOnly = true;
    });

    await expect(element).toHaveAttribute('aria-readonly', 'true');

    await element.evaluate<void, RadioGroup>(node => {
      node.readOnly = false;
    });

    await expect(element).toHaveAttribute('aria-readonly', 'false');
  });

  test('should NOT set a default `aria-disabled` value when `disabled` is not defined', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group></fluent-radio-group>
        `;
    });

    const hasAriaDisabled = await element.evaluate((node: Element) => node.hasAttribute('aria-disabled'));

    expect(hasAriaDisabled).toBe(false);
  });

  test('should NOT modify child radio elements disabled state when the `disabled` attribute is present', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group>
                <fluent-radio></fluent-radio>
                <fluent-radio disabled></fluent-radio>
                <fluent-radio></fluent-radio>
            </fluent-radio-group>
        `;
    });

    const hasDisabledAttribute = await element.evaluate((node: Element) => node.hasAttribute('disabled'));
    expect(hasDisabledAttribute).toBe(false);

    const firstRadio = radios.nth(0);
    const secondRadio = radios.nth(1);
    const thirdRadio = radios.nth(2);

    const expectedFirst = await firstRadio.evaluate<boolean, Radio>(node => node.hasAttribute('disabled'));
    const expectedSecond = await secondRadio.evaluate<boolean, Radio>(node => node.hasAttribute('disabled'));
    const expectedThird = await thirdRadio.evaluate<boolean, Radio>(node => node.hasAttribute('disabled'));

    expect(await firstRadio.evaluate<boolean, Radio>(radio => radio.hasAttribute('disabled'))).toEqual(expectedFirst);

    expect(await secondRadio.evaluate<boolean, Radio>(radio => radio.hasAttribute('disabled'))).toEqual(expectedSecond);

    expect(await thirdRadio.evaluate<boolean, Radio>(radio => radio.hasAttribute('disabled'))).toEqual(expectedThird);

    element.evaluate<void, RadioGroup>(node => node.setAttribute('disabled', ''));

    const hasDisabledAttributeAfter = await element.evaluate((node: Element) => node.hasAttribute('disabled'));
    expect(hasDisabledAttributeAfter).toBe(true);

    expect(await firstRadio.evaluate<boolean, Radio>(radio => radio.hasAttribute('disabled'))).toEqual(expectedFirst);

    expect(await secondRadio.evaluate<boolean, Radio>(radio => radio.hasAttribute('disabled'))).toEqual(expectedSecond);

    expect(await thirdRadio.evaluate<boolean, Radio>(radio => radio.hasAttribute('disabled'))).toEqual(expectedThird);
  });

  test('should NOT be focusable when disabled', async () => {
    const first: Locator = page.locator('button', { hasText: 'First' });
    const second: Locator = page.locator('button', { hasText: 'Second' });

    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <button>First</button>
            <fluent-radio-group disabled>
                <fluent-radio></fluent-radio>
                <fluent-radio></fluent-radio>
                <fluent-radio></fluent-radio>
            </fluent-radio-group>
            <button>Second</button>
        `;
    });

    const isDisabled = await element.evaluate((node: Element) => node.hasAttribute('disabled'));
    expect(isDisabled).toBe(true);

    await first.focus();

    await expect(first).toBeFocused();

    await first.press('Tab');

    await expect(second).toBeFocused();

    expect(await element.evaluate<boolean, RadioGroup>(node => node.getAttribute('tabindex') === '-1')).toBeTruthy();
  });

  test('should NOT be focusable via click when disabled', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
          <button>Button</button>
          <fluent-radio-group>
              <fluent-radio></fluent-radio>
              <fluent-radio></fluent-radio>
              <fluent-radio></fluent-radio>
          </fluent-radio-group>
      `;
    });

    const radios = page.locator('fluent-radio');
    const radioItemsCount = await radios.count();
    const button = page.locator('button', { hasText: 'Button' });

    await button.focus();
    await expect(button).toBeFocused();

    for (let i = 0; i < radioItemsCount; i++) {
      const item = radios.nth(i);
      await item.click();
      await expect(item).toBeFocused();
    }

    const element = page.locator('fluent-radio-group');
    await element.evaluate(node => node.setAttribute('disabled', ''));

    const isDisabled = await element.evaluate((node: Element) => node.hasAttribute('disabled'));
    await expect(isDisabled).toBe(true);

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
  test('should set tabindex of 0 to a child radio with a matching `value`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group value="foo">
                <fluent-radio value="foo"></fluent-radio>
                <fluent-radio value="bar"></fluent-radio>
                <fluent-radio value="baz"></fluent-radio>
            </fluent-radio-group>
        `;
    });

    await expect(radios.nth(0)).toHaveAttribute('tabindex', '0');
  });

  test('should NOT set `tabindex` of 0 to a child radio if its value does not match the radiogroup `value`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group value="foo">
                <fluent-radio value="bar"></fluent-radio>
                <fluent-radio value="baz"></fluent-radio>
                <fluent-radio value="qux"></fluent-radio>
            </fluent-radio-group>
        `;
    });

    expect(
      await radios.evaluateAll(radios => radios.every(radio => radio.getAttribute('tabindex') === '-1')),
    ).toBeTruthy();
  });

  test('should set a child radio with a matching `value` to `checked`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group value="bar">
                <fluent-radio value="foo"></fluent-radio>
                <fluent-radio value="bar"></fluent-radio>
                <fluent-radio value="baz"></fluent-radio>
            </fluent-radio-group>
        `;
    });

    await expect(radios.nth(0)).not.toBeChecked();

    await expect(radios.nth(1)).toBeChecked();

    await expect(radios.nth(2)).not.toBeChecked();
  });

  test('should set a child radio with a matching `value` to `checked` when value changes', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group value="foo">
                <fluent-radio value="foo"></fluent-radio>
                <fluent-radio value="bar"></fluent-radio>
                <fluent-radio value="baz"></fluent-radio>
            </fluent-radio-group>
        `;
    });

    await element.evaluate((node: RadioGroup) => {
      node.value = 'bar';
    });

    await expect(radios.nth(0)).not.toBeChecked();

    await expect(radios.nth(1)).toBeChecked();

    await expect(radios.nth(2)).not.toBeChecked();
  });

  test('should mark only the last radio defaulted to checked as checked', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group>
                <fluent-radio value="foo" checked></fluent-radio>
                <fluent-radio value="bar" checked></fluent-radio>
                <fluent-radio value="baz" checked></fluent-radio>
            </fluent-radio-group>
        `;
    });

    expect(await radios.evaluateAll<number, Radio>(radios => radios.filter(radio => radio.checked).length)).toBe(1);

    await expect(radios.nth(0)).not.toBeChecked();

    await expect(radios.nth(1)).not.toBeChecked();

    await expect(radios.nth(2)).toBeChecked();
  });

  test('should mark radio matching value on radio-group over any checked attributes', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-radio-group value="foo">
                <fluent-radio value="foo"></fluent-radio>
                <fluent-radio value="bar" checked></fluent-radio>
                <fluent-radio value="baz"></fluent-radio>
            </fluent-radio-group>
        `;
    });

    expect(await radios.evaluateAll<number, Radio>(radios => radios.filter(radio => radio.checked).length)).toBe(1);

    await expect(radios.nth(0)).toBeChecked();

    await expect(radios.nth(1)).not.toBeChecked();

    // radio-group explicitly sets non-matching radio's checked to false if
    // a value match was found, but the attribute should still persist.
    expect(await radios.nth(1).evaluate(node => node.hasAttribute('checked'))).toBeTruthy();

    await expect(radios.nth(2)).not.toBeChecked();
  });

  test('should allow resetting of elements by the parent form', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <form>
                <fluent-radio-group>
                    <fluent-radio value="foo"></fluent-radio>
                    <fluent-radio value="bar" checked></fluent-radio>
                    <fluent-radio value="baz"></fluent-radio>
                </fluent-radio-group>
            </form>
        `;
    });

    const form = page.locator('form');

    await radios.nth(2).evaluate<void, Radio>(node => {
      node.checked = true;
    });

    await expect(radios.nth(0)).not.toBeChecked();

    await expect(radios.nth(1)).not.toBeChecked();

    await expect(radios.nth(2)).toBeChecked();

    await form.evaluate<void, HTMLFormElement>(node => {
      node.reset();
    });

    await expect(radios.nth(0)).not.toBeChecked();

    await expect(radios.nth(1)).toBeChecked();

    await expect(radios.nth(2)).not.toBeChecked();
  });
});
