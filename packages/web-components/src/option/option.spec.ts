import { expect, test } from '../../test/playwright/index.js';
import type { DropdownOption } from './option.js';

test.describe('DropdownOption', () => {
  test.use({
    tagName: 'fluent-option',
    innerHTML: 'Option',
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-option');
    });

    expect(hasError).toBe(false);
  });

  test('should render an option', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveText('Option');
  });

  test('should have a role of `option`', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('elementInternals.role', 'option');
  });

  test('should set the `disabled` property to match the `disabled` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');
  });

  test('setting the `disabled` property should NOT set the `disabled` attribute', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).not.toHaveAttribute('disabled');

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', null);

    await element.evaluate((node: DropdownOption) => {
      node.disabled = true;
    });

    await expect(element).not.toHaveAttribute('disabled');

    await expect(element).toHaveJSProperty('disabled', true);

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');

    await element.evaluate((node: DropdownOption) => {
      node.disabled = false;
    });

    await expect(element).not.toHaveAttribute('disabled');

    await expect(element).toBeEnabled();

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');
  });

  test('removing the `disabled` attribute should set the `disabled` property to false', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { disabled: true } });

    await expect(element).toHaveJSProperty('disabled', true);

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'true');

    await element.evaluate((node: DropdownOption) => {
      node.removeAttribute('disabled');
    });

    await expect(element).not.toHaveAttribute('disabled');

    await expect(element).toHaveJSProperty('disabled', false);

    await expect(element).toHaveJSProperty('elementInternals.ariaDisabled', 'false');
  });

  test('should NOT set the `selected` attribute to match the `selected` property when the `selected` attribute is NOT present', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).not.toHaveAttribute('selected');

    await expect(element).toHaveJSProperty('selected', false);

    await expect(element).toHaveJSProperty('elementInternals.ariaSelected', 'false');

    await element.evaluate((node: DropdownOption) => {
      node.selected = true;
    });

    await expect(element).not.toHaveAttribute('selected');

    await expect(element).toHaveJSProperty('selected', true);

    await expect(element).toHaveJSProperty('elementInternals.ariaSelected', 'true');

    await element.evaluate((node: DropdownOption) => {
      node.selected = false;
    });

    await expect(element).not.toHaveAttribute('selected');

    await expect(element).toHaveJSProperty('selected', false);

    await expect(element).toHaveJSProperty('elementInternals.ariaSelected', 'false');
  });

  test('should NOT synchronize the `selected` attribute to match the `selected` property when the `selected` property changes', async ({
    fastPage,
  }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ attributes: { selected: true } });

    await expect(element).toHaveAttribute('selected');

    await expect(element).toHaveJSProperty('selected', true);

    await expect(element).toHaveJSProperty('elementInternals.ariaSelected', 'true');

    await element.evaluate((node: DropdownOption) => {
      node.selected = false;
    });

    await expect(element).toHaveAttribute('selected');

    await expect(element).toHaveJSProperty('selected', false);

    await expect(element).toHaveJSProperty('elementInternals.ariaSelected', 'false');
  });

  test('should unset the form value when the option is disabled and selected', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate(/* html */ `
      <form id="test-form" action="#">
        <fluent-option name="option" value="hello" selected>Hello</fluent-option>
      </form>
    `);

    const form = page.locator('#test-form');

    expect(await form.evaluate((node: HTMLFormElement) => Array.from(new FormData(node).entries()))).toEqual([
      ['option', 'hello'],
    ]);

    await element.evaluate((node: DropdownOption) => {
      node.disabled = true;
    });

    expect(await form.evaluate((node: HTMLFormElement) => Array.from(new FormData(node).entries()))).toEqual([]);
  });
});
