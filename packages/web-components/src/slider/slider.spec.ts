import { expect, test } from '../../test/playwright/index.js';
import type { Slider } from './slider.js';
import { SliderSize } from './slider.options.js';

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

test.describe('Slider', () => {
  test.use({
    tagName: 'fluent-slider',
  });

  // Foundation tests

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-slider');
    });

    expect(hasError).toBe(false);
  });

  test('should have a default role of `slider`', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.role', 'slider');
  });

  test('should have default empty string values if `min`, `max`, and `step` attributes are not set', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('min', '');

    await expect(element).toHaveJSProperty('max', '');

    await expect(element).toHaveJSProperty('step', '');
  });

  test('should reference connected `<label>` elements', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <label for="slider">Label 1</label>
      <fluent-slider id="slider"></fluent-slider>
      <label for="slider">Label 2</label>
    `);

    await expect(element).toHaveJSProperty('labels.length', 2);

    expect(await element.evaluate((el: Slider) => el.labels[0].textContent)).toBe('Label 1');

    expect(await element.evaluate((el: Slider) => el.labels[1].textContent)).toBe('Label 2');
  });

  test('should set a `tabindex` of 0', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveAttribute('tabindex', '0');
  });

  test('should set a default `elementInternals.ariaOrientation` when `orientation` is not defined', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should initialize to the initial value if no value property is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('value', '50');
  });

  test('should NOT set default `elementInternals.ariaDisabled` when `disabled` is not defined', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');
  });

  test('should set `elementInternals.ariaDisabled` when the `disabled` attribute is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');
  });

  test('should set the `elementInternals.ariaDisabled` when `disabled` property is true', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');

    await element.evaluate((node: Slider) => {
      node.disabled = true;
    });

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');
  });

  test('should set a negative `tabindex` when `disabled` is true', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await expect(element).toHaveAttribute('tabindex', '-1');
  });

  test('should be enabled/disabled by the associated fieldset', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const fieldset = page.locator('fieldset');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fieldset>
          <fluent-slider></fluent-slider>
        </fieldset>
      </form>
    `);

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

  test('should set `elementInternals.ariaOrientation` to `horizontal` when `orientation` is set to `horizontal`', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { orientation: 'horizontal' } });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should set `elementInternals.ariaOrientation` to `vertical` when `orientation` is set to `vertical`', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { orientation: 'vertical' } });

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'vertical');
  });

  for (const size of Object.values(SliderSize)) {
    test(`should set the \`size\` property to \`${size}\` when the \`size\` attribute is set to \`${size}\``, async ({
      fastPage,
    }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { size } });

      await expect(element).toHaveJSProperty('size', size);
    });
  }

  test('should set `elementInternals.ariaValueNow` with the `value` property when provided', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { value: '8' } });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '8');
  });

  test('should set `elementInternals.ariaValueMin` with the `min` property when provided', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { min: '0' } });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueMin', '0');
  });

  test('should set `elementInternals.ariaValueMax` attribute with the `max` property when provided', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { max: '75' } });

    await expect(element).toHaveJSProperty('elementInternals.ariaValueMax', '75');
  });

  test.describe('valueAsNumber', () => {
    test('should allow setting value with number', async ({ fastPage }) => {
      const { element } = fastPage;

      await element.evaluate((node: Slider) => {
        node.valueAsNumber = 8;
      });

      await expect(element).toHaveJSProperty('value', '8');
    });

    test('should allow reading value as number', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { value: '8' } });

      await expect(element).toHaveJSProperty('valueAsNumber', 8);
    });
  });

  test('should set `elementInternals.ariaValueText` attribute with the result of the valueTextFormatter() method', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

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
    test('should increment the value when the `increment()` method is invoked', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { min: '0', max: '100', value: '50', step: '5' } });

      await element.evaluate((node: Slider) => {
        node.increment();
      });

      await expect(element).toHaveJSProperty('value', '55');
      await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '55');
    });

    test('should decrement the value when the `decrement()` method is invoked', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { min: '0', max: '100', value: '50', step: '5' } });

      await element.evaluate((node: Slider) => {
        node.decrement();
      });

      await expect(element).toHaveJSProperty('value', '45');
      await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '45');
    });

    test('should increment the value when the `increment()` method is invoked and step is not provided', async ({
      fastPage,
    }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { min: '0', max: '100', value: '50' } });

      await element.evaluate((node: Slider) => {
        node.increment();
      });

      await expect(element).toHaveJSProperty('value', '51');
      await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '51');
    });

    test('should decrement the value when the `decrement()` method is invoked and step is not provided', async ({
      fastPage,
    }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { min: '0', max: '100', value: '50' } });

      await element.evaluate((node: Slider) => {
        node.decrement();
      });

      await expect(element).toHaveJSProperty('value', '49');
      await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '49');
    });
  });

  test('should increase or decrease the slider value on arrow left/right keys', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-slider min="0" max="100"></fluent-slider>
      </form>
    `);

    await element.focus();

    await element.evaluate((node: Slider) => {
      node.value = '7';
    });

    await expect(element).toHaveJSProperty('value', '7');

    await element.press('ArrowLeft');

    await expect(element).toHaveJSProperty('value', '6');

    await element.press('ArrowRight');

    await expect(element).toHaveJSProperty('value', '7');
  });

  test('should increase or decrease the slider value on arrow up/down keys', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form>
        <fluent-slider min="0" max="100"></fluent-slider>
      </form>
    `);

    await element.focus();

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
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { min: '0', max: '100' } });

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
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { min: '0', max: '100', step: '20' } });

    await element.evaluate<void, any>(node => {
      node.min = 20;
      node.max = 110;
      node.step = 10;
    });

    await expect(element).toHaveJSProperty('min', '20');
    await expect(element).toHaveJSProperty('max', '110');
    await expect(element).toHaveJSProperty('step', '10');
  });

  test('should set to empty strings if `min`, `max`, and `step` to be set as invalid values', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { min: '10', max: '200', step: '20' } });

    await element.evaluate<void, any>(node => {
      node.min = undefined;
      node.max = null;
      node.step = 'not a number';
    });

    await expect(element).toHaveJSProperty('min', '');
    await expect(element).toHaveJSProperty('max', '');
    await expect(element).toHaveJSProperty('step', '');
  });

  test('should initialize to the provided value attribute when set pre-connection', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { value: '4' } });

    await element.waitFor({ state: 'attached' });

    await expect(element).toHaveJSProperty('value', '4');

    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '4');
  });

  test('should initialize to the provided value property when set pre-connection', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate('');

    await page.evaluate(() => {
      const slider = document.createElement('fluent-slider') as Slider;

      slider.value = '3';

      document.body.appendChild(slider);
    });

    await expect(element).toHaveJSProperty('value', '3');
    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '3');
  });

  test('should initialize to the provided value attribute when set post-connection', async ({ fastPage }) => {
    const { element } = fastPage;

    await element.evaluate((node: Slider) => {
      node.setAttribute('value', '3');
    });

    await expect(element).toHaveJSProperty('value', '3');
    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '3');
  });

  test('should update the `stepMultiplier` when the `step` attribute has been updated', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { step: '2', value: '4' } });

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
    test('should reset its `value` property to the midpoint if no `value` attribute is set', async ({
      fastPage,
      page,
    }) => {
      const { element } = fastPage;

      await fastPage.setTemplate(/* html */ `
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

    test('should reset its `value` property to match the `value` attribute when it is set', async ({
      fastPage,
      page,
    }) => {
      const { element } = fastPage;

      await fastPage.setTemplate(/* html */ `
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
      fastPage,
      page,
    }) => {
      const { element } = fastPage;
      const form = page.locator('form');

      await fastPage.setTemplate(/* html */ `
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
    test('should emit `change` event when `value` property changed', async ({ fastPage }) => {
      const { element } = fastPage;

      const wasChanged = element.evaluate(
        node => new Promise(resolve => node.addEventListener('change', () => resolve(true))),
      );

      await element.evaluate((node: Slider) => {
        node.value = '10';
      });

      await expect(wasChanged).resolves.toEqual(true);
    });

    test('should emit `change` event if the `value` attribute changed', async ({ fastPage }) => {
      const { element } = fastPage;

      const wasChanged = element.evaluate(
        node => new Promise(resolve => node.addEventListener('change', () => resolve(true))),
      );

      element.evaluate((node: Slider) => {
        node.setAttribute('value', '10');
      });

      await expect(wasChanged).resolves.toEqual(true);
    });

    test('should emit `change` event if changes on `min` causes `value` change', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { min: '10', value: '20', max: '30' } });

      const wasChanged = element.evaluate(
        node => new Promise(resolve => node.addEventListener('change', () => resolve(true))),
      );

      await element.evaluate((node: Slider) => {
        node.min = '21';
      });

      await expect(wasChanged).resolves.toEqual(true);
    });

    test('should emit `change` event if changes on `max` causes `value` change', async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { min: '10', value: '20', max: '30' } });

      const wasChanged = element.evaluate(
        node => new Promise(resolve => node.addEventListener('change', () => resolve(true))),
      );

      await element.evaluate((node: Slider) => {
        node.max = '19';
      });

      await expect(wasChanged).resolves.toEqual(true);
    });

    test('should emit `change` event if changes on `step` causes `value` change', async ({ fastPage, page }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { min: '10', value: '20', step: '10', max: '30' } });

      const wasChanged = element.evaluate(
        node => new Promise(resolve => node.addEventListener('change', () => resolve(true))),
      );

      await element.evaluate((node: Slider) => {
        node.step = '11';
      });

      await expect(wasChanged).resolves.toEqual(true);
    });
  });

  test.describe('thumb position', () => {
    test('should follow pointer event coordinates in horizontal orientation', async ({
      fastPage,
      page,
      browserName,
    }) => {
      const { element } = fastPage;

      const track = element.locator('.track');
      const thumb = element.locator('.thumb-container');
      const trackBox = (await track.boundingBox()) as BoundingBox;

      expect(trackBox).not.toBeNull();

      let thumbBox = (await thumb.boundingBox()) as BoundingBox;
      expect(thumbBox).not.toBeNull();

      const thumbCenterX = thumbBox.x + thumbBox.width / 2;
      const thumbCenterY = thumbBox.y + thumbBox.height / 2;
      const thumbMoveToX = thumbCenterX - trackBox.width * 0.1;
      await page.mouse.move(thumbCenterX, thumbCenterY);
      await page.mouse.down();
      await page.mouse.move(thumbMoveToX, thumbCenterY);
      await page.mouse.up();

      await expect(element).toHaveJSProperty('valueAsNumber', 40);

      // This is too flaky in webkit
      if (browserName !== 'webkit') {
        thumbBox = (await thumb.boundingBox()) as BoundingBox;
        expect(thumbBox).not.toBeNull();
        expect(thumbBox.x + thumbBox.width / 2).toBeCloseTo(thumbMoveToX);
        expect(thumbBox.y + thumbBox.height / 2).toBeCloseTo(thumbCenterY);
      }
    });

    test('should follow pointer event coordinates in horizontal orientation in RTL', async ({
      fastPage,
      page,
      browserName,
    }) => {
      await fastPage.setTemplate({
        attributes: {
          dir: 'rtl',
        },
      });

      const { element } = fastPage;

      const track = element.locator('.track');
      const thumb = element.locator('.thumb-container');
      const trackBox = (await track.boundingBox()) as BoundingBox;

      expect(trackBox).not.toBeNull();

      let thumbBox = (await thumb.boundingBox()) as BoundingBox;
      expect(thumbBox).not.toBeNull();

      const thumbCenterX = thumbBox.x + thumbBox.width / 2;
      const thumbCenterY = thumbBox.y + thumbBox.height / 2;
      const thumbMoveToX = thumbCenterX - trackBox.width * 0.1;
      await page.mouse.move(thumbCenterX, thumbCenterY);
      await page.mouse.down();
      await page.mouse.move(thumbMoveToX, thumbCenterY);
      await page.mouse.up();

      await expect(element).toHaveJSProperty('valueAsNumber', 60);

      // This is too flaky in webkit
      if (browserName !== 'webkit') {
        thumbBox = (await thumb.boundingBox()) as BoundingBox;
        expect(thumbBox).not.toBeNull();
        expect(thumbBox.x + thumbBox.width / 2).toBeCloseTo(thumbMoveToX);
        expect(thumbBox.y + thumbBox.height / 2).toBeCloseTo(thumbCenterY);
      }
    });

    test('should follow pointer event coordinates in vertical orientation', async ({ fastPage, page, browserName }) => {
      const { element } = fastPage;
      await fastPage.setTemplate({ attributes: { orientation: 'vertical' } });
      const elementBox = (await element.boundingBox()) as BoundingBox;

      expect(elementBox.width).toBeLessThan(elementBox.height);

      const track = element.locator('.track');
      const thumb = element.locator('.thumb-container');
      const trackBox = (await track.boundingBox()) as BoundingBox;

      expect(trackBox).not.toBeNull();

      let thumbBox = (await thumb.boundingBox()) as BoundingBox;
      expect(thumbBox).not.toBeNull();

      const thumbCenterX = thumbBox.x + thumbBox.width / 2;
      const thumbCenterY = thumbBox.y + thumbBox.height / 2;
      const thumbMoveToY = thumbCenterY - trackBox.height * 0.3;
      await page.mouse.move(thumbCenterX, thumbCenterY);
      await page.mouse.down();
      await page.mouse.move(thumbCenterX, thumbMoveToY);
      await page.mouse.up();

      await expect(element).toHaveJSProperty('valueAsNumber', 80);

      // This is too flaky in webkit
      if (browserName !== 'webkit') {
        thumbBox = (await thumb.boundingBox()) as BoundingBox;
        expect(thumbBox).not.toBeNull();
        expect(thumbBox.x + thumbBox.width / 2).toBeCloseTo(thumbCenterX);
        expect(thumbBox.y + thumbBox.height / 2).toBeCloseTo(thumbMoveToY);
      }
    });

    test('should follow pointer event coordinates in vertical orientation in RTL', async ({
      fastPage,
      page,
      browserName,
    }) => {
      const { element } = fastPage;
      await fastPage.setTemplate({
        attributes: {
          orientation: 'vertical',
          dir: 'rtl',
        },
      });
      const elementBox = (await element.boundingBox()) as BoundingBox;

      expect(elementBox.width).toBeLessThan(elementBox.height);

      const track = element.locator('.track');
      const thumb = element.locator('.thumb-container');
      const trackBox = (await track.boundingBox()) as BoundingBox;

      expect(trackBox).not.toBeNull();

      let thumbBox = (await thumb.boundingBox()) as BoundingBox;
      expect(thumbBox).not.toBeNull();

      const thumbCenterX = thumbBox.x + thumbBox.width / 2;
      const thumbCenterY = thumbBox.y + thumbBox.height / 2;
      const thumbMoveToY = thumbCenterY - trackBox.height * 0.3;
      await page.mouse.move(thumbCenterX, thumbCenterY);
      await page.mouse.down();
      await page.mouse.move(thumbCenterX, thumbMoveToY);
      await page.mouse.up();

      await expect(element).toHaveJSProperty('valueAsNumber', 80);

      // This is too flaky in webkit
      if (browserName !== 'webkit') {
        thumbBox = (await thumb.boundingBox()) as BoundingBox;
        expect(thumbBox).not.toBeNull();
        expect(thumbBox.x + thumbBox.width / 2).toBeCloseTo(thumbCenterX);
        expect(thumbBox.y + thumbBox.height / 2).toBeCloseTo(thumbMoveToY);
      }
    });
  });

  test('should allow keyboard interactions after clicking on the thumb', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const thumb = element.locator('.thumb-container');

    await expect(element).toHaveJSProperty('valueAsNumber', 50);

    await thumb.click();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight', { delay: 10 });
    await page.keyboard.press('ArrowRight', { delay: 10 });

    await expect(element).toHaveJSProperty('valueAsNumber', 53);
  });
});
