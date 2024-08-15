import { expect, test } from '@playwright/test';
import type { Locator } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import { Dialog } from './dialog.js';

async function getPointOutside(element: Locator) {
  // Get the bounding box of the element
  const boundingBox = (await element.boundingBox()) as { x: number; y: number; width: number; height: number };

  // Calculate a point outside the bounding box
  return {
    x: boundingBox.x + boundingBox.width + 10, // 10 pixels to the right
    y: boundingBox.y + boundingBox.height + 10, // 10 pixels below
  };
}

test.describe('Dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-dialog-dialog--default'));

    await page.waitForFunction(() =>
      Promise.all([
        customElements.whenDefined('fluent-button'),
        customElements.whenDefined('fluent-dialog'),
        customElements.whenDefined('fluent-dialog-body'),
      ]),
    );
  });

  test('should open and close dialog programmatically', async ({ page }) => {
    const element = page.locator('fluent-dialog');
    const content = element.locator('#content');

    await page.setContent(/* html */ `
      <fluent-dialog>
          <div id="content">content</div>
      </fluent-dialog>
    `);

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

  test('should handle dialog overlay clicks correctly based on type', async ({ page }) => {
    const element = page.locator('fluent-dialog');
    const content = element.locator('#content');

    await page.setContent(/* html */ `
        <fluent-dialog>
            <div id="content">content</div>
        </fluent-dialog>
      `);

    await test.step('should close modal dialog when clicking outside', async () => {
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

    await test.step('should not close non-modal dialog when clicking outside', async () => {
      await element.evaluate((node: Dialog) => {
        node.setAttribute('type', 'non-modal');
        node.show();
      });

      await expect(content).toBeVisible();

      // Get point outside the element
      const { x, y } = await getPointOutside(element);

      // Dispatch a click event at the calculated point
      await page.mouse.click(x, y);

      await expect(content).toBeVisible();
    });

    await test.step('should not close alert dialog when clicking outside', async () => {
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
  });

  test('should handle escape keypress correctly based on type', async ({ page }) => {
    const element = page.locator('fluent-dialog');
    const content = element.locator('#content');

    await page.setContent(/* html */ `
      <fluent-dialog>
          <div id="content">content</div>
      </fluent-dialog>
    `);

    await test.step('should close modal dialog when pressing escape', async () => {
      await element.evaluate((node: Dialog) => {
        node.show();
      });

      await expect(content).toBeVisible();

      await page.keyboard.press('Escape');

      await expect(content).toBeHidden();
    });

    await test.step('should not close non-modal dialog when pressing escape', async () => {
      await element.evaluate((node: Dialog) => {
        node.setAttribute('type', 'non-modal');
        node.show();
      });

      await expect(content).toBeVisible();

      await page.keyboard.press('Escape');

      await expect(content).toBeVisible();
    });

    await test.step('should not close alert dialog when pressing escape', async () => {
      await element.evaluate((node: Dialog) => {
        node.setAttribute('type', 'alert');
        node.show();
      });

      await expect(content).toBeVisible();

      await page.keyboard.press('Escape');

      await expect(content).toBeVisible();
    });
  });

  test('should apply ARIA attributes correctly to dialog element based on type', async ({ page }) => {
    const element = page.locator('fluent-dialog');
    const dialog = element.locator('dialog');

    await page.setContent(/* html */ `
      <fluent-dialog>
        <div id="content">content</div>
      </fluent-dialog>
    `);

    await test.step('should set role correctly on the dialog element', async () => {
      await element.evaluate((node: Dialog) => {
        node.setAttribute('type', 'dialog');
      });

      await expect(dialog).toHaveRole('dialog');

      await element.evaluate((node: Dialog) => {
        node.setAttribute('type', 'non-modal');
      });

      await expect(dialog).toHaveRole('dialog');

      await element.evaluate((node: Dialog) => {
        node.setAttribute('type', 'alert');
      });

      await expect(dialog).toHaveRole('alertdialog');
    });

    await test.step('should set aria-modal correctly on the dialog element', async () => {
      await element.evaluate((node: Dialog) => {
        node.setAttribute('type', 'modal');
      });

      await expect(dialog).toHaveAttribute('aria-modal');

      await element.evaluate((node: Dialog) => {
        node.setAttribute('type', 'alert');
      });

      await expect(dialog).toHaveAttribute('aria-modal');

      await element.evaluate((node: Dialog) => {
        node.setAttribute('type', 'non-modal');
      });

      await expect(dialog).not.toHaveAttribute('aria-modal');
    });

    await test.step('should set aria-labelledby on the dialog element', async () => {
      await expect(dialog).not.toHaveAttribute('aria-labelledby');

      await element.evaluate((node: Dialog) => {
        node.setAttribute('aria-labelledby', 'label');
      });

      await expect(dialog).toHaveAttribute('aria-labelledby', 'label');
    });

    await test.step('should set aria-describedby on the dialog element', async () => {
      await expect(dialog).not.toHaveAttribute('aria-describedby');

      await element.evaluate((node: Dialog) => {
        node.setAttribute('aria-describedby', 'elementID');
      });

      await expect(dialog).toHaveAttribute('aria-describedby', 'elementID');
    });
  });
});
