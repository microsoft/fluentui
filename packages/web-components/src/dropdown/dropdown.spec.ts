import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

test.describe('Dropdown', () => {
  const defaultFixture = /* html */ `
    <fluent-dropdown>
      <fluent-listbox>
        <fluent-option value="apple">Apple</fluent-option>
        <fluent-option value="banana">Banana</fluent-option>
        <fluent-option value="orange">Orange</fluent-option>
        <fluent-option value="mango">Mango</fluent-option>
        <fluent-option value="kiwi">Kiwi</fluent-option>
        <fluent-option value="cherry">Cherry</fluent-option>
        <fluent-option value="grapefruit">Grapefruit</fluent-option>
        <fluent-option value="papaya">Papaya</fluent-option>
      </fluent-listbox>
    </fluent-dropdown>
  `;

  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-dropdown--dropdown'));

    await page.waitForFunction(() =>
      Promise.all([
        customElements.whenDefined('fluent-dropdown'),
        customElements.whenDefined('fluent-listbox'),
        customElements.whenDefined('fluent-option'),
      ]),
    );
  });

  test('should render a dropdown', async ({ page }) => {
    const element = page.locator('fluent-dropdown');

    await page.setContent(/* html */ `<fluent-dropdown></fluent-dropdown>`);

    await expect(element).toHaveCount(1);
  });

  test('should render a dropdown with options', async ({ page }) => {
    const element = page.locator('fluent-dropdown');
    const options = element.locator('fluent-option');

    await page.setContent(defaultFixture);

    await expect(options).toHaveCount(8);
  });

  test('should open the dropdown on click', async ({ page }) => {
    const element = page.locator('fluent-dropdown');
    const listbox = element.locator('fluent-listbox');

    await page.setContent(defaultFixture);

    await expect(listbox).toBeHidden();

    await element.click();

    await expect(listbox).toBeVisible();
  });
});
