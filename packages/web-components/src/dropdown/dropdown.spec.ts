import { expect, test } from '../../test/playwright/index.js';

test.describe('Dropdown', () => {
  test.use({
    tagName: 'fluent-dropdown',
    innerHTML: /* html */ `
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
    `,
    waitFor: ['fluent-listbox', 'fluent-option'],
  });

  test('should render a dropdown', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveCount(1);
  });

  test('should render a dropdown with options', async ({ fastPage }) => {
    const { element } = fastPage;
    const options = element.locator('fluent-option');

    await expect(options).toHaveCount(8);
  });

  test('should render a dropdown with a button when the type is not specified', async ({ fastPage }) => {
    const { element } = fastPage;
    const button = element.locator('button');

    await expect(button).toHaveCount(1);
  });

  test('should render an input when the type attribute is set to "combobox"', async ({ fastPage }) => {
    const { element } = fastPage;
    const input = element.locator('input');

    await fastPage.setTemplate({ attributes: { type: 'combobox' } });

    await expect(input).toHaveCount(1);
  });

  test('should open the dropdown on click', async ({ fastPage }) => {
    const { element } = fastPage;
    const listbox = element.locator('fluent-listbox');

    await expect(listbox).toBeHidden();

    await element.click();

    await expect(listbox).toBeVisible();
  });

  test('should close the dropdown on click', async ({ fastPage }) => {
    const { element } = fastPage;
    const listbox = element.locator('fluent-listbox');
    const button = element.locator('[role=combobox]');

    await button.click();

    await expect(listbox).toBeVisible();

    await button.click();

    await expect(listbox).toBeHidden();
  });
});
