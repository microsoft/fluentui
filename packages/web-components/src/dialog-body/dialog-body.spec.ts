import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Dialog } from '../dialog/dialog.js';
import type { DialogBody } from './dialog-body.js';

test.describe('Dialog Body', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-dialog-dialog-body--default'));

    await page.waitForFunction(() =>
      Promise.all([
        customElements.whenDefined('fluent-button'),
        customElements.whenDefined('fluent-dialog'),
        customElements.whenDefined('fluent-dialog-body'),
      ]),
    );
  });

  test('should render a dialog body', async ({ page }) => {
    const element = page.locator('fluent-dialog-body');
    const closeButton = element.locator('.title-action');

    await page.setContent(/* html */ `
      <fluent-dialog-body>
          <div id="content">content</div>
      </fluent-dialog-body>
    `);

    await expect(element).toBeVisible();
    await expect(closeButton).toBeVisible();
  });

  test('should add default close button for non-modal dialogs', async ({ page }) => {
    const element = page.locator('fluent-dialog-body');
    const closeButton = element.locator('.title-action');
    const dialog = page.locator('fluent-dialog');
    const content = element.locator('#content');

    await page.setContent(/* html */ `
      <fluent-dialog type="non-modal">
        <fluent-dialog-body>
            <div id="content">content</div>
        </fluent-dialog-body>
      </fluent-dialog>
    `);

    await test.step('should show the default close button in title for non-modal dialog', async () => {
      await expect(content).toBeHidden();

      dialog.evaluate((node: Dialog) => {
        node.show();
      });

      await expect(content).toBeVisible();

      // Shows the close button in title in non-modal dialog
      await expect(closeButton).toBeVisible();
    });

    await test.step('should hide the close button when noTitleAction is set', async () => {
      await element.evaluate((node: DialogBody) => {
        node.noTitleAction = true;
      });

      await expect(closeButton).toBeHidden();
    });
  });
});
