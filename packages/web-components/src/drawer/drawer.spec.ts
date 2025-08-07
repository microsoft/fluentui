import { expect, test } from '../../test/playwright/index.js';
import type { Drawer } from './drawer.js';
import { DrawerPosition } from './drawer.options.js';
import { DrawerSize, DrawerType } from './drawer.options.js';

test.describe('Drawer', () => {
  test.use({
    tagName: 'fluent-drawer',
  });

  for (const type of Object.values(DrawerType)) {
    test(`should set the \`type\` property to "${type}" when set via the \`type\` attribute`, async ({ fastPage }) => {
      const { element } = fastPage;

      await fastPage.setTemplate({ attributes: { type } });

      await expect(element).toHaveAttribute('type', type);
      await expect(element).toHaveJSProperty('type', type);
    });
  }

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-drawer');
    });

    expect(hasError).toBe(false);
  });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const size of Object.values(DrawerSize)) {
      await test.step(`should set the \`size\` property to \`${size}\``, async () => {
        await fastPage.setTemplate({ attributes: { size } });

        await expect(element).toHaveAttribute('size', size);

        await expect(element).toHaveJSProperty('size', size);
      });
    }
  });

  test('should set the `position` property to match the `position` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    for (const position of Object.values(DrawerPosition)) {
      await test.step(`should set the \`position\` property to \`${position}\``, async () => {
        await fastPage.setTemplate({ attributes: { position } });

        await expect(element).toHaveAttribute('position', position);

        await expect(element).toHaveJSProperty('position', position);
      });
    }
  });

  test('should set the `ariaLabel` property when the `aria-label` attribute is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { 'aria-label': 'abc' } });

    await expect(element).toHaveAttribute('aria-label', 'abc');

    await expect(element).toHaveJSProperty('ariaLabel', 'abc');

    await element.evaluate((node: Drawer) => {
      node.ariaLabel = 'def';
    });

    await expect(element).toHaveAttribute('aria-label', 'def');

    await expect(element).toHaveJSProperty('ariaLabel', 'def');
  });

  test('should set the `ariaLabelledby` property when the `aria-labelledby` attribute is set', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { 'aria-labelledby': 'abc' } });

    await expect(element).toHaveAttribute('aria-labelledby', 'abc');

    await expect(element).toHaveJSProperty('ariaLabelledby', 'abc');

    await element.evaluate((node: Drawer) => {
      node.ariaLabelledby = 'def';
    });

    await expect(element).toHaveAttribute('aria-labelledby', 'def');

    await expect(element).toHaveJSProperty('ariaLabelledby', 'def');
  });

  test('should set the `ariaDescribedby` property when the `aria-describedby` attribute is set', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { 'aria-describedby': 'abc' } });

    await expect(element).toHaveAttribute('aria-describedby', 'abc');

    await expect(element).toHaveJSProperty('ariaDescribedby', 'abc');

    await element.evaluate((node: Drawer) => {
      node.ariaDescribedby = 'def';
    });

    await expect(element).toHaveAttribute('aria-describedby', 'def');

    await expect(element).toHaveJSProperty('ariaDescribedby', 'def');
  });

  test('should emit a `toggle` event when the `show` method is called', async ({ fastPage }) => {
    const { element } = fastPage;

    const wasOpened = element.evaluate(
      node => new Promise(resolve => node.addEventListener('toggle', () => resolve(true))),
    );

    await element.evaluate((node: Drawer) => {
      node.show();
    });

    await expect(wasOpened).resolves.toBe(true);
  });

  test('should emit a `beforetoggle` event before open property changes', async ({ fastPage }) => {
    const { element } = fastPage;

    const wasOpened = element.evaluate(
      node => new Promise(resolve => node.addEventListener('beforetoggle', () => resolve(true))),
    );

    await element.evaluate((node: Drawer) => {
      node.show();
    });

    await expect(wasOpened).resolves.toBe(true);
  });

  test('should emit a `cancel` event when a `cancel` event is invoked on the document', async ({ fastPage }) => {
    const { element } = fastPage;

    await element.evaluate((node: Drawer) => {
      node.show();
    });

    const wasDismissed = element.evaluate(
      node => new Promise(resolve => node.addEventListener('cancel', () => resolve(true))),
    );

    await element.evaluate(node => {
      node.dispatchEvent(new Event('cancel', { key: 'Escape' } as EventInit));
    });

    await expect(wasDismissed).resolves.toBe(true);
  });

  test('should close after a button is slotted into the close slot and clicked', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const closeButton = element.locator('fluent-button[slot="close"]');
    const content = element.locator('#content');

    await fastPage.setTemplate(/* html */ `
        <fluent-drawer>
          <fluent-drawer-body>
              <fluent-button slot="close">Close</fluent-button>
              <div id="content">content</div>
          </fluent-drawer-body>
        </fluent-drawer>
      `);

    await element.evaluate((node: Drawer) => {
      node.show();
    });

    await expect(content).toBeVisible();

    await closeButton.click();

    await expect(content).toBeHidden();
  });
});
