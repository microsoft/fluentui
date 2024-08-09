import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { CounterBadge } from './counter-badge.js';
import {
  CounterBadgeAppearance,
  CounterBadgeColor,
  CounterBadgeShape,
  CounterBadgeSize,
} from './counter-badge.options.js';

test.describe('CounterBadge component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-badge-counter-badge--counter-badge'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-counter-badge'));
  });

  test('should display the count when then the `count` attribute is equal to the `overflow-count` attribute', async ({
    page,
  }) => {
    const element = page.locator('fluent-counter-badge');

    await page.setContent(/* html */ `
        <fluent-counter-badge count="100" overflow-count="100"></fluent-counter-badge>
    `);

    await expect(element).toHaveAttribute('overflow-count', '100');

    await expect(element).toContainText('100');
  });

  test('should display an overflow count when the `count` attribute is greater than the `overflow-count` attribute', async ({
    page,
  }) => {
    const element = page.locator('fluent-counter-badge');

    await page.setContent(/* html */ `
        <fluent-counter-badge count="101" overflow-count="100"></fluent-counter-badge>
    `);

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
    page,
  }) => {
    const element = page.locator('fluent-counter-badge');

    await page.setContent(/* html */ `
        <fluent-counter-badge count="101" overflow-count="100"></fluent-counter-badge>
    `);

    await expect(element).toHaveAttribute('overflow-count', '100');

    await expect(element).toContainText('100+');

    await element.evaluate((node: CounterBadge) => {
      node.overflowCount = 101;
    });

    await expect(element).toHaveAttribute('overflow-count', '101');

    await expect(element).toContainText('101');
  });

  test('should display the count when the `count` attribute is set', async ({ page }) => {
    const element = page.locator('fluent-counter-badge');

    await page.setContent(/* html */ `
        <fluent-counter-badge count="5"></fluent-counter-badge>
    `);

    await expect(element).toHaveAttribute('count', '5');

    await expect(element).toContainText('5');
  });

  test('should show 0 when showZero attribute is present and value is 0', async ({ page }) => {
    const element = page.locator('fluent-counter-badge');

    await page.setContent(/* html */ `
        <fluent-counter-badge show-zero count="0"></fluent-counter-badge>
    `);

    await expect(element).toHaveAttribute('show-zero');

    await expect(element).toHaveJSProperty('showZero', true);

    await expect(element).toContainText('0');

    await element.evaluate((node: CounterBadge) => {
      node.removeAttribute('show-zero');
    });

    await expect(element).not.toHaveAttribute('show-zero');

    await expect(element).toHaveJSProperty('showZero', false);

    await expect(element).not.toContainText('0');
  });

  test('should display "0" when the `showZero` property is set to true and the `count` property is set to 0', async ({
    page,
  }) => {
    const element = page.locator('fluent-counter-badge');

    await page.setContent(/* html */ `
        <fluent-counter-badge count="0"></fluent-counter-badge>
    `);

    await expect(element).toHaveJSProperty('showZero', false);

    await expect(element).not.toContainText('0');

    await element.evaluate((node: CounterBadge) => {
      node.showZero = true;
      node.count = 0;
    });

    await expect(element).toHaveJSProperty('showZero', true);

    await expect(element).toContainText('0');
  });

  test('should display as a dot when the `dot` property is set to true', async ({ page }) => {
    const element = page.locator('fluent-counter-badge');

    await page.setContent(/* html */ `
        <fluent-counter-badge count="5"></fluent-counter-badge>
    `);

    await expect(element).toContainText('5');

    await expect(element).toHaveJSProperty('dot', false);

    await element.evaluate((node: CounterBadge) => {
      node.dot = true;
    });

    await expect(element).toHaveJSProperty('dot', true);

    await expect(element).not.toContainText('5');
  });

  test('should display as a number when the `dot` property is set to false', async ({ page }) => {
    const element = page.locator('fluent-counter-badge');

    await page.setContent(/* html */ `
        <fluent-counter-badge count="5" dot></fluent-counter-badge>
    `);

    await expect(element).not.toContainText('5');

    await expect(element).toHaveJSProperty('dot', true);

    await element.evaluate((node: CounterBadge) => {
      node.dot = false;
    });

    await expect(element).toContainText('5');

    await expect(element).toHaveJSProperty('dot', false);
  });

  for (const shape in CounterBadgeShape) {
    test(`should set the \`shape\` property to "${shape}" when the attribute is set to "${shape}"`, async ({
      page,
    }) => {
      const element = page.locator('fluent-counter-badge');

      await page.setContent(/* html */ `
        <fluent-counter-badge shape="${shape}"></fluent-counter-badge>
    `);

      await expect(element).toHaveAttribute('shape', shape);

      await expect(element).toHaveJSProperty('shape', shape);

      expect(await element.evaluate((node, shape) => node.matches(`:state(${shape})`), shape)).toEqual(true);
    });
  }

  for (const color in CounterBadgeColor) {
    test(`should set the \`color\` property to "${color}" when the attribute is set to "${color}"`, async ({
      page,
    }) => {
      const element = page.locator('fluent-counter-badge');

      await page.setContent(/* html */ `
          <fluent-counter-badge color="${color}"></fluent-counter-badge>
      `);

      await expect(element).toHaveAttribute('color', color);

      await expect(element).toHaveJSProperty('color', color);

      expect(await element.evaluate((node, color) => node.matches(`:state(${color})`), color)).toEqual(true);
    });
  }

  for (const size in CounterBadgeSize) {
    test(`should set the \`size\` property to "${size}" when the attribute is set to "${size}"`, async ({ page }) => {
      const element = page.locator('fluent-counter-badge');

      await page.setContent(/* html */ `
          <fluent-counter-badge size="${size}"></fluent-counter-badge>
      `);

      await expect(element).toHaveAttribute('size', size);

      await expect(element).toHaveJSProperty('size', size);

      expect(await element.evaluate((node, size) => node.matches(`:state(${size})`), size)).toEqual(true);
    });
  }

  for (const appearance in CounterBadgeAppearance) {
    test(`should set the \`appearance\` property to "${appearance}" when the attribute is set to "${appearance}"`, async ({
      page,
    }) => {
      const element = page.locator('fluent-counter-badge');

      await page.setContent(/* html */ `
          <fluent-counter-badge appearance="${appearance}"></fluent-counter-badge>
      `);

      await element.evaluate((node: CounterBadge, appearance) => {
        node.appearance = appearance;
      }, appearance as CounterBadgeAppearance);

      await expect(element).toHaveAttribute('appearance', appearance);

      await expect(element).toHaveJSProperty('appearance', appearance);

      expect(await element.evaluate((node, appearance) => node.matches(`:state(${appearance})`), appearance)).toEqual(
        true,
      );
    });
  }
});
