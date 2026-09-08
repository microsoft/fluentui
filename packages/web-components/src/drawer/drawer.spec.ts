import { expect, test } from '../../test/playwright/index.js';
import { tagName as DrawerBodyTagName } from '../drawer-body/drawer-body.options.js';
import { tagName as TextInputTagName } from '../text-input/text-input.options.js';
import type { Drawer } from './drawer.js';
import { DrawerPosition, DrawerSize, DrawerType, tagName } from './drawer.options.js';

test.describe('Drawer', () => {
  test.use({
    tagName,
    waitFor: [DrawerBodyTagName],
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

    await page.evaluate(tagName => {
      document.createElement(tagName);
    }, tagName);

    expect(hasError).toBe(false);
  });

  test('should set the `size` property to match the `size` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    for (const size of Object.values(DrawerSize)) {
      await test.step(`should set the \`size\` property to \`${size}\``, async () => {
        await fastPage.updateTemplate(element, { attributes: { size } });

        await expect(element).toHaveAttribute('size', size);

        await expect(element).toHaveJSProperty('size', size);
      });
    }
  });

  test('should set the `position` property to match the `position` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    for (const position of Object.values(DrawerPosition)) {
      await test.step(`should set the \`position\` property to \`${position}\``, async () => {
        await fastPage.updateTemplate(element, { attributes: { position } });

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

    await fastPage.setTemplate();

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

    await fastPage.setTemplate();

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

    await fastPage.setTemplate();

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
    const closeButton = element.locator('button[slot="close"]');
    const content = element.locator('#content');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${DrawerBodyTagName}>
          <button slot="close">Close</button>
          <div id="content">content</div>
        </${DrawerBodyTagName}>
      `,
    });

    await element.evaluate((node: Drawer) => {
      node.show();
    });

    await expect(content).toBeVisible();

    await closeButton.click();

    await expect(content).toBeHidden();
  });

  test.describe('sets focus when show() is called', () => {
    test.use({
      tagName,
      waitFor: [DrawerBodyTagName, TextInputTagName],
    });

    test('should focus on the first element with `autofocus` attribute', async ({ fastPage }) => {
      const { element } = fastPage;
      const content = element.locator('#content');
      const input = element.getByTestId('input');

      await fastPage.setTemplate({
        innerHTML: /* html */ `
          <${DrawerBodyTagName} id="content">
            <button>before</button>
            <${TextInputTagName} autofocus data-testid="input"></${TextInputTagName}>
            <${TextInputTagName} autofocus></${TextInputTagName}>
            <button>after</button>
          </${DrawerBodyTagName}>
        `,
      });

      await element.evaluate((node: Drawer) => {
        node.show();
      });

      await expect(content).toBeVisible();
      await expect(input).toBeFocused();
    });
  });
});
