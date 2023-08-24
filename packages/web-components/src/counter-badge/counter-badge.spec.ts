import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { CounterBadge } from './counter-badge.js';

test.describe('CounterBadge component', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    element = page.locator('fluent-counter-badge');
    root = page.locator('#root');
    await page.goto(fixtureURL('components-badge-counter-badge--counter-badge'));
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should handle overflow count property correctly', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-counter-badge count="101" overflow-count="100"></fluent-counter-badge>
            `;
    });

    await expect(element).toHaveAttribute('overflow-count', '100');

    await expect(element).toContainText('100+');
  });

  test('should reflect the count attribute properly', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-counter-badge count="5"></fluent-counter-badge>
            `;
    });
    await expect(element).toHaveAttribute('count', '5');

    await expect(element).toContainText('5');
  });

  test('should show 0 when showZero attribute is present and value is 0', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-counter-badge show-zero count="0"></fluent-counter-badge>
            `;
    });
    await expect(element).toHaveAttribute('show-zero', '');
    await expect(element).toHaveJSProperty('showZero', true);

    await expect(element).toContainText('0');
  });

  test('should show 0 when showZero is set programmatically', async () => {
    await page.waitForSelector('fluent-counter-badge');
    await element.evaluate((node: CounterBadge) => {
      node.showZero = true;
      node.count = 0;
    });
    await expect(element).toHaveJSProperty('showZero', true);

    await expect(element).toContainText('0');
  });

  test('should render correctly with dot attribute', async () => {
    await page.waitForSelector('fluent-counter-badge');
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
        <fluent-counter-badge dot count="5"></fluent-counter-badge>
      `;
    });
    await expect(element).toHaveJSProperty('dot', true);

    await expect(element).not.toContainText('5');
  });

  test('should show dot programmatically', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-counter-badge count="5" dot></fluent-counter-badge>
            `;
    });

    await expect(element).toHaveJSProperty('dot', true);
    await expect(element).not.toContainText('5');
  });

  test('should hide dot programmatically', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-counter-badge count="5" dot></fluent-counter-badge>
            `;
    });

    await element.evaluate((node: CounterBadge) => {
      node.dot = false;
    });

    await expect(element).toContainText('5');
    await expect(element).toHaveJSProperty('dot', false);
  });

  test('should reflect shape attribute and update property', async () => {
    await element.evaluate((node: CounterBadge) => {
      node.shape = 'circular';
    });
    await expect(element).toHaveAttribute('shape', 'circular');
    await expect(element).toHaveJSProperty('shape', 'circular');

    await element.evaluate((node: CounterBadge) => {
      node.shape = 'rounded';
    });
    await expect(element).toHaveAttribute('shape', 'rounded');
    await expect(element).toHaveJSProperty('shape', 'rounded');
  });

  test('should reflect color attribute and update property', async () => {
    await element.evaluate((node: CounterBadge) => {
      node.color = 'brand';
    });
    await expect(element).toHaveAttribute('color', 'brand');
    await expect(element).toHaveJSProperty('color', 'brand');

    await element.evaluate((node: CounterBadge) => {
      node.color = 'danger';
    });
    await expect(element).toHaveAttribute('color', 'danger');
    await expect(element).toHaveJSProperty('color', 'danger');

    await element.evaluate((node: CounterBadge) => {
      node.color = 'important';
    });
    await expect(element).toHaveAttribute('color', 'important');
    await expect(element).toHaveJSProperty('color', 'important');

    await element.evaluate((node: CounterBadge) => {
      node.color = 'informative';
    });
    await expect(element).toHaveAttribute('color', 'informative');
    await expect(element).toHaveJSProperty('color', 'informative');

    await element.evaluate((node: CounterBadge) => {
      node.color = 'severe';
    });
    await expect(element).toHaveAttribute('color', 'severe');
    await expect(element).toHaveJSProperty('color', 'severe');

    await element.evaluate((node: CounterBadge) => {
      node.color = 'success';
    });
    await expect(element).toHaveAttribute('color', 'success');
    await expect(element).toHaveJSProperty('color', 'success');

    await element.evaluate((node: CounterBadge) => {
      node.color = 'subtle';
    });
    await expect(element).toHaveAttribute('color', 'subtle');
    await expect(element).toHaveJSProperty('color', 'subtle');

    await element.evaluate((node: CounterBadge) => {
      node.color = 'warning';
    });
    await expect(element).toHaveAttribute('color', 'warning');
    await expect(element).toHaveJSProperty('color', 'warning');
  });

  test('should reflect size attribute and update property', async () => {
    await element.evaluate((node: CounterBadge) => {
      node.size = 'tiny';
    });
    await expect(element).toHaveAttribute('size', 'tiny');
    await expect(element).toHaveJSProperty('size', 'tiny');

    await element.evaluate((node: CounterBadge) => {
      node.size = 'extra-small';
    });
    await expect(element).toHaveAttribute('size', 'extra-small');
    await expect(element).toHaveJSProperty('size', 'extra-small');

    await element.evaluate((node: CounterBadge) => {
      node.size = 'small';
    });
    await expect(element).toHaveAttribute('size', 'small');
    await expect(element).toHaveJSProperty('size', 'small');

    await element.evaluate((node: CounterBadge) => {
      node.size = 'medium';
    });
    await expect(element).toHaveAttribute('size', 'medium');
    await expect(element).toHaveJSProperty('size', 'medium');

    await element.evaluate((node: CounterBadge) => {
      node.size = 'large';
    });
    await expect(element).toHaveAttribute('size', 'large');
    await expect(element).toHaveJSProperty('size', 'large');

    await element.evaluate((node: CounterBadge) => {
      node.size = 'extra-large';
    });
    await expect(element).toHaveAttribute('size', 'extra-large');
    await expect(element).toHaveJSProperty('size', 'extra-large');
  });

  test('should reflect appearance attribute and update property', async () => {
    await element.evaluate((node: CounterBadge) => {
      node.appearance = 'filled';
    });
    await expect(element).toHaveAttribute('appearance', 'filled');
    await expect(element).toHaveJSProperty('appearance', 'filled');

    await element.evaluate((node: CounterBadge) => {
      node.appearance = 'ghost';
    });
    await expect(element).toHaveAttribute('appearance', 'ghost');
    await expect(element).toHaveJSProperty('appearance', 'ghost');
  });
});
