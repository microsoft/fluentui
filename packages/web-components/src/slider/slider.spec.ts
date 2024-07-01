import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { Direction } from '@microsoft/fast-web-utilities';
import { fixtureURL } from '../helpers.tests.js';
import type { Slider } from './slider.js';

test.describe('Slider', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-slider');

    root = page.locator('#root');

    await page.goto(fixtureURL('components-slider--slider'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  // Foundation tests
  test('should have a default role of `slider`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });
    await expect(element).toHaveJSProperty('elementInternals.role', 'slider');
  });

  test('should have default min and max if `min` and `max` attributes are not set', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });

    await expect(element).toHaveJSProperty('minAsNumber', 0);
    await expect(element).toHaveJSProperty('maxAsNumber', 100);
  });

  test('should reference connected <label> elements', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <label for="slider">Label 1</label>
        <fluent-slider id="slider"></fluent-slider>
        <label for="slider">Label 2</label>
      `;
    });

    await expect(element).toHaveJSProperty('labels.length', 2);
    expect(await element.evaluate((el: Slider) => el.labels[0].textContent)).toBe('Label 1');
    expect(await element.evaluate((el: Slider) => el.labels[1].textContent)).toBe('Label 2');
  });

  test('should set a `tabindex` of 0', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });

    await expect(element).toHaveAttribute('tabindex', '0');
  });

  test('should NOT set default `elementInternals.ariaDisabled` when `disabled` is not defined', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');
  });

  test('should set a default `elementInternals.ariaOrientation` when `orientation` is not defined', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should initialize to the initial value if no value property is set', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });

    await expect(element).toHaveJSProperty('value', '50');
  });

  test('should set `elementInternals.ariaDisabled` when `disabled` is present', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider disabled></fluent-slider>
        `;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');
  });

  test('should set the `elementInternals.ariaDisabled` when `disabled` value is true', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });

    await element.evaluate((node: Slider) => {
      node.disabled = true;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');

    await element.evaluate((node: Slider) => {
      node.disabled = false;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');
  });

  test('should NOT set a tabindex when `disabled` value is true', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });

    await element.evaluate((node: Slider) => {
      node.disabled = true;
    });

    await expect(element).not.toHaveAttribute('tabindex', '0');
  });

  test('should set `elementInternals.ariaOrientation` equal to the `orientation` value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });

    await element.evaluate((node: Slider) => {
      node.orientation = 'horizontal';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');

    await element.evaluate((node: Slider) => {
      node.orientation = 'vertical';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');
  });

  test('should set direction equal to the `direction` value', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
              <fluent-slider></fluent-slider>
          `;
    });

    await element.evaluate((node: Slider) => {
      node.direction = 'ltr' as Direction;
    });

    await expect(element).toHaveJSProperty('direction', 'ltr');

    await element.evaluate((node: Slider) => {
      node.direction = 'rtl' as Direction;
    });

    await expect(element).toHaveJSProperty('direction', 'rtl');
  });

  test('should set and retrieve the `size` property correctly', async () => {
    await element.evaluate((node: Slider) => {
      node.size = 'small';
    });

    await expect(element).toHaveJSProperty('size', 'small');

    await element.evaluate((node: Slider) => {
      node.size = 'medium';
    });

    await expect(element).toHaveJSProperty('size', 'medium');
  });

  test('should set `elementInternals.ariaValueNow` with the `value` property when provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });

    await element.evaluate((node: Slider) => {
      node.value = '8';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '8');
  });

  test('should set `elementInternals.ariaValueMin` with the `min` property when provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });

    await element.evaluate((node: Slider) => {
      node.min = '0';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueMin', '0');
  });

  test('should set `elementInternals.ariaValueMax` attribute with the `max` property when provided', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });

    await element.evaluate((node: Slider) => {
      node.max = '75';
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueMax', '75');
  });

  test.describe('valueAsNumber', () => {
    test('should allow setting value with number', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                <fluent-slider></fluent-slider>
            `;
      });

      await element.evaluate((node: Slider) => {
        node.valueAsNumber = 8;
      });

      await expect(element).toHaveJSProperty('value', '8');
    });

    test('should allow reading value as number', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                <fluent-slider></fluent-slider>
            `;
      });

      await element.evaluate((node: Slider) => {
        node.value = '8';
      });

      await expect(element).toHaveJSProperty('valueAsNumber', 8);
    });
  });

  test('should set `elementInternals.ariaValueText` attribute with the result of the valueTextFormatter() method', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });

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
    test('should increment the value when the `increment()` method is invoked', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                <fluent-slider min="0" max="100" value="50" step="5"></fluent-slider>
            `;
      });

      await element.evaluate((node: Slider) => {
        node.increment();
      });

      await expect(element).toHaveJSProperty('value', '55');
      await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '55');
    });

    test('should decrement the value when the `decrement()` method is invoked', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                <fluent-slider min="0" max="100" value="50" step="5"></fluent-slider>
            `;
      });

      await element.evaluate((node: Slider) => {
        node.decrement();
      });

      await expect(element).toHaveJSProperty('value', '45');
      await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '45');
    });

    test('should increment the value when the `increment()` method is invoked and step is not provided', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                <fluent-slider min="0" max="100" value="50"></fluent-slider>
            `;
      });

      await element.evaluate((node: Slider) => {
        node.increment();
      });

      await expect(element).toHaveJSProperty('value', '51');
      await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '51');
    });

    test('should decrement the value when the `decrement()` method is invoked and step is not provided', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                <fluent-slider min="0" max="100" value="50"></fluent-slider>
            `;
      });

      await element.evaluate((node: Slider) => {
        node.decrement();
      });

      await expect(element).toHaveJSProperty('value', '49');
      await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '49');
    });
  });

  test('should increase or decrease the slider value on arrow left/right keys', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <form>
                <fluent-slider min="0" max="100"></fluent-slider>
            </form>
        `;
    });

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

  test('should increase or decrease the slider value on arrow up/down keys', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <form>
                <fluent-slider min="0" max="100"></fluent-slider>
            </form>
        `;
    });

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

  test('should constrain and normalize the value between `min` and `max` when the value is out of range', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider min="0" max="100"></fluent-slider>
        `;
    });

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

  test('should initialize to the provided value attribute if set pre-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider value="4"></fluent-slider>
        `;
    });

    await element.waitFor({ state: 'attached' });

    await expect(element).toHaveJSProperty('value', '4');
    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '4');
  });

  test('should initialize to the provided value attribute if set post-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider></fluent-slider>
        `;
    });

    await element.evaluate((node: Slider) => {
      node.setAttribute('value', '3');
    });

    await expect(element).toHaveJSProperty('value', '3');
    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '3');
  });

  test('should initialize to the provided value property if set pre-connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = '';

      const slider = document.createElement('fluent-slider') as Slider;
      slider.value = '3';
      node.appendChild(slider);
    });

    await expect(element).toHaveJSProperty('value', '3');
    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '3');
  });

  test('should update the `stepMultiplier` when the `step` attribute has been updated', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
            <fluent-slider step="2" value="4"></fluent-slider>
        `;
    });

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

  test.describe("when the owning form's reset() method is invoked", () => {
    test('should reset its `value` property to the midpoint if no `value` attribute is set', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                <form>
                    <fluent-slider></fluent-slider>
                </form>
            `;
      });

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

    test('should reset its `value` property to match the `value` attribute when it is set', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                <form>
                    <fluent-slider min="0" max="100"></fluent-slider>
                </form>
            `;
      });

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

    test('should put the control into a clean state, where the value attribute changes the value property prior to user or programmatic interaction', async () => {
      await root.evaluate(node => {
        node.innerHTML = /* html */ `
                <form>
                    <fluent-slider min="0" max="100"></fluent-slider>
                </form>
            `;
      });

      const form = page.locator('form');

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
});
