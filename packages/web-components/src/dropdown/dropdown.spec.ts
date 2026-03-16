import { expect, test } from '../../test/playwright/index.js';
import type { Dropdown } from './dropdown.js';

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

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-dropdown');
    });

    expect(hasError).toBe(false);
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

  test('should open the dropdown when the space key is pressed', async ({ fastPage }) => {
    const { element } = fastPage;
    const listbox = element.locator('fluent-listbox');
    const button = element.locator('[role=combobox]');

    await button.press(' ');

    await expect(listbox).toBeVisible();
  });

  test("should set the `name` property on options when it's set on the dropdown", async ({ fastPage }) => {
    const { element } = fastPage;
    const options = element.locator('fluent-option');

    await fastPage.setTemplate({ attributes: { name: 'fruit' } });

    for (const option of await options.all()) {
      await expect(option).toHaveJSProperty('name', 'fruit');
    }
  });

  test.describe('when in a form', () => {
    test('should submit the value when the form is submitted', async ({ fastPage, page }) => {
      const { element } = fastPage;
      const submitButton = page.locator('button[type=submit]');

      await fastPage.setTemplate(/* html */ `
        <form action="foo">
          <fluent-dropdown name="fruit">
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
          <button type="submit">Submit</button>
        </form>
      `);

      await element.click();

      await expect(element.locator('fluent-listbox')).toBeVisible();

      await element.locator('fluent-option[value=cherry]').click();

      await expect(element.locator('fluent-option[value=cherry]')).toHaveJSProperty('selected', true);

      await submitButton.click();

      await expect(page).toHaveURL(/fruit=cherry/);
    });

    test('should NOT submit the value when the dropdown is disabled', async ({ fastPage, page }) => {
      const { element } = fastPage;
      const submitButton = page.locator('button[type=submit]');

      await fastPage.setTemplate(/* html */ `
        <form action="foo">
          <fluent-dropdown name="fruit" disabled>
            <fluent-listbox>
              <fluent-option value="apple">Apple</fluent-option>
              <fluent-option value="banana">Banana</fluent-option>
              <fluent-option value="orange">Orange</fluent-option>
              <fluent-option value="mango">Mango</fluent-option>
              <fluent-option value="kiwi">Kiwi</fluent-option>
              <fluent-option value="cherry" selected>Cherry</fluent-option>
              <fluent-option value="grapefruit">Grapefruit</fluent-option>
              <fluent-option value="papaya">Papaya</fluent-option>
            </fluent-listbox>
          </fluent-dropdown>
          <button type="submit">Submit</button>
        </form>
      `);

      await element.click();

      await expect(element.locator('fluent-listbox')).toBeHidden();

      await submitButton.click();

      await expect(page).not.toHaveURL(/fruit=cherry/);
    });

    test('should NOT submit multiple values when the `multiple` attribute is NOT set and multiple options are selected', async ({
      fastPage,
      page,
    }) => {
      const { element } = fastPage;
      const submitButton = page.locator('button[type=submit]');

      await fastPage.setTemplate(/* html */ `
        <form action="foo">
          <fluent-dropdown name="fruit">
            <fluent-listbox>
              <fluent-option value="apple">Apple</fluent-option>
              <fluent-option value="banana">Banana</fluent-option>
              <fluent-option value="orange">Orange</fluent-option>
              <fluent-option value="mango" selected>Mango</fluent-option>
              <fluent-option value="kiwi" selected>Kiwi</fluent-option>
              <fluent-option value="cherry">Cherry</fluent-option>
              <fluent-option value="grapefruit">Grapefruit</fluent-option>
              <fluent-option value="papaya">Papaya</fluent-option>
            </fluent-listbox>
          </fluent-dropdown>
          <button type="submit">Submit</button>
        </form>
      `);

      await element.click();

      await expect(element.locator('fluent-listbox')).toBeVisible();

      await submitButton.click();

      await expect(page).toHaveURL(/fruit=mango/);

      await expect(page).not.toHaveURL(/fruit=kiwi/);
    });

    test('should submit multiple values when the `multiple` attribute is set and multiple options are selected', async ({
      fastPage,
      page,
    }) => {
      const { element } = fastPage;
      const submitButton = page.locator('button[type=submit]');

      await fastPage.setTemplate(/* html */ `
        <form action="foo">
          <fluent-dropdown name="fruit" multiple>
            <fluent-listbox>
              <fluent-option value="apple">Apple</fluent-option>
              <fluent-option value="banana">Banana</fluent-option>
              <fluent-option value="orange">Orange</fluent-option>
              <fluent-option value="mango" selected>Mango</fluent-option>
              <fluent-option value="kiwi" selected>Kiwi</fluent-option>
              <fluent-option value="cherry">Cherry</fluent-option>
              <fluent-option value="grapefruit">Grapefruit</fluent-option>
              <fluent-option value="papaya">Papaya</fluent-option>
            </fluent-listbox>
          </fluent-dropdown>
          <button type="submit">Submit</button>
        </form>
      `);

      await expect(element.locator('fluent-option[value=mango]')).toHaveJSProperty('selected', true);
      await expect(element.locator('fluent-option[value=mango]')).toHaveAttribute('selected');

      await expect(element.locator('fluent-option[value=kiwi]')).toHaveJSProperty('selected', true);
      await expect(element.locator('fluent-option[value=kiwi]')).toHaveAttribute('selected');

      await submitButton.click();

      await expect(page).toHaveURL(/fruit=mango/);

      await expect(page).toHaveURL(/fruit=kiwi/);
    });

    test('should reset the value when the form is reset', async ({ fastPage, page }) => {
      const { element } = fastPage;
      const resetButton = page.locator('button[type=reset]');

      await fastPage.setTemplate(/* html */ `
        <form action="foo">
          <fluent-dropdown name="fruit">
            <fluent-listbox>
              <fluent-option value="apple">Apple</fluent-option>
              <fluent-option value="banana">Banana</fluent-option>
              <fluent-option value="orange">Orange</fluent-option>
              <fluent-option value="mango" selected>Mango</fluent-option>
              <fluent-option value="kiwi">Kiwi</fluent-option>
              <fluent-option value="cherry">Cherry</fluent-option>
              <fluent-option value="grapefruit">Grapefruit</fluent-option>
              <fluent-option value="papaya">Papaya</fluent-option>
            </fluent-listbox>
          </fluent-dropdown>
          <button type="reset">Reset</button>
        </form>
      `);

      await element.click();

      await expect(element.locator('fluent-listbox')).toBeVisible();

      await element.locator('fluent-option[value=kiwi]').click();

      await expect(element.locator('fluent-option[value=kiwi]')).toHaveJSProperty('selected', true);

      await expect(element.locator('fluent-option[value=mango]')).toHaveJSProperty('selected', false);

      await resetButton.click();

      await expect(element.locator('fluent-option[value=mango]')).toHaveJSProperty('selected', true);

      await expect(element.locator('fluent-option[value=kiwi]')).toHaveJSProperty('selected', false);
    });

    test('should reset the values when the form is reset and the `multiple` attribute is present', async ({
      fastPage,
      page,
    }) => {
      const { element } = fastPage;
      const resetButton = page.locator('button[type=reset]');

      await fastPage.setTemplate(/* html */ `
        <form action="foo">
          <fluent-dropdown name="fruit" multiple>
            <fluent-listbox>
              <fluent-option value="apple">Apple</fluent-option>
              <fluent-option value="banana">Banana</fluent-option>
              <fluent-option value="orange">Orange</fluent-option>
              <fluent-option value="mango" selected>Mango</fluent-option>
              <fluent-option value="kiwi" selected>Kiwi</fluent-option>
              <fluent-option value="cherry">Cherry</fluent-option>
              <fluent-option value="grapefruit">Grapefruit</fluent-option>
              <fluent-option value="papaya">Papaya</fluent-option>
            </fluent-listbox>
          </fluent-dropdown>
          <button type="reset">Reset</button>
        </form>
      `);

      await element.click();

      await expect(element.locator('fluent-listbox')).toBeVisible();

      await element.locator('fluent-option[value=apple]').click();

      await expect(element.locator('fluent-option[value=kiwi]')).toHaveJSProperty('selected', true);

      await expect(element.locator('fluent-option[value=mango]')).toHaveJSProperty('selected', true);

      await expect(element.locator('fluent-option[value=apple]')).toHaveJSProperty('selected', true);

      await resetButton.click();

      await expect(element.locator('fluent-option[value=mango]')).toHaveJSProperty('selected', true);

      await expect(element.locator('fluent-option[value=kiwi]')).toHaveJSProperty('selected', true);

      await expect(element.locator('fluent-option[value=apple]')).toHaveJSProperty('selected', false);
    });

    test('should display a validation message when the dropdown is required and the form is submitted without a value', async ({
      fastPage,
      page,
      browserName,
    }) => {
      const { element } = fastPage;
      const options = element.locator('fluent-option');
      const submitButton = page.locator('button[type=submit]');

      const messages: Record<string, string> = {
        chromium: 'Please select one of these options.',
        edge: 'Please select one of these options.',
        firefox: 'Please select one of these options.',
        webkit: 'Select one of these options',
      };

      await fastPage.setTemplate(/* html */ `
        <form action="foo">
          <fluent-dropdown name="fruit" required>
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
          <button type="submit">Submit</button>
        </form>
      `);

      await expect.soft(element).toHaveJSProperty('validationMessage', messages[browserName]);

      await element.click();

      await options.first().click();

      await expect(element).toHaveJSProperty('validationMessage', '');

      await submitButton.click();
    });
  });

  test.describe('type="combobox"', () => {
    test('should select an option when the user types the value', async ({ fastPage }) => {
      const { element } = fastPage;
      const input = element.locator('input');
      const listbox = element.locator('fluent-listbox');
      const kiwiOption = element.locator('fluent-option[value=kiwi]');

      await fastPage.setTemplate({ attributes: { type: 'combobox' } });

      await input.fill('kiwi');

      await expect(listbox).toBeVisible();

      const kiwiOptionId = await kiwiOption.evaluate(el => el.id);

      await expect(input).toHaveAttribute('aria-activedescendant', kiwiOptionId);

      await expect(kiwiOption).toHaveJSProperty('selected', false);

      await input.press('Enter');

      await expect(kiwiOption).toHaveJSProperty('selected', true);

      await expect(input).toHaveValue('Kiwi');
    });

    test('should emit a `change` event when the value changes and the control loses focus via blur', async ({
      fastPage,
      page,
    }) => {
      const { element } = fastPage;
      const input = element.locator('input');
      const listbox = element.locator('fluent-listbox');

      await fastPage.setTemplate({ attributes: { type: 'combobox' } });

      await input.fill('kiwi');

      await expect(listbox).toBeVisible();

      await expect(input).toHaveValue('kiwi');

      await expect(input).toBeFocused();

      await element.evaluate((el: Dropdown) => {
        el.addEventListener('change', () => el.insertAdjacentText('afterend', 'changed'), { once: true });
      });

      await input.blur();

      await expect(page.locator('text=changed')).toBeVisible();
    });
  });

  test('should emit a `change` event when value changes and the control loses focus via click', async ({
    fastPage,
    page,
  }) => {
    const { element } = fastPage;
    const listbox = element.locator('fluent-listbox');

    await element.click();

    await expect(listbox).toBeVisible();

    await expect(page.locator('text=changed')).toHaveCount(0);

    await element.evaluate((el: Dropdown) => {
      el.addEventListener('change', () => el.insertAdjacentText('afterend', 'changed'), { once: true });
    });

    await expect(page.locator('text=changed')).toHaveCount(0);

    await element.locator('[value=kiwi]').click();

    await expect(page.locator('text=changed')).toHaveCount(1);

    await expect(page.locator('text=changed')).toBeVisible();
  });

  test('should emit a `change` event when the value is confirmed by pressing Enter', async ({ fastPage }) => {
    const { element } = fastPage;
    const listbox = element.locator('fluent-listbox');

    await element.click();

    await expect(listbox).toBeVisible();

    await element.press('ArrowDown');
    await element.press('ArrowDown');
    await element.press('ArrowDown');
    await element.press('ArrowDown');
    await element.press('ArrowDown');

    await expect(element).toHaveJSProperty('activeIndex', 4);

    const [wasChanged] = await Promise.all([
      element.evaluate(
        el =>
          new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject('change event was not emitted'), 1000);
            el.addEventListener(
              'change',
              () => {
                clearTimeout(timeout);
                resolve('changed');
              },
              { once: true },
            );
          }),
      ),
      element.evaluate(el => el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))),
    ]);

    expect(wasChanged).toBe('changed');
  });

  test('should NOT emit a `change` event when the value is changed programmatically', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await element.evaluate((el: Dropdown) => {
      el.addEventListener('change', () => el.insertAdjacentText('afterend', 'changed'), { once: true });
    });

    await element.evaluate((el: Dropdown) => {
      el.value = 'kiwi';
    });

    await expect(page.locator('text=changed')).toHaveCount(0);

    await expect(element).toHaveJSProperty('value', 'kiwi');

    await expect(element.locator('fluent-option[value=kiwi]')).toHaveJSProperty('selected', true);
  });

  test('should not focus listbox when tabbing from dropdown', async ({ fastPage, page }) => {
    const { element } = fastPage;

    const listbox = element.locator('fluent-listbox');

    await element.focus();
    await page.keyboard.press('Tab');

    await expect(listbox).toBeHidden();
  });
});
