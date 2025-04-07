import type { Locator } from '@playwright/test';
import { expect, test } from '../../test/playwright/index.js';
import type { Dialog } from './dialog.js';

test.describe('Dialog', () => {
  test.use({
    tagName: 'fluent-dialog',
    innerHTML: /* html */ `<div id="content">Dialog Body</div>`,
    waitFor: ['fluent-button', 'fluent-dialog-body'],
  });

  async function getPointOutside(element: Locator) {
    // Get the bounding box of the element
    const boundingBox = (await element.boundingBox()) as { x: number; y: number; width: number; height: number };

    // Calculate a point outside the bounding box
    return {
      x: boundingBox.x + boundingBox.width + 10, // 10 pixels to the right
      y: boundingBox.y + boundingBox.height + 10, // 10 pixels below
    };
  }

  test('should open and close programmatically', async ({ fastPage }) => {
    const { element } = fastPage;
    const content = element.locator('#content');

    await test.step('should show the dialog content when the dialog is shown', async () => {
      await expect(content).toBeHidden();

      await element.evaluate((node: Dialog) => {
        node.show();
      });

      await expect(content).toBeVisible();
    });

    await test.step('should hide the dialog content when the dialog is hidden', async () => {
      await element.evaluate((node: Dialog) => {
        node.hide();
      });

      await expect(content).toBeHidden();
    });
  });

  test('should close after clicking outside its bounds when its `type` attribute is set to "modal"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const content = element.locator('#content');

    await element.evaluate((node: Dialog) => {
      node.show();
    });

    await expect(content).toBeVisible();

    // Get point outside the element
    const { x, y } = await getPointOutside(element);

    // Dispatch a click event at the calculated point
    await page.mouse.click(x, y);

    await expect(content).toBeHidden();
  });

  test('should NOT close after clicking outside its bounds when its `type` attribute is set to "non-modal"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const content = element.locator('#content');

    await fastPage.setTemplate({
      attributes: {
        type: 'non-modal',
      },
    });

    await element.evaluate((node: Dialog) => {
      node.show();
    });

    await expect(content).toBeVisible();

    // Get point outside the element
    const { x, y } = await getPointOutside(element);

    // Dispatch a click event at the calculated point
    await page.mouse.click(x, y);

    await expect(content).toBeVisible();
  });

  test('should NOT close after clicking outside its bounds when its `type` attribute is set to "alert"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const content = element.locator('#content');

    await element.evaluate((node: Dialog) => {
      node.setAttribute('type', 'alert');
      node.show();
    });

    await expect(content).toBeVisible();

    // Get point outside the element
    const { x, y } = await getPointOutside(element);

    // Dispatch a click event at the calculated point
    await page.mouse.click(x, y);

    await expect(content).toBeVisible();
  });

  test('should close after the escape key is pressed when its `type` attribute is set to "modal"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const content = element.locator('#content');

    await element.evaluate((node: Dialog) => {
      node.show();
    });

    await expect(content).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(content).toBeHidden();
  });

  test('should NOT close after the escape key is pressed when its `type` attribute is set to "non-modal"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const content = element.locator('#content');

    await fastPage.setTemplate({ attributes: { type: 'non-modal' } });

    await element.evaluate((node: Dialog) => {
      node.show();
    });

    await expect(content).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(content).toBeVisible();
  });

  test('should NOT close after the escape key is pressed when its `type` attribute is set to "alert"', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const content = element.locator('#content');

    await fastPage.setTemplate({ attributes: { type: 'alert' } });

    await element.evaluate((node: Dialog) => {
      node.show();
    });

    await expect(content).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(content).toBeVisible();
  });

  test('should set the `role` attribute to "dialog" on the internal dialog element when the `type` attribute is set to "dialog"', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate({ attributes: { type: 'dialog' } });

    await expect(dialog).toHaveRole('dialog');
  });

  test('should set the `role` attribute to "dialog" on the internal dialog element when the `type` attribute is set to "non-modal"', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate({ attributes: { type: 'non-modal' } });

    await expect(dialog).toHaveRole('dialog');
  });

  test('should set the `role` attribute to "alertdialog" on the internal dialog element when the `type` attribute is set to "alert"', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate({ attributes: { type: 'alert' } });

    await expect(dialog).toHaveRole('alertdialog');
  });

  test('should set the `aria-modal` attribute to "true" on the internal dialog element when the `type` attribute is set to "modal"', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate({ attributes: { type: 'modal' } });

    await expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  test('should set the `aria-modal` attribute to "false" on the internal dialog element when the `type` attribute is set to "non-modal"', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate({ attributes: { type: 'non-modal' } });

    await expect(dialog).not.toHaveAttribute('aria-modal');
  });

  test('should set the `aria-modal` attribute to "true" on the internal dialog element when the `type` attribute is set to "alert"', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await fastPage.setTemplate({ attributes: { type: 'alert' } });

    await expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  test('should set the `aria-labelledby` attribute on the internal dialog element when the `aria-labelledby` attribute is set', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await expect(dialog).not.toHaveAttribute('aria-labelledby');

    await element.evaluate(node => {
      node.setAttribute('aria-labelledby', 'label');
    });

    await expect(dialog).toHaveAttribute('aria-labelledby', 'label');
  });

  test('should set the `aria-describedby` attribute on the internal dialog element when the `aria-describedby` attribute is set', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const dialog = element.locator('dialog');

    await expect(dialog).not.toHaveAttribute('aria-describedby');

    await element.evaluate(node => {
      node.setAttribute('aria-describedby', 'elementID');
    });

    await expect(dialog).toHaveAttribute('aria-describedby', 'elementID');
  });
});
