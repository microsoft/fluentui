import { expect, test } from '../../test/playwright/index.js';
import type { CounterBadge } from './counter-badge.js';
import {
  CounterBadgeAppearance,
  CounterBadgeColor,
  CounterBadgeShape,
  CounterBadgeSize,
} from './counter-badge.options.js';

test.describe('CounterBadge component', () => {
  test.use({
    tagName: 'fluent-counter-badge',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-counter-badge');
    });

    expect(hasError).toBe(false);
  });

  test('should display the count when then the `count` attribute is equal to the `overflow-count` attribute', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { count: '100', 'overflow-count': '100' } });

    await expect(element).toHaveAttribute('overflow-count', '100');

    await expect(element).toContainText('100');
  });

  test('should display an overflow count when the `count` attribute is greater than the `overflow-count` attribute', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { count: '101', 'overflow-count': '100' } });

    await expect(element).toHaveAttribute('overflow-count', '100');

    await expect(element).toContainText('100+');

    await test.step('should display the count when the `count` attribute is less than the `overflow-count` attribute', async () => {
      await element.evaluate((node: CounterBadge) => {
        node.count = 99;
      });

      await expect(element).toHaveAttribute('overflow-count', '100');

      await expect(element).toContainText('99');
    });
  });

  test('should display the count when the `overflow-count` attribute is higher than the `count` attribute', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { count: '101', 'overflow-count': '100' } });

    await expect(element).toHaveAttribute('overflow-count', '100');

    await expect(element).toContainText('100+');

    await element.evaluate((node: CounterBadge) => {
      node.overflowCount = 101;
    });

    await expect(element).toHaveAttribute('overflow-count', '101');

    await expect(element).toContainText('101');
  });

  test('should display the count when the `count` attribute is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { count: '5' } });

    await expect(element).toHaveAttribute('count', '5');

    await expect(element).toContainText('5');
  });

  test('should show 0 when showZero attribute is present and value is 0', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { 'show-zero': true, count: '0' } });

    await expect(element).toHaveAttribute('show-zero');

    await expect(element).toHaveJSProperty('showZero', true);

    await expect(element).toContainText('0');

    await element.evaluate(node => {
      node.removeAttribute('show-zero');
    });

    await expect(element).not.toHaveAttribute('show-zero');

    await expect(element).toHaveJSProperty('showZero', false);

    await expect(element).not.toContainText('0');
  });

  test('should display "0" when the `showZero` property is set to true and the `count` property is set to 0', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { count: '0' } });

    await expect(element).toHaveJSProperty('showZero', false);

    await expect(element).not.toContainText('0');

    await element.evaluate((node: CounterBadge) => {
      node.showZero = true;
      node.count = 0;
    });

    await expect(element).toHaveJSProperty('showZero', true);

    await expect(element).toContainText('0');
  });

  test('should display as a dot when the `dot` property is set to true', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { count: '5' } });

    await expect(element).toContainText('5');

    await expect(element).toHaveJSProperty('dot', false);

    await element.evaluate((node: CounterBadge) => {
      node.dot = true;
    });

    await expect(element).toHaveJSProperty('dot', true);

    await expect(element).not.toContainText('5');
  });

  test('should display as a number when the `dot` property is set to false', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { count: '5', dot: true } });

    await expect(element).not.toContainText('5');

    await expect(element).toHaveJSProperty('dot', true);

    await element.evaluate((node: CounterBadge) => {
      node.dot = false;
    });

    await expect(element).toContainText('5');

    await expect(element).toHaveJSProperty('dot', false);
  });

  test('should set the `shape` property to match the `shape` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const shape of Object.values(CounterBadgeShape)) {
      await test.step(`should set the \`shape\` property to \`${shape}\``, async () => {
        await fastPage.setTemplate({ attributes: { shape } });

        await expect(element).toHaveAttribute('shape', shape);

        await expect(element).toHaveJSProperty('shape', shape);
      });
    }
  });

  test('should set the `color` property to match the `color` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const color of Object.values(CounterBadgeColor)) {
      await test.step(`should set the \`color\` property to \`${color}\``, async () => {
        await fastPage.setTemplate({ attributes: { color } });

        await expect(element).toHaveAttribute('color', color);

        await expect(element).toHaveJSProperty('color', color);
      });
    }
  });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const size of Object.values(CounterBadgeSize)) {
      await test.step(`should set the \`size\` property to "${size}"`, async () => {
        await fastPage.setTemplate({ attributes: { size } });

        await expect(element).toHaveAttribute('size', size);

        await expect(element).toHaveJSProperty('size', size);
      });
    }
  });

  test('should set the `appearance` property to match the `appearance` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const appearance of Object.values(CounterBadgeAppearance)) {
      await test.step(appearance, async () => {
        await fastPage.setTemplate({ attributes: { appearance } });

        await expect(element).toHaveJSProperty('appearance', appearance);

        await expect(element).toHaveAttribute('appearance', appearance);
      });
    }
  });
});
