import { expect, test } from '../../test/playwright/index.js';
import type { Dialog } from '../dialog/dialog.js';
import type { DialogBody } from './dialog-body.js';

test.describe('Dialog Body', () => {
  test.use({
    tagName: 'fluent-dialog-body',
    waitFor: ['fluent-dialog'],
  });

  test('should render a dialog body with a close button', async ({ fastPage }) => {
    const { element } = fastPage;
    const closeButton = element.locator('.title-action');

    await expect(element).toBeVisible();
    await expect(closeButton).toBeVisible();
  });

  test('should add default close button for non-modal dialogs', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const closeButton = element.locator('.title-action');
    const dialog = page.locator('fluent-dialog');
    const content = element.locator('#content');

    await fastPage.setTemplate(/* html */ `
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
