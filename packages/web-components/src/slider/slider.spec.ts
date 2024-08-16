import type { Direction } from '@microsoft/fast-web-utilities';
import { test } from '@playwright/test';
import { expect, fixtureURL } from '../helpers.tests.js';
import type { Slider } from './slider.js';

test.describe('Slider', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-slider--slider'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-slider'));
  });

  // Foundation tests
  test('should have a default role of `slider`', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await expect(element).toHaveJSProperty('elementInternals.role', 'slider');
  });

  test('should have default empty string values if `min`, `max`, and `step` attributes are not set', async ({
    page,
  }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await expect(element).toHaveJSProperty('min', '');

    await expect(element).toHaveJSProperty('max', '');

    await expect(element).toHaveJSProperty('step', '');
  });

  test('should reference connected <label> elements', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <label for="slider">Label 1</label>
      <fluent-slider id="slider"></fluent-slider>
      <label for="slider">Label 2</label>
    `);

    await expect(element).toHaveJSProperty('labels.length', 2);

    expect(await element.evaluate((el: Slider) => el.labels[0].textContent)).toBe('Label 1');

    expect(await element.evaluate((el: Slider) => el.labels[1].textContent)).toBe('Label 2');
  });

  test('should set a `tabindex` of 0', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await expect(element).toHaveAttribute('tabindex', '0');
  });

  test('should set a default `elementInternals.ariaOrientation` when `orientation` is not defined', async ({
    page,
  }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should initialize to the initial value if no value property is set', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await expect(element).toHaveJSProperty('value', '50');
  });

  test('should NOT set default `elementInternals.ariaDisabled` when `disabled` is not defined', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');
  });

  test('should set `elementInternals.ariaDisabled` when `disabled` is present', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider disabled></fluent-slider>
    `);

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');
  });

  test('should set the `elementInternals.ariaDisabled` when `disabled` value is true', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await element.evaluate((node: Slider) => {
      node.disabled = true;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');

    await element.evaluate((node: Slider) => {
      node.disabled = false;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');
  });

  test('should NOT set a tabindex when `disabled` value is true', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await element.evaluate((node: Slider) => {
      node.disabled = true;
    });

    await expect(element).not.toHaveAttribute('tabindex', '0');
  });

  test('should be enabled/disabled by the associated fieldset', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <form>
        <fieldset>
          <fluent-slider></fluent-slider>
        </fieldset>
      </form>
    `);

    const fieldset = page.locator('fieldset');

    await fieldset.evaluate((node: HTMLFieldSetElement) => (node.disabled = true));

    // The `disabled` property and attribute should not be affected.
    await expect(element).toHaveJSProperty('disabled', false);

    await expect(element).not.toHaveAttribute('disabled');

    // But `ariaDisabled` and `tabIndex` should be updated.
    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');

    await expect(element).toHaveAttribute('tabindex', '-1');

    await fieldset.evaluate((node: HTMLFieldSetElement) => (node.disabled = false));

    // The `disabled` property and attribute should not be affected.
    await expect(element).toHaveJSProperty('disabled', false);

    await expect(element).not.toHaveAttribute('disabled');

    // But `ariaDisabled` and `tabIndex` should be updated.
    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');

    await expect(element).toHaveAttribute('tabindex', '0');
  });

  test('should set `elementInternals.ariaOrientation` equal to the `orientation` value', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await element.evaluate((node: Slider) => {
      node.orientation = 'horizontal';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');

    await element.evaluate((node: Slider) => {
      node.orientation = 'vertical';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');
  });

  test('should set direction equal to the `direction` value', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await element.evaluate((node: Slider) => {
      node.direction = 'ltr' as Direction;
    });

    await expect(element).toHaveJSProperty('direction', 'ltr');

    await element.evaluate((node: Slider) => {
      node.direction = 'rtl' as Direction;
    });

    await expect(element).toHaveJSProperty('direction', 'rtl');
  });

  test('should set and retrieve the `size` property correctly', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await element.evaluate((node: Slider) => {
      node.size = 'small';
    });

    await expect(element).toHaveJSProperty('size', 'small');

    await element.evaluate((node: Slider) => {
      node.size = 'medium';
    });

    await expect(element).toHaveJSProperty('size', 'medium');
  });

  test('should set `elementInternals.ariaValueNow` with the `value` property when provided', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await element.evaluate((node: Slider) => {
      node.value = '8';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '8');
  });

  test('should set `elementInternals.ariaValueMin` with the `min` property when provided', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await element.evaluate((node: Slider) => {
      node.min = '0';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueMin', '0');
  });

  test('should set `elementInternals.ariaValueMax` attribute with the `max` property when provided', async ({
    page,
  }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await element.evaluate((node: Slider) => {
      node.max = '75';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueMax', '75');
  });

  test.describe('valueAsNumber', () => {
    test('should allow setting value with number', async ({ page }) => {
      const element = page.locator('fluent-slider');

      await page.setContent(/* html */ `
        <fluent-slider></fluent-slider>
      `);

      await element.evaluate((node: Slider) => {
        node.valueAsNumber = 8;
      });

      await expect(element).toHaveJSProperty('value', '8');
    });

    test('should allow reading value as number', async ({ page }) => {
      const element = page.locator('fluent-slider');

      await page.setContent(/* html */ `
        <fluent-slider></fluent-slider>
      `);

      await element.evaluate((node: Slider) => {
        node.value = '8';
      });

      await expect(element).toHaveJSProperty('valueAsNumber', 8);
    });
  });

  test('should set `elementInternals.ariaValueText` attribute with the result of the valueTextFormatter() method', async ({
    page,
  }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await element.evaluate((node: Slider) => {
      node.valueTextFormatter = () => 'Seventy Five Years';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueText', 'Seventy Five Years');

    await element.evaluate((node: Slider) => {
      node.valueTextFormatter = value => `New value is ${value}`;
      node.value = '100';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueText', 'New value is 100');
  });

  test.describe('increment and decrement methods', () => {
    test('should increment the value when the `increment()` method is invoked', async ({ page }) => {
      const element = page.locator('fluent-slider');

      await page.setContent(/* html */ `
        <fluent-slider min="0" max="100" value="50" step="5"></fluent-slider>
      `);

      await element.evaluate((node: Slider) => {
        node.increment();
      });

      await expect(element).toHaveJSProperty('value', '55');
      await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '55');
    });

    test('should decrement the value when the `decrement()` method is invoked', async ({ page }) => {
      const element = page.locator('fluent-slider');

      await page.setContent(/* html */ `
        <fluent-slider min="0" max="100" value="50" step="5"></fluent-slider>
      `);

      await element.evaluate((node: Slider) => {
        node.decrement();
      });

      await expect(element).toHaveJSProperty('value', '45');
      await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '45');
    });

    test('should increment the value when the `increment()` method is invoked and step is not provided', async ({
      page,
    }) => {
      const element = page.locator('fluent-slider');

      await page.setContent(/* html */ `
        <fluent-slider min="0" max="100" value="50"></fluent-slider>
      `);

      await element.evaluate((node: Slider) => {
        node.increment();
      });

      await expect(element).toHaveJSProperty('value', '51');
      await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '51');
    });

    test('should decrement the value when the `decrement()` method is invoked and step is not provided', async ({
      page,
    }) => {
      const element = page.locator('fluent-slider');

      await page.setContent(/* html */ `
        <fluent-slider min="0" max="100" value="50"></fluent-slider>
      `);

      await element.evaluate((node: Slider) => {
        node.decrement();
      });

      await expect(element).toHaveJSProperty('value', '49');
      await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '49');
    });
  });

  test('should increase or decrease the slider value on arrow left/right keys', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <form>
        <fluent-slider min="0" max="100"></fluent-slider>
      </form>
    `);

    await element.waitFor({ state: 'attached' });

    await element.evaluate(node => {
      node.focus();
    });

    await element.evaluate((node: Slider) => {
      node.value = '7';
    });

    await expect(element).toHaveJSProperty('value', '7');

    await element.press('ArrowLeft');

    await expect(element).toHaveJSProperty('value', '6');

    await element.press('ArrowRight');

    await expect(element).toHaveJSProperty('value', '7');
  });

  test('should increase or decrease the slider value on arrow up/down keys', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <form>
        <fluent-slider min="0" max="100"></fluent-slider>
      </form>
    `);

    await element.waitFor({ state: 'attached' });

    await element.evaluate(node => {
      node.focus();
    });

    await element.evaluate((node: Slider) => {
      node.value = '7';
    });

    await expect(element).toHaveJSProperty('value', '7');

    await element.press('ArrowDown');

    await expect(element).toHaveJSProperty('value', '6');

    await element.press('ArrowUp');

    await expect(element).toHaveJSProperty('value', '7');
  });

  test('should constrain and normalize the value between `min` and `max` when the value is out of range', async ({
    page,
  }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider min="0" max="100"></fluent-slider>
    `);

    await element.evaluate((node: Slider) => {
      node.value = '200';
    });

    await expect(element).toHaveJSProperty('value', '100');

    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '100');

    await element.evaluate((node: Slider) => {
      node.value = '-5';
    });

    await expect(element).toHaveJSProperty('value', '0');
  });

  test('should return string values for `min`, `max`, and `step` regardless the value types were used to set', async ({
    page,
  }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider min="10" max="100" step="20"></fluent-slider>
    `);

    await element.evaluate<void, any>(node => {
      node.min = 20;
      node.max = 110;
      node.step = 10;
    });

    await expect(element).toHaveJSProperty('min', '20');
    await expect(element).toHaveJSProperty('max', '110');
    await expect(element).toHaveJSProperty('step', '10');
  });

  test('should set to empty strings if `min`, `max`, and `step` to be set as invalid values', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider min="10" max="200" step="20"></fluent-slider>
    `);

    await element.evaluate<void, any>(node => {
      node.min = undefined;
      node.max = null;
      node.step = 'not a number';
    });

    await expect(element).toHaveJSProperty('min', '');
    await expect(element).toHaveJSProperty('max', '');
    await expect(element).toHaveJSProperty('step', '');
  });

  test('should initialize to the provided value attribute if set pre-connection', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider value="4"></fluent-slider>
    `);

    await element.waitFor({ state: 'attached' });

    await expect(element).toHaveJSProperty('value', '4');
    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '4');
  });

  test('should initialize to the provided value property if set pre-connection', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent('');

    await page.evaluate(() => {
      const slider = document.createElement('fluent-slider') as Slider;

      slider.value = '3';

      document.body.appendChild(slider);
    });

    await expect(element).toHaveJSProperty('value', '3');
    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '3');
  });

  test('should initialize to the provided value attribute if set post-connection', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider></fluent-slider>
    `);

    await element.evaluate((node: Slider) => {
      node.setAttribute('value', '3');
    });

    await expect(element).toHaveJSProperty('value', '3');
    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '3');
  });

  test('should update the `stepMultiplier` when the `step` attribute has been updated', async ({ page }) => {
    const element = page.locator('fluent-slider');

    await page.setContent(/* html */ `
      <fluent-slider step="2" value="4"></fluent-slider>
    `);

    await element.evaluate((node: Slider) => {
      node.increment();
    });

    await expect(element).toHaveJSProperty('value', '6');

    await element.evaluate((node: Slider) => {
      node.step = '0.1';
      node.increment();
    });

    await expect(element).toHaveJSProperty('value', '6.1');
  });

  test.describe('when the associated form’s reset() method is invoked', () => {
    test('should reset its `value` property to the midpoint if no `value` attribute is set', async ({ page }) => {
      const element = page.locator('fluent-slider');

      await page.setContent(/* html */ `
        <form>
          <fluent-slider></fluent-slider>
        </form>
      `);

      const form = page.locator('form');

      await element.evaluate((node: Slider) => {
        node.value = '3';
      });

      await expect(element).toHaveJSProperty('value', '3');

      await form.evaluate<void, HTMLFormElement>(node => {
        node.reset();
      });

      await expect(element).toHaveJSProperty('value', '50');
    });

    test('should reset its `value` property to match the `value` attribute when it is set', async ({ page }) => {
      const element = page.locator('fluent-slider');

      await page.setContent(/* html */ `
        <form>
          <fluent-slider min="0" max="100"></fluent-slider>
        </form>
      `);

      const form = page.locator('form');

      await element.evaluate((node: Slider) => {
        node.setAttribute('value', '7');
      });

      await element.evaluate((node: Slider) => {
        node.value = '8';
      });

      await expect(element).toHaveAttribute('value', '7');
      await expect(element).toHaveJSProperty('value', '8');

      await form.evaluate<void, HTMLFormElement>(node => {
        node.reset();
      });

      await expect(element).toHaveJSProperty('value', '7');
    });

    test('should put the control into a clean state, where the value attribute changes the value property prior to user or programmatic interaction', async ({
      page,
    }) => {
      const element = page.locator('fluent-slider');
      const form = page.locator('form');

      await page.setContent(/* html */ `
        <form>
          <fluent-slider min="0" max="100"></fluent-slider>
        </form>
      `);

      await element.evaluate((node: Slider) => {
        node.value = '7';
      });

      await element.evaluate((node: Slider) => {
        node.setAttribute('value', '8');
      });

      await expect(element).toHaveJSProperty('value', '8');

      await form.evaluate<void, HTMLFormElement>(node => {
        node.reset();
      });

      await expect(element).toHaveJSProperty('value', '8');

      await element.evaluate((node: Slider) => {
        node.setAttribute('value', '3');
      });

      await expect(element).toHaveJSProperty('value', '3');
    });
  });

  test.describe('`change` event', () => {
    test('should emit `change` event when `value` property changed', async ({ page }) => {
      const element = page.locator('fluent-slider');

      await page.setContent(/* html */ `
        <fluent-slider></fluent-slider>
      `);

      const [wasChanged] = await Promise.all([
        element.evaluate(
          node => new Promise(resolve => node.addEventListener('change', () => resolve(true), { once: true })),
        ),
        element.evaluate((node: Slider) => {
          node.value = '10';
        }),
      ]);

      expect(wasChanged).toEqual(true);
    });

    test('should emit `change` event if the `value` attribute changed', async ({ page }) => {
      const element = page.locator('fluent-slider');

      await page.setContent(/* html */ `
        <fluent-slider></fluent-slider>
      `);

      const [wasChanged] = await Promise.all([
        element.evaluate(
          node => new Promise(resolve => node.addEventListener('change', () => resolve(true), { once: true })),
        ),
        element.evaluate((node: Slider) => {
          node.setAttribute('value', '10');
        }),
      ]);

      expect(wasChanged).toEqual(true);
    });

    test('should emit `change` event if changes on `min` causes `value` change', async ({ page }) => {
      const element = page.locator('fluent-slider');

      await page.setContent(/* html */ `
        <fluent-slider min="10" value="20" max="30"></fluent-slider>
      `);

      const [wasChanged] = await Promise.all([
        element.evaluate(
          node => new Promise(resolve => node.addEventListener('change', () => resolve(true), { once: true })),
        ),
        element.evaluate((node: Slider) => {
          node.min = '21';
        }),
      ]);

      expect(wasChanged).toEqual(true);
    });

    test('should emit `change` event if changes on `max` causes `value` change', async ({ page }) => {
      const element = page.locator('fluent-slider');

      await page.setContent(/* html */ `
        <fluent-slider min="10" value="20" max="30"></fluent-slider>
      `);

      const [wasChanged] = await Promise.all([
        element.evaluate(
          node => new Promise(resolve => node.addEventListener('change', () => resolve(true), { once: true })),
        ),
        element.evaluate((node: Slider) => {
          node.max = '19';
        }),
      ]);

      expect(wasChanged).toEqual(true);
    });

    test('should emit `change` event if changes on `step` causes `value` change', async ({ page }) => {
      const element = page.locator('fluent-slider');

      await page.setContent(/* html */ `
        <fluent-slider min="10" value="20" step="10" max="30"></fluent-slider>
      `);

      const [wasChanged] = await Promise.all([
        element.evaluate(
          node =>
            new Promise(resolve => {
              node.addEventListener('change', () => resolve(true));
            }),
        ),
        element.evaluate((node: Slider) => {
          node.step = '11';
        }),
      ]);

      expect(wasChanged).toEqual(true);
    });
  });
});
