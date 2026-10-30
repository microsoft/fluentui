import { expect, test } from '../../test/playwright/index.js';
import { tagName as SwitchTagName } from '../switch/switch.options.js';
import type { BaseCheckbox } from './checkbox.base.js';
import { tagName as CheckboxTagName } from './checkbox.options.js';

for (const tagName of [CheckboxTagName, SwitchTagName]) {
  test.describe(`${tagName} FormData`, () => {
    test.use({ tagName });

    test('should submit the initial value regardless of attribute order', async ({ fastPage, page }) => {
      await fastPage.setTemplate(/* html */ `
        <form>
          <${tagName} name="checkedFirst" checked value="yes"></${tagName}>
          <${tagName} name="valueFirst" value="yes" checked></${tagName}>
          <${tagName} name="unchecked" value="yes"></${tagName}>
          <input type="checkbox" name="native" checked value="yes">
        </form>
      `);

      await expect
        .poll(() => page.locator('form').evaluate(node => Object.fromEntries(new FormData(node as HTMLFormElement))))
        .toEqual({ checkedFirst: 'yes', valueFirst: 'yes', native: 'yes' });
    });

    test('should synchronize value attributes while preserving checkedness and reset behavior', async ({
      fastPage,
      page,
    }) => {
      const { element } = fastPage;
      await fastPage.setTemplate(/* html */ `
        <form>
          <${tagName} name="control" value="first" checked></${tagName}>
        </form>
      `);
      const getFormValue = () =>
        page.locator('form').evaluate(node => new FormData(node as HTMLFormElement).get('control'));
      await expect.poll(getFormValue).toBe('first');
      await element.evaluate(node => {
        node.dataset.changes = '0';
        for (const type of ['change', 'input']) {
          node.addEventListener(type, () => {
            node.dataset.changes = String(Number(node.dataset.changes) + 1);
          });
        }
        node.setAttribute('value', 'updated');
      });
      await expect.poll(getFormValue).toBe('updated');

      await element.evaluate((node: BaseCheckbox) => {
        node.checked = false;
        node.setAttribute('value', 'unchecked-update');
      });
      await expect.poll(getFormValue).toBeNull();
      await expect(element).toHaveJSProperty('checked', false);
      await page.locator('form').evaluate(node => (node as HTMLFormElement).reset());
      await expect.poll(getFormValue).toBe('unchecked-update');
      await expect(element).toHaveJSProperty('checked', true);
      await expect(element).toHaveAttribute('data-changes', '0');
    });
  });
}
