import { expect, test } from '../../test/playwright/index.js';
import type { MenuItem } from '../menu-item/menu-item.js';
import { MenuItemRole } from '../menu-item/menu-item.options.js';

test.describe('Menu', () => {
  test.use({
    tagName: 'fluent-menu-list',
    waitFor: ['fluent-menu-item'],
    innerHTML: /* html */ `
      <fluent-menu-item>Menu item 1</fluent-menu-item>
      <fluent-menu-item>Menu item 2</fluent-menu-item>
      <fluent-menu-item>Menu item 3</fluent-menu-item>
      <fluent-menu-item>Menu item 4</fluent-menu-item>
    `,
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-menu-list');
    });

    expect(hasError).toBe(false);
  });

  test('should have a role of `menu`', async ({ fastPage }) => {
    const { element } = fastPage;

    await expect(element).toHaveJSProperty('elementInternals.role', 'menu');
  });

  test('should set `tabindex` of the first focusable menu item to 0', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    await expect(menuItems.first()).toHaveAttribute('tabindex', '0');
  });

  test('should NOT set any `tabindex` on non-menu-item elements', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-item>Menu item</fluent-menu-item>
        <div class="divider">Not a menu item</div>
      `,
    });

    const divider = element.locator('div.divider');

    await expect(divider).not.toHaveAttribute('tabindex');
  });

  test('should focus on first menu item when `focus()` is called', async ({ fastPage }) => {
    const { element } = fastPage;
    const firstItem = element.locator('fluent-menu-item').first();

    await expect(firstItem).toHaveAttribute('tabindex', '0');

    await element.evaluate(node => {
      node.focus();
    });

    await expect(firstItem).toBeFocused();
  });

  test('should not throw when `focus()` is called with no items', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate({ innerHTML: '' });

    await element.evaluate(node => {
      node.focus();
    });

    await expect(element).not.toBeFocused();
  });

  test('should not throw when `focus()` is called before initialization is complete', async ({ fastPage, page }) => {
    const { element } = fastPage;

    await fastPage.setTemplate('');

    await page.evaluate(() => {
      const menu = document.createElement('fluent-menu-list');

      menu.focus();

      document.body.append(menu);
    });

    await expect(element).not.toBeFocused();
  });

  test('should focus disabled items', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-item disabled>Menu item</fluent-menu-item>
        <fluent-menu-item>Menu item</fluent-menu-item>
      `,
    });

    const firstMenuItem = menuItems.first();

    await expect(firstMenuItem).toHaveAttribute('disabled');
    await expect(firstMenuItem).toHaveJSProperty('elementInternals.ariaDisabled', 'true');

    await expect(firstMenuItem).toHaveAttribute('tabindex', '0');

    await firstMenuItem.focus();

    await expect(firstMenuItem).toBeFocused();
  });

  for (const role of Object.values(MenuItemRole)) {
    test(`should accept elements as focusable child with "${role}" role`, async ({ fastPage, page }) => {
      await fastPage.setTemplate({
        innerHTML: /* html */ ` <div role="${role}">Menu item</div> `,
      });

      await expect(page.getByRole(role)).toHaveAttribute('tabindex', '0');
    });
  }

  test('should not navigate to hidden items when changed after connection', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-item>Menu item 1</fluent-menu-item>
        <fluent-menu-item>Menu item 2</fluent-menu-item>
        <fluent-menu-item>Menu item 3</fluent-menu-item>
        <fluent-menu-item>Menu item 4</fluent-menu-item>
      `,
    });

    await expect(menuItems).toHaveCount(4);

    await menuItems.nth(2).evaluate(node => node.toggleAttribute('hidden'));

    await element.evaluate(node => {
      node.focus();
    });

    await expect(menuItems.nth(0)).toBeFocused();

    await element.press('ArrowDown');

    await expect(menuItems.nth(1)).toBeFocused();

    await element.press('ArrowDown');

    await expect(menuItems.nth(2)).not.toBeFocused();

    await expect(menuItems.nth(3)).toBeFocused();

    await element.press('ArrowUp');

    await expect(menuItems.nth(2)).not.toBeFocused();

    await expect(menuItems.nth(1)).toBeFocused();

    await element.press('ArrowUp');

    await expect(menuItems.nth(0)).toBeFocused();

    await menuItems.nth(2).evaluate(node => {
      node.removeAttribute('hidden');
    });

    await element.press('ArrowDown');

    await expect(menuItems.nth(1)).toBeFocused();

    await element.press('ArrowDown');

    await expect(menuItems.nth(2)).toBeFocused();
  });

  test('should treat all checkbox menu items as individually selectable items', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-item role="menuitemcheckbox">Menu item 1</fluent-menu-item>
        <fluent-menu-item role="menuitemcheckbox">Menu item 2</fluent-menu-item>
        <fluent-menu-item role="menuitemcheckbox">Menu item 3</fluent-menu-item>
        <fluent-menu-item role="menuitemcheckbox">Menu item 4</fluent-menu-item>
      `,
    });

    for (const item of await menuItems.all()) {
      await expect(item).toHaveJSProperty('elementInternals.ariaChecked', 'false');

      await item.click();

      await expect(item).toHaveJSProperty('elementInternals.ariaChecked', 'true');

      await item.click();

      await expect(item).toHaveJSProperty('elementInternals.ariaChecked', 'false');
    }
  });

  test(`should treat all radio menu items as a radiogroup and limit selection to one item within the group`, async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-item role="menuitemradio">Menu item 1</fluent-menu-item>
        <fluent-menu-item role="menuitemradio">Menu item 2</fluent-menu-item>
        <fluent-menu-item role="menuitemradio">Menu item 3</fluent-menu-item>
      `,
    });

    await menuItems.first().click();

    await expect(menuItems.first()).toHaveJSProperty('elementInternals.ariaChecked', 'true');

    await expect(menuItems.nth(1)).toHaveJSProperty('elementInternals.ariaChecked', 'false');

    await expect(menuItems.nth(2)).toHaveJSProperty('elementInternals.ariaChecked', 'false');

    await menuItems.nth(1).click();

    await expect(menuItems.first()).toHaveJSProperty('elementInternals.ariaChecked', 'false');

    await expect(menuItems.nth(1)).toHaveJSProperty('elementInternals.ariaChecked', 'true');

    await expect(menuItems.nth(2)).toHaveJSProperty('elementInternals.ariaChecked', 'false');

    await menuItems.nth(2).click();

    await expect(menuItems.first()).toHaveJSProperty('elementInternals.ariaChecked', 'false');

    await expect(menuItems.nth(1)).toHaveJSProperty('elementInternals.ariaChecked', 'false');

    await expect(menuItems.nth(2)).toHaveJSProperty('elementInternals.ariaChecked', 'true');
  });

  test('should use elements with `[role="separator"]` to divide radio menu items into different radio groups', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-item role="menuitemradio">Menu item 1</fluent-menu-item>
        <fluent-menu-item role="menuitemradio">Menu item 2</fluent-menu-item>
        <fluent-divider role="separator"></fluent-divider>
        <fluent-menu-item role="menuitemradio">Menu item 3</fluent-menu-item>
        <fluent-menu-item role="menuitemradio">Menu item 4</fluent-menu-item>
      `,
    });

    await test.step('should select the first item in the first group', async () => {
      await menuItems.nth(0).click();

      await expect(menuItems.nth(0)).toHaveJSProperty('elementInternals.ariaChecked', 'true');
      await expect(menuItems.nth(1)).toHaveJSProperty('elementInternals.ariaChecked', 'false');
      await expect(menuItems.nth(2)).toHaveJSProperty('elementInternals.ariaChecked', 'false');
      await expect(menuItems.nth(3)).toHaveJSProperty('elementInternals.ariaChecked', 'false');
    });

    await test.step('should select the second item in the first group', async () => {
      await menuItems.nth(1).click();

      await expect(menuItems.nth(0)).toHaveJSProperty('elementInternals.ariaChecked', 'false');
      await expect(menuItems.nth(1)).toHaveJSProperty('elementInternals.ariaChecked', 'true');
      await expect(menuItems.nth(2)).toHaveJSProperty('elementInternals.ariaChecked', 'false');
      await expect(menuItems.nth(3)).toHaveJSProperty('elementInternals.ariaChecked', 'false');
    });

    await test.step('should select the first item in the second group', async () => {
      await menuItems.nth(2).click();

      await expect(menuItems.nth(0)).toHaveJSProperty('elementInternals.ariaChecked', 'false');
      await expect(menuItems.nth(1)).toHaveJSProperty('elementInternals.ariaChecked', 'true');
      await expect(menuItems.nth(2)).toHaveJSProperty('elementInternals.ariaChecked', 'true');
      await expect(menuItems.nth(3)).toHaveJSProperty('elementInternals.ariaChecked', 'false');
    });

    await test.step('should select the second item in the second group', async () => {
      await menuItems.nth(3).click();

      await expect(menuItems.nth(0)).toHaveJSProperty('elementInternals.ariaChecked', 'false');
      await expect(menuItems.nth(1)).toHaveJSProperty('elementInternals.ariaChecked', 'true');
      await expect(menuItems.nth(2)).toHaveJSProperty('elementInternals.ariaChecked', 'false');
      await expect(menuItems.nth(3)).toHaveJSProperty('elementInternals.ariaChecked', 'true');
    });
  });

  test('should navigate the menu on arrow up/down keys', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    await element.evaluate(node => {
      node.focus();
    });

    await expect(menuItems).toHaveCount(4);

    await expect(menuItems.first()).toBeFocused();

    await element.press('ArrowDown');

    await expect(menuItems.nth(1)).toBeFocused();

    await element.press('ArrowDown');

    await expect(menuItems.nth(2)).toBeFocused();

    await element.press('ArrowDown');

    await expect(menuItems.nth(3)).toBeFocused();
  });

  test('should navigate to submenu, close it with escape key, and return focus to the first menu item', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-item
          >Menu item 1
          <fluent-menu-list slot="submenu">
            <fluent-menu-item>Menu item 1.1</fluent-menu-item>
            <fluent-menu-item>Menu item 1.2</fluent-menu-item>
            <fluent-menu-item>Menu item 1.3</fluent-menu-item>
          </fluent-menu-list>
        </fluent-menu-item>
      `,
    });

    await element.first().evaluate(node => {
      node.focus();
    });

    await element.first().press('ArrowRight');

    await expect(menuItems.nth(1)).toBeFocused();

    await element.first().press('Escape');

    await expect(menuItems.first()).toBeFocused();
  });

  test('should not navigate to hidden items when set before connection', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-item>Menu item 1</fluent-menu-item>
        <fluent-menu-item hidden="hidden">Menu item 2</fluent-menu-item>
        <fluent-menu-item>Menu item 3</fluent-menu-item>
        <fluent-menu-item>Menu item 4</fluent-menu-item>
      `,
    });

    await element.evaluate(node => {
      node.focus();
    });

    await expect(menuItems.nth(0)).toBeFocused();

    await element.press('ArrowDown');

    await expect(menuItems.nth(2)).toBeFocused();

    await element.press('ArrowDown');

    await expect(menuItems.nth(3)).toBeFocused();

    await element.press('ArrowUp');

    await expect(menuItems.nth(2)).toBeFocused();

    await element.press('ArrowUp');

    await expect(menuItems.nth(0)).toBeFocused();
  });

  test('should set the data-indent attribute to 0 correctly on all MenuItem elements when role of menuitem and not content in start slot', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    for (const item of await menuItems.all()) {
      await expect(item).toHaveAttribute('data-indent', '0');
    }
  });

  test('should set the data-indent attribute to 1 correctly on all MenuItem elements when a menuitem in the menu as a role of menuitemcheckbox', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-item role="menuitemcheckbox"></fluent-menu-item>
        <fluent-menu-item>Menu item 2</fluent-menu-item>
        <fluent-menu-item>Menu item 3</fluent-menu-item>
        <fluent-menu-item>Menu item 4</fluent-menu-item>
      `,
    });

    for (const item of await menuItems.all()) {
      await expect(item).toHaveAttribute('data-indent', '1');
    }
  });

  test('should set the data-indent attribute to 1 correctly on all MenuItem elements when a menuitem in the menu as a role of menuitemradio', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-item role="menuitemradio"></fluent-menu-item>
        <fluent-menu-item>Menu item 2</fluent-menu-item>
        <fluent-menu-item>Menu item 3</fluent-menu-item>
        <fluent-menu-item>Menu item 4</fluent-menu-item>
      `,
    });

    for (const item of await menuItems.all()) {
      await expect(item).toHaveAttribute('data-indent', '1');
    }
  });

  test('should set the data-indent attribute to 2 correctly on all MenuItem elements when a menuitem in the menu has a role of menuitemcheckbox and content in the start slot', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-item role="menuitemcheckbox">
          Item 1
          <span slot="start" class="start">Icon</span>
        </fluent-menu-item>
        <fluent-menu-item>Menu item 2</fluent-menu-item>
        <fluent-menu-item>Menu item 3</fluent-menu-item>
        <fluent-menu-item>Menu item 4</fluent-menu-item>
      `,
    });

    for (const item of await menuItems.all()) {
      await expect(item).toHaveAttribute('data-indent', '2');
    }
  });

  test('should set the data-indent attribute to 2 correctly on all MenuItem elements when a menuitem in the menu has a role of menuitemradio and content in the start slot', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const menuItems = element.locator('fluent-menu-item');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-item role="menuitemradio"> Item 1 <span slot="start" class="start">Icon</span> </fluent-menu-item>
        <fluent-menu-item>Menu item 2</fluent-menu-item>
        <fluent-menu-item>Menu item 3</fluent-menu-item>
        <fluent-menu-item>Menu item 4</fluent-menu-item>
      `,
    });

    for (const item of await menuItems.all()) {
      await expect(item).toHaveAttribute('data-indent', '2');
    }
  });

  test.describe('`change` event', () => {
    test('should emit `change` event when `checked` property changed', async ({ fastPage }) => {
      const { element } = fastPage;
      const menuItems = element.locator('fluent-menu-item');

      await fastPage.setTemplate(/* html */ `
        <fluent-menu-list>
          <fluent-menu-item role="menuitemradio">Menu Item 1</fluent-menu-item>
          <fluent-menu-item>Menu item 2</fluent-menu-item>
          <fluent-menu-item>Menu item 3</fluent-menu-item>
          <fluent-menu-item>Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      `);

      const [wasChanged] = await Promise.all([
        menuItems
          .nth(0)
          .evaluate(
            node => new Promise(resolve => node.addEventListener('change', () => resolve(true), { once: true })),
          ),
        menuItems.nth(0).evaluate((node: MenuItem) => {
          node.checked = true;
        }),
      ]);

      expect(wasChanged).toEqual(true);
    });

    test('should emit change event when menu-item checked and unchecked', async ({ fastPage }) => {
      const { element } = fastPage;
      const menuItems = element.locator('fluent-menu-item');

      await fastPage.setTemplate(/* html */ `
        <fluent-menu-list>
          <fluent-menu-item role="menuitemradio">Menu Item 1</fluent-menu-item>
          <fluent-menu-item checked role="menuitemradio">Menu item 2</fluent-menu-item>
          <fluent-menu-item role="menuitemradio">Menu item 3</fluent-menu-item>
          <fluent-menu-item role="menuitemradio">Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      `);

      let wasChanged = menuItems.nth(0).evaluate((node: MenuItem) => {
        return new Promise(resolve => {
          node.addEventListener('change', evt => {
            resolve((evt as any).detail);
          });
        });
      });

      await menuItems.nth(0).click();
      await expect(wasChanged).resolves.toBeTruthy();

      wasChanged = menuItems.nth(0).evaluate((node: MenuItem) => {
        return new Promise(resolve => {
          node.addEventListener('change', evt => {
            resolve((evt as any).detail);
          });
        });
      });

      await menuItems.nth(1).click();
      await expect(wasChanged).resolves.toBeFalsy();
    });
  });
});
