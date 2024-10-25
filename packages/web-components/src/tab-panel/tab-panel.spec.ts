import { expect, test } from '../../test/playwright/index.js';

test.describe('TabPanel', () => {
  test.use({ tagName: 'fluent-tab-panel' });

  test('should set defaults', async ({ fastPage }) => {
    const { element } = fastPage;

    await test.step('should have a role of `tabpanel`', async () => {
      await expect(element).toHaveAttribute('role', 'tabpanel');
    });

    await test.step('should have a slot attribute of `tabpanel`', async () => {
      await expect(element).toHaveAttribute('slot', 'tabpanel');
    });
  });
});
