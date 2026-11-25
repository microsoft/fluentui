import { expect, test } from '../../test/playwright/index.js';
import type { Slider } from './slider.js';
import { tagName } from './slider.options.js';

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

test.describe('Slider', () => {
  test.use({
    tagName,
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

  test('should have a default role of `slider`', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('elementInternals.role', 'slider');
  });

  test('should have default empty string values if `min`, `max`, and `step` attributes are not set', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('min', '');

    await expect(element).toHaveJSProperty('max', '');

    await expect(element).toHaveJSProperty('step', '');
  });

  test('should reference connected `<label>` elements', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <label for="slider">Label 1</label>
      <${tagName} id="slider"></${tagName}>
      <label for="slider">Label 2</label>
    `);

    await expect(element).toHaveJSProperty('labels.length', 2);

    expect(await element.evaluate((el: Slider) => el.labels[0].textContent)).toBe('Label 1');

    expect(await element.evaluate((el: Slider) => el.labels[1].textContent)).toBe('Label 2');
  });

  test('should set a `tabindex` of 0', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveAttribute('tabindex', '0');
  });

  test('should set a default `elementInternals.ariaOrientation` when `orientation` is not defined', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('elementInternals.ariaOrientation', 'horizontal');
  });

  test('should initialize to the initial value if no value property is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('value', '50');
  });

  test('should NOT set default `elementInternals.ariaDisabled` when `disabled` is not defined', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');
  });

  test('should set `elementInternals.ariaDisabled` when the `disabled` attribute is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');
  });

  test('should set the `elementInternals.ariaDisabled` when `disabled` property is true', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

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

    await expect(element.locator('input')).toBeDisabled();
  });

  test('should be enabled/disabled by the associated fieldset', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const fieldset = page.locator('fieldset');

    await fastPage.setTemplate(/* html */ `
      <form>
        <fieldset>
          <${tagName}></${tagName}>
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

    await expect(element.locator('input')).toBeDisabled();

    await fieldset.evaluate((node: HTMLFieldSetElement) => (node.disabled = false));

    // The `disabled` property and attribute should not be affected.
    await expect(element).toHaveJSProperty('disabled', false);

    await expect(element).not.toHaveAttribute('disabled');

    // But `ariaDisabled` and `tabIndex` should be updated.
    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');

    await expect(element).toHaveAttribute('tabindex', '0');

    await expect(element.locator('input')).toBeEnabled();
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

      await fastPage.setTemplate();

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

    await fastPage.setTemplate();

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
        <${tagName} min="0" max="100"></${tagName}>
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
        <${tagName} min="0" max="100"></${tagName}>
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

    await element.evaluate((node: Slider) => {
      Reflect.set(node, 'min', 20);
      Reflect.set(node, 'max', 110);
      Reflect.set(node, 'step', 10);
    });

    await expect(element).toHaveJSProperty('min', '20');
    await expect(element).toHaveJSProperty('max', '110');
    await expect(element).toHaveJSProperty('step', '10');
  });

  test('should set to empty strings if `min`, `max`, and `step` to be set as invalid values', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { min: '10', max: '200', step: '20' } });

    await element.evaluate((node: Slider) => {
      Reflect.set(node, 'min', undefined);
      Reflect.set(node, 'max', null);
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

    await page.evaluate(tagName => {
      const slider = document.createElement(tagName) as Slider;

      slider.value = '3';

      document.body.appendChild(slider);
    }, tagName);

    await expect(element).toHaveJSProperty('value', '3');
    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '3');
  });

  test('should initialize to the provided value attribute when set post-connection', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await element.evaluate((node: Slider) => {
      node.setAttribute('value', '3');
    });

    await expect(element).toHaveJSProperty('value', '3');
    await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', '3');
  });

  test('should use the updated fractional step when incrementing', async ({ fastPage, page }) => {
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
          <${tagName}></${tagName}>
        </form>
      `);

      const form = page.locator('form');

      await element.evaluate((node: Slider) => {
        node.value = '3';
      });

      await expect(element).toHaveJSProperty('value', '3');

      await form.evaluate((node: HTMLFormElement) => {
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
          <${tagName} min="0" max="100"></${tagName}>
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

      await form.evaluate((node: HTMLFormElement) => {
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
          <${tagName} min="0" max="100"></${tagName}>
        </form>
      `);

      await element.evaluate((node: Slider) => {
        node.value = '7';
      });

      await element.evaluate((node: Slider) => {
        node.setAttribute('value', '8');
      });

      await expect(element).toHaveJSProperty('value', '8');

      await form.evaluate((node: HTMLFormElement) => {
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

      await fastPage.setTemplate();

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

      await fastPage.setTemplate();

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
    for (const orientation of ['horizontal', 'vertical']) {
      for (const dir of ['ltr', 'rtl']) {
        for (const size of ['small', 'medium']) {
          test(`should align thumb edges with track endpoints in ${orientation} ${dir} ${size}`, async ({
            fastPage,
          }) => {
            const { element } = fastPage;
            await fastPage.setTemplate({ attributes: { orientation, dir, size, value: '0' } });

            const axis = orientation === 'vertical' ? 'y' : 'x';
            const dimension = orientation === 'vertical' ? 'height' : 'width';
            const reversed = orientation === 'vertical' || dir === 'rtl';

            for (const value of [0, 1, 99, 100]) {
              await element.evaluate((node: Slider, value) => {
                node.valueAsNumber = value;
              }, value);

              await expect
                .poll(async () => {
                  const trackBox = (await element.locator('.track').boundingBox()) as BoundingBox;
                  const thumbBox = (await element.locator('.thumb-container').boundingBox()) as BoundingBox;
                  const atPhysicalStart = value < 50 !== reversed;
                  const gap = atPhysicalStart
                    ? thumbBox[axis] - trackBox[axis]
                    : trackBox[axis] + trackBox[dimension] - thumbBox[axis] - thumbBox[dimension];
                  const expectedGap =
                    (Math.min(value, 100 - value) / 100) * (trackBox[dimension] - thumbBox[dimension]);
                  return gap - expectedGap;
                })
                .toBeCloseTo(0, 1);
            }
          });
        }
      }
    }

    test('should follow pointer event coordinates in horizontal orientation', async ({ fastPage, page }) => {
      const { element } = fastPage;

      await fastPage.setTemplate();

      const track = element.locator('.track');
      const thumb = element.locator('.thumb-container');
      const trackBox = (await track.boundingBox()) as BoundingBox;

      expect(trackBox).not.toBeNull();

      let thumbBox = (await thumb.boundingBox()) as BoundingBox;
      expect(thumbBox).not.toBeNull();

      const thumbCenterX = thumbBox.x + thumbBox.width / 2;
      const thumbCenterY = thumbBox.y + thumbBox.height / 2;
      const thumbMoveToX = thumbCenterX - (trackBox.width - thumbBox.width) * 0.1;
      await page.mouse.move(thumbCenterX, thumbCenterY);
      await page.mouse.down();
      await page.mouse.move(thumbMoveToX, thumbCenterY);
      await page.mouse.up();

      await expect(element).toHaveJSProperty('valueAsNumber', 40);

      thumbBox = (await thumb.boundingBox()) as BoundingBox;
      expect(thumbBox).not.toBeNull();
      expect(thumbBox.x + thumbBox.width / 2).toBeCloseTo(thumbMoveToX, 1);
      expect(thumbBox.y + thumbBox.height / 2).toBeCloseTo(thumbCenterY, 1);
    });

    test('should follow pointer event coordinates in horizontal orientation in RTL', async ({ fastPage, page }) => {
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
      const thumbMoveToX = thumbCenterX - (trackBox.width - thumbBox.width) * 0.1;
      await page.mouse.move(thumbCenterX, thumbCenterY);
      await page.mouse.down();
      await page.mouse.move(thumbMoveToX, thumbCenterY);
      await page.mouse.up();

      await expect(element).toHaveJSProperty('valueAsNumber', 60);

      thumbBox = (await thumb.boundingBox()) as BoundingBox;
      expect(thumbBox).not.toBeNull();
      expect(thumbBox.x + thumbBox.width / 2).toBeCloseTo(thumbMoveToX, 1);
      expect(thumbBox.y + thumbBox.height / 2).toBeCloseTo(thumbCenterY, 1);
    });

    test('should follow pointer event coordinates in vertical orientation', async ({ fastPage, page }) => {
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
      const thumbMoveToY = thumbCenterY - (trackBox.height - thumbBox.height) * 0.3;
      await page.mouse.move(thumbCenterX, thumbCenterY);
      await page.mouse.down();
      await page.mouse.move(thumbCenterX, thumbMoveToY);
      await page.mouse.up();

      await expect(element).toHaveJSProperty('valueAsNumber', 80);

      thumbBox = (await thumb.boundingBox()) as BoundingBox;
      expect(thumbBox).not.toBeNull();
      expect(thumbBox.x + thumbBox.width / 2).toBeCloseTo(thumbCenterX, 1);
      expect(thumbBox.y + thumbBox.height / 2).toBeCloseTo(thumbMoveToY, 1);
    });

    test('should follow pointer event coordinates in vertical orientation in RTL', async ({ fastPage, page }) => {
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
      const thumbMoveToY = thumbCenterY - (trackBox.height - thumbBox.height) * 0.3;
      await page.mouse.move(thumbCenterX, thumbCenterY);
      await page.mouse.down();
      await page.mouse.move(thumbCenterX, thumbMoveToY);
      await page.mouse.up();

      await expect(element).toHaveJSProperty('valueAsNumber', 80);

      thumbBox = (await thumb.boundingBox()) as BoundingBox;
      expect(thumbBox).not.toBeNull();
      expect(thumbBox.x + thumbBox.width / 2).toBeCloseTo(thumbCenterX, 1);
      expect(thumbBox.y + thumbBox.height / 2).toBeCloseTo(thumbMoveToY, 1);
    });

    test('should not change value when dragging inside a disabled fieldset', async ({ fastPage, page }) => {
      const { element } = fastPage;

      await fastPage.setTemplate(/* html */ `
        <form>
          <fieldset disabled>
            <${tagName}></${tagName}>
          </fieldset>
        </form>
      `);

      const thumb = element.locator('.thumb-container');
      const track = element.locator('.track');
      const trackBox = (await track.boundingBox()) as BoundingBox;

      expect(trackBox).not.toBeNull();

      const thumbBox = (await thumb.boundingBox()) as BoundingBox;
      expect(thumbBox).not.toBeNull();

      const thumbCenterX = thumbBox.x + thumbBox.width / 2;
      const thumbCenterY = thumbBox.y + thumbBox.height / 2;
      const thumbMoveToX = thumbCenterX - (trackBox.width - thumbBox.width) * 0.1;

      await page.mouse.move(thumbCenterX, thumbCenterY);
      await page.mouse.down();
      await page.mouse.move(thumbMoveToX, thumbCenterY);
      await page.mouse.up();

      await expect(element).toHaveJSProperty('valueAsNumber', 50);

      await expect(element.locator('input')).toBeDisabled();
    });
  });

  for (const orientation of ['horizontal', 'vertical']) {
    for (const dir of ['ltr', 'rtl']) {
      test(`should render interior step markers but omit endpoint markers in ${orientation} ${dir}`, async ({
        fastPage,
        page,
      }) => {
        const { element } = fastPage;
        await fastPage.setTemplate({ attributes: { orientation, dir, min: '10', max: '20', step: '5', value: '15' } });

        const marker = await element.evaluate((node: Slider) => {
          node.thumb.style.visibility = 'hidden';
          node.track.style.color = 'var(--colorNeutralBackground1)';
          const styles = getComputedStyle(node);
          return {
            color: getComputedStyle(node.track).color,
            inset: parseFloat(styles.getPropertyValue('--thumb-size')) / 2,
          };
        });
        const screenshot = await element.locator('.track').screenshot({ scale: 'css' });
        const colors = await page.evaluate(
          async ({ screenshot, marker, orientation, dir }) => {
            const bytes = Uint8Array.from(atob(screenshot), value => value.charCodeAt(0));
            const image = await createImageBitmap(new Blob([bytes], { type: 'image/png' }));
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext('2d');
            if (!context) {
              throw new Error('Canvas context is required to inspect step marker pixels');
            }
            context.drawImage(image, 0, 0);
            image.close();
            const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
            const horizontal = orientation === 'horizontal';
            const reversed = !horizontal || dir === 'rtl';
            const length = horizontal ? canvas.width : canvas.height;
            const start = Math.round(marker.inset);
            const end = length - start - 1;
            const pixel = (position: number) => {
              const x = horizontal ? position : Math.floor(canvas.width / 2);
              const y = horizontal ? Math.floor(canvas.height / 2) : position;
              const offset = (y * canvas.width + x) * 4;
              return Array.from(pixels.data.slice(offset, offset + 4));
            };
            context.fillStyle = marker.color;
            context.fillRect(0, 0, 1, 1);
            return {
              first: pixel(reversed ? end : start),
              last: pixel(reversed ? start : end),
              firstBackground: pixel(reversed ? end - 2 : start + 2),
              lastBackground: pixel(reversed ? start + 2 : end - 2),
              middle: pixel(Math.floor(length / 2) - (reversed ? 0 : 1)),
              expected: Array.from(context.getImageData(0, 0, 1, 1).data),
            };
          },
          { screenshot: screenshot.toString('base64'), marker, orientation, dir },
        );

        expect(colors.first).toEqual(colors.firstBackground);
        expect(colors.last).toEqual(colors.lastBackground);
        expect(colors.middle).toEqual(colors.expected);
      });
    }
  }

  test('should allow keyboard interactions after clicking on the thumb', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const thumb = element.locator('.thumb-container');

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('valueAsNumber', 50);

    const thumbBox = (await thumb.boundingBox()) as BoundingBox;
    await page.mouse.click(thumbBox.x + thumbBox.width / 2, thumbBox.y + thumbBox.height / 2);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight', { delay: 10 });
    await page.keyboard.press('ArrowRight', { delay: 10 });

    await expect(element).toHaveJSProperty('valueAsNumber', 53);
  });

  test('should synchronize the native input after public API and range changes', async ({ fastPage }) => {
    const { element } = fastPage;
    const control = element.locator('input[type="range"]');

    await fastPage.setTemplate({ attributes: { min: '10', max: '20', step: '0.5', value: '12' } });
    await expect(control).toHaveValue('12');

    const trackBox = (await element.locator('.track').boundingBox()) as BoundingBox;
    const thumb = element.locator('.thumb-container');
    const thumbBox = (await thumb.boundingBox()) as BoundingBox;
    const travel = trackBox.width - thumbBox.width;
    await element.evaluate((node: Slider) => {
      node.min = '11';
    });
    await expect
      .poll(async () => ((await thumb.boundingBox()) as BoundingBox).x - trackBox.x)
      .toBeCloseTo(travel / 9, 1);

    await element.evaluate((node: Slider) => {
      node.min = '';
    });
    await expect
      .poll(async () => ((await thumb.boundingBox()) as BoundingBox).x - trackBox.x)
      .toBeCloseTo(travel * 0.6, 1);

    await element.evaluate((node: Slider) => {
      node.min = '10';
      node.valueAsNumber = 17.5;
    });
    await expect(control).toHaveValue('17.5');

    await element.evaluate((node: Slider) => {
      node.max = '15';
    });
    await expect(control).toHaveValue('15');

    await element.evaluate((node: Slider) => {
      node.step = '2';
    });
    await expect(element).toHaveJSProperty('value', '15');
    await expect(control).toHaveValue('16');
  });

  for (const { max, step, endpoint, nativeMax, previous } of [
    { max: '15', step: '2', endpoint: '15', nativeMax: '16', previous: '14' },
    { max: '15.7', step: '2', endpoint: '15.7', nativeMax: '16', previous: '14' },
    { max: '14.2', step: '2', endpoint: '14', nativeMax: '14', previous: '12' },
    { max: '10.2', step: '1', endpoint: '10', nativeMax: '10', previous: '10' },
  ]) {
    test(`should preserve off-step maximum ${max} with native stepping`, async ({ fastPage }) => {
      const { element } = fastPage;
      const control = element.locator('input');
      await fastPage.setTemplate({ attributes: { min: '10', max, step, value: '10' } });

      await element.evaluate((node: Slider) => {
        node.value = '100';
      });
      await expect(element).toHaveJSProperty('value', endpoint);
      await expect(element).toHaveJSProperty('elementInternals.ariaValueNow', endpoint);
      await expect(element).toHaveJSProperty('elementInternals.ariaValueMax', max);
      await expect(control).toHaveAttribute('max', nativeMax);
      await expect(control).toHaveValue(nativeMax);

      await element.evaluate((node: Slider) => {
        node.decrement();
      });
      await expect(element).toHaveJSProperty('value', previous);

      await element.evaluate((node: Slider) => {
        node.increment();
      });
      await expect(element).toHaveJSProperty('value', endpoint);
    });
  }

  test('should snap fractional values relative to min without floating-point artifacts', async ({ fastPage }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { min: '1.25', max: '2.75', step: '0.1', value: '1.25' } });

    await element.evaluate((node: Slider) => {
      node.value = '1.44';
      node.increment();
    });
    await expect(element).toHaveJSProperty('value', '1.55');

    await element.evaluate((node: Slider) => {
      node.decrement();
    });
    await expect(element).toHaveJSProperty('value', '1.45');
  });

  test('should keep the thumb aligned with the native input at an off-step maximum', async ({ fastPage, page }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { min: '10', max: '15', step: '2', value: '14' } });

    const thumb = element.locator('.thumb-container');
    const trackBox = (await element.locator('.track').boundingBox()) as BoundingBox;
    const thumbBox = (await thumb.boundingBox()) as BoundingBox;
    const x = thumbBox.x + thumbBox.width / 2;
    const y = thumbBox.y + thumbBox.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(trackBox.x + trackBox.width, y);
    await page.mouse.up();

    await expect(element).toHaveJSProperty('value', '15');
    await expect
      .poll(async () => {
        const box = (await thumb.boundingBox()) as BoundingBox;
        return box.x + box.width - trackBox.x - trackBox.width;
      })
      .toBeCloseTo(0, 1);
  });

  for (const orientation of ['horizontal', 'vertical']) {
    for (const dir of ['ltr', 'rtl']) {
      test(`should drag a resized ${orientation} ${dir} slider without JavaScript geometry reads`, async ({
        fastPage,
        page,
      }) => {
        const { element } = fastPage;
        await fastPage.setTemplate({
          attributes: { orientation, dir, size: 'small', min: '10', max: '20', step: '0.5', value: '15' },
        });

        await element.evaluate((node: Slider) => {
          node.style.inlineSize = '216px';
          const fail = () => {
            throw new Error('Slider interaction must not measure element positions');
          };
          node.getBoundingClientRect = fail;
          node.track.getBoundingClientRect = fail;
          node.thumb.getBoundingClientRect = fail;
        });

        const trackBox = (await element.locator('.track').boundingBox()) as BoundingBox;
        const thumbBox = (await element.locator('.thumb-container').boundingBox()) as BoundingBox;
        const x = thumbBox.x + thumbBox.width / 2;
        const y = thumbBox.y + thumbBox.height / 2;
        const targetX =
          orientation === 'horizontal' ? x + (trackBox.width - thumbBox.width) * (dir === 'rtl' ? -0.2 : 0.2) : x;
        const targetY = orientation === 'vertical' ? y - (trackBox.height - thumbBox.height) * 0.2 : y;

        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(targetX, targetY);
        await page.mouse.up();

        await expect(element).toHaveJSProperty('value', '17');
        await expect(element.locator('input')).toHaveValue('17');
        await expect(element).toBeFocused();
      });
    }
  }

  test('should emit a single host change event for native input and suppress the native change event', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    await fastPage.setTemplate({ attributes: { value: '50' } });

    await element.evaluate(node => {
      node.setAttribute('data-changes', '0');
      node.addEventListener('change', event => {
        node.setAttribute('data-changes', String(Number(node.getAttribute('data-changes')) + 1));
        node.setAttribute('data-change-target', (event.target as HTMLElement).tagName.toLowerCase());
      });
    });

    const thumbBox = (await element.locator('.thumb-container').boundingBox()) as BoundingBox;
    const trackBox = (await element.locator('.track').boundingBox()) as BoundingBox;
    const x = thumbBox.x + thumbBox.width / 2;
    const y = thumbBox.y + thumbBox.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + (trackBox.width - thumbBox.width) * 0.1, y);
    await page.mouse.up();

    await expect(element).toHaveJSProperty('value', '60');
    await expect(element).toHaveAttribute('data-changes', '1');
    await expect(element).toHaveAttribute('data-change-target', tagName);
  });

  test('should restore host focus after dragging beyond the track', async ({ fastPage, page }) => {
    const { element } = fastPage;
    await fastPage.setTemplate();

    const thumbBox = (await element.locator('.thumb-container').boundingBox()) as BoundingBox;
    const trackBox = (await element.locator('.track').boundingBox()) as BoundingBox;
    const x = thumbBox.x + thumbBox.width / 2;
    const y = thumbBox.y + thumbBox.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(trackBox.x + trackBox.width + 40, y);
    await page.mouse.up();

    await expect(element).toHaveJSProperty('value', '100');
    await expect(element).toHaveJSProperty('isDragging', false);
    await expect(element).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect(element).toHaveJSProperty('value', '99');
  });

  test('should preserve custom thumb content and style parts', async ({ fastPage, page }) => {
    const { element } = fastPage;
    await fastPage.setTemplate(/* html */ `
      <${tagName} value="50">
        <span slot="thumb" style="display: block; width: 20px; height: 20px;">Thumb</span>
      </${tagName}>
    `);

    await expect(element.locator('[part="thumb-container"] slot')).toHaveAttribute('name', 'thumb');
    await expect(element.locator('[part="track-container"]')).toBeVisible();

    const thumbBox = (await element.locator('[slot="thumb"]').boundingBox()) as BoundingBox;
    const trackBox = (await element.locator('.track').boundingBox()) as BoundingBox;
    const x = thumbBox.x + thumbBox.width / 2;
    const y = thumbBox.y + thumbBox.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + (trackBox.width - thumbBox.width) * 0.1, y);
    await page.mouse.up();

    await expect(element).toHaveJSProperty('value', '60');
  });
});
