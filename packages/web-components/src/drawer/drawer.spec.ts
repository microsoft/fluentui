import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { keyEscape } from '@microsoft/fast-web-utilities';

import { fixtureURL } from '../helpers.tests.js';
import type { Drawer } from './drawer.js';

test.describe('Drawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-drawer--drawer'));

    await page.waitForFunction(() => customElements.whenDefined('fluent-drawer'));
  });

  test('should reflect type attribute', async ({ page }) => {
    const element = page.locator('fluent-drawer');

    await page.setContent(/* html */ `
        <fluent-drawer type="modal">Drawer</fluent-drawer>
    `);

    await expect(element).toHaveAttribute('type', 'modal');
    await expect(element).toHaveJSProperty('type', 'modal');

    await element.evaluate((node: Drawer) => {
      node.type = 'non-modal';
    });

    await expect(element).toHaveAttribute('type', 'non-modal');
  });

  test('should reflect size attribute', async ({ page }) => {
    const element = page.locator('fluent-drawer');

    await page.setContent(/* html */ `
        <fluent-drawer size="small">Drawer</fluent-drawer>
    `);

    await expect(element).toHaveAttribute('size', 'small');
    await expect(element).toHaveJSProperty('size', 'small');

    await element.evaluate((node: Drawer) => {
      node.size = 'medium';
    });

    await expect(element).toHaveAttribute('size', 'medium');
    await expect(element).toHaveJSProperty('size', 'medium');

    await element.evaluate((node: Drawer) => {
      node.size = 'large';
    });

    await expect(element).toHaveAttribute('size', 'large');
    await expect(element).toHaveJSProperty('size', 'large');

    await element.evaluate((node: Drawer) => {
      node.size = 'full';
    });

    await expect(element).toHaveAttribute('size', 'full');
    await expect(element).toHaveJSProperty('size', 'full');
  });

  test('should reflect position attribute', async ({ page }) => {
    const element = page.locator('fluent-drawer');

    await page.setContent(/* html */ `
        <fluent-drawer position="start">Drawer</fluent-drawer>
    `);

    await expect(element).toHaveAttribute('position', 'start');
    await expect(element).toHaveJSProperty('position', 'start');

    await element.evaluate((node: Drawer) => {
      node.position = 'end';
    });

    await expect(element).toHaveAttribute('position', 'end');
    await expect(element).toHaveJSProperty('position', 'end');
  });

  test('should reflect aria-label attribute', async ({ page }) => {
    const element = page.locator('fluent-drawer');

    await page.setContent(/* html */ `
        <fluent-drawer aria-label="abc">Drawer</fluent-drawer>
    `);

    await expect(element).toHaveAttribute('aria-label', 'abc');
    await expect(element).toHaveJSProperty('ariaLabel', 'abc');

    await element.evaluate((node: Drawer) => {
      node.ariaLabel = 'def';
    });

    await expect(element).toHaveAttribute('aria-label', 'def');
    await expect(element).toHaveJSProperty('ariaLabel', 'def');
  });

  test('should reflect aria-labelledby attribute', async ({ page }) => {
    const element = page.locator('fluent-drawer');

    await page.setContent(/* html */ `
        <fluent-drawer aria-labelledby="abc">Drawer</fluent-drawer>
    `);

    await expect(element).toHaveAttribute('aria-labelledby', 'abc');
    await expect(element).toHaveJSProperty('ariaLabelledby', 'abc');

    await element.evaluate((node: Drawer) => {
      node.ariaLabelledby = 'def';
    });

    await expect(element).toHaveAttribute('aria-labelledby', 'def');
    await expect(element).toHaveJSProperty('ariaLabelledby', 'def');
  });

  test('should reflect aria-describedby attribute', async ({ page }) => {
    const element = page.locator('fluent-drawer');

    await page.setContent(/* html */ `
        <fluent-drawer aria-describedby="abc">Drawer</fluent-drawer>
    `);

    await expect(element).toHaveAttribute('aria-describedby', 'abc');
    await expect(element).toHaveJSProperty('ariaDescribedby', 'abc');

    await element.evaluate((node: Drawer) => {
      node.ariaDescribedby = 'def';
    });

    await expect(element).toHaveAttribute('aria-describedby', 'def');
    await expect(element).toHaveJSProperty('ariaDescribedby', 'def');
  });

  test('should emit an event when open property changes', async ({ page }) => {
    const element = page.locator('fluent-drawer');

    await page.setContent(/* html */ `
        <fluent-drawer>Drawer</fluent-drawer>
    `);

    const [wasOpened] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('toggle', () => resolve(true));
          }),
      ),
      await element.evaluate((node: Drawer) => {
        node.show();
      }),
    ]);

    expect(wasOpened).toBe(true);
  });

  test('should emit an event before open property changes', async ({ page }) => {
    const element = page.locator('fluent-drawer');

    await page.setContent(/* html */ `
        <fluent-drawer>Drawer</fluent-drawer>
    `);

    const [wasOpened] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('beforetoggle', () => resolve(true));
          }),
      ),
      await element.evaluate((node: Drawer) => {
        node.show();
      }),
    ]);

    expect(wasOpened).toBe(true);
  });

  test('should fire a `cancel` event when keydown is invoked on the document', async ({ page }) => {
    const element = page.locator('fluent-drawer');

    await page.setContent(/* html */ `
        <fluent-drawer type="modal"></fluent-drawer>
    `);

    await element.evaluate((node: Drawer) => {
      node.show();
    });

    const [wasDismissed] = await Promise.all([
      element.evaluate(
        node =>
          new Promise(resolve => {
            node.addEventListener('cancel', () => resolve(true));
          }),
      ),
      element.evaluate(node => {
        node.dispatchEvent(
          new Event('cancel', {
            key: 'Escape',
          } as EventInit),
        );
      }),
    ]);

    expect(wasDismissed).toBe(true);
  });
});
