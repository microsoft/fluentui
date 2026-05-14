import { expect, test } from '../../test/playwright/index.js';
import { tagName as DividerTagName } from '../divider/divider.options.js';
import type { MenuItem } from '../menu-item/menu-item.js';
import { MenuItemRole, tagName as MenuItemTagName } from '../menu-item/menu-item.options.js';
import { tagName } from './menu-list.options.js';

test.describe('MenuList', () => {
  test.use({
    tagName,
    waitFor: [MenuItemTagName, DividerTagName],
    innerHTML: /* html */ `
      <${MenuItemTagName}>Menu item 1</${MenuItemTagName}>
      <${MenuItemTagName}>Menu item 2</${MenuItemTagName}>
      <${MenuItemTagName}>Menu item 3</${MenuItemTagName}>
      <${MenuItemTagName}>Menu item 4</${MenuItemTagName}>
    `,
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(tagName => {
      document.createElement(tagName);
    }, tagName);

    expect(hasError).toBe(false);
  });

  test('should have a role of `menu`', async ({ fastPage }) => {
    const { element } = fastPage;

    await fastPage.setTemplate();

    await expect(element).toHaveJSProperty('elementInternals.role', 'menu');
  });

  test('should set `tabindex` of the first focusable menu item to 0', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate();

    await expect(menuItems.first()).toHaveAttribute('tabindex', '0');
  });

  test('should NOT set any `tabindex` on non-menu-item elements', async ({ fastPage }) => {
    const { element } = fastPage;
    const divider = element.locator('div.divider');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuItemTagName}>Menu item</${MenuItemTagName}>
        <div class="divider">Not a menu item</div>
      `,
    });

    await expect(divider).not.toHaveAttribute('tabindex');
  });

  test('should focus on first menu item when `focus()` is called', async ({ fastPage }) => {
    const { element } = fastPage;
    const firstItem = element.locator(MenuItemTagName).first();

    await fastPage.setTemplate();

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

    await page.evaluate(tagName => {
      const menu = document.createElement(tagName);

      menu.focus();

      document.body.append(menu);
    }, tagName);

    await expect(element).not.toBeFocused();
  });

  test('should focus disabled items', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuItems = element.locator(MenuItemTagName);
    const firstMenuItem = menuItems.first();

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuItemTagName} disabled>Menu item</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item</${MenuItemTagName}>
      `,
    });

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
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate();

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
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuItemTagName} role="menuitemcheckbox">Menu item 1</${MenuItemTagName}>
        <${MenuItemTagName} role="menuitemcheckbox">Menu item 2</${MenuItemTagName}>
        <${MenuItemTagName} role="menuitemcheckbox">Menu item 3</${MenuItemTagName}>
        <${MenuItemTagName} role="menuitemcheckbox">Menu item 4</${MenuItemTagName}>
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
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuItemTagName} role="menuitemradio">Menu item 1</${MenuItemTagName}>
        <${MenuItemTagName} role="menuitemradio">Menu item 2</${MenuItemTagName}>
        <${MenuItemTagName} role="menuitemradio">Menu item 3</${MenuItemTagName}>
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
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuItemTagName} role="menuitemradio">Menu item 1</${MenuItemTagName}>
        <${MenuItemTagName} role="menuitemradio">Menu item 2</${MenuItemTagName}>
        <${DividerTagName} role="separator"></${DividerTagName}>
        <${MenuItemTagName} role="menuitemradio">Menu item 3</${MenuItemTagName}>
        <${MenuItemTagName} role="menuitemradio">Menu item 4</${MenuItemTagName}>
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
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate();

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
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuItemTagName}
          >Menu item 1
          <${tagName} slot="submenu">
            <${MenuItemTagName}>Menu item 1.1</${MenuItemTagName}>
            <${MenuItemTagName}>Menu item 1.2</${MenuItemTagName}>
            <${MenuItemTagName}>Menu item 1.3</${MenuItemTagName}>
          </${tagName}>
        </${MenuItemTagName}>
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
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuItemTagName}>Menu item 1</${MenuItemTagName}>
        <${MenuItemTagName} hidden="hidden">Menu item 2</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 3</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 4</${MenuItemTagName}>
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

  test('should navigate to previously hidden items when visibility restored', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuItemTagName}>Menu item 1</${MenuItemTagName}>
        <${MenuItemTagName} hidden="hidden">Menu item 2</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 3</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 4</${MenuItemTagName}>
      `,
    });

    await element.evaluate(node => {
      node.focus();
    });

    await expect(menuItems.nth(0)).toBeFocused();

    await element.press('ArrowDown');

    await expect(menuItems.nth(2)).toBeFocused();

    await menuItems.nth(1).evaluate(node => {
      node.removeAttribute('hidden');
    });

    await element.evaluate(node => {
      node.focus();
    });

    await expect(menuItems.nth(0)).toBeFocused();

    await element.press('ArrowDown');

    await expect(menuItems.nth(1)).toBeFocused();
  });

  test('should set the data-indent attribute to 0 correctly on all MenuItem elements when role of menuitem and not content in start slot', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate();

    for (const item of await menuItems.all()) {
      await expect(item).toHaveAttribute('data-indent', '0');
    }
  });

  test('should set the data-indent attribute to 1 correctly on all MenuItem elements when a menuitem in the menu as a role of menuitemcheckbox', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuItemTagName} role="menuitemcheckbox"></${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 2</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 3</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 4</${MenuItemTagName}>
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
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuItemTagName} role="menuitemradio"></${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 2</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 3</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 4</${MenuItemTagName}>
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
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuItemTagName} role="menuitemcheckbox">
          Item 1
          <span slot="start" class="start">Icon</span>
        </${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 2</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 3</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 4</${MenuItemTagName}>
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
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuItemTagName} role="menuitemradio"> Item 1 <span slot="start" class="start">Icon</span> </${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 2</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 3</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 4</${MenuItemTagName}>
      `,
    });

    for (const item of await menuItems.all()) {
      await expect(item).toHaveAttribute('data-indent', '2');
    }
  });

  test('should set the data-indent attribute correctly when menu items are dynamically appended', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate({ innerHTML: '' });

    await element.evaluate((node, MenuItemTagName) => {
      const items = ['item 1', 'item 2', 'item 3'];

      items.forEach(item => {
        const menuItem = document.createElement(MenuItemTagName);
        menuItem.role = 'menuitemradio';
        menuItem.textContent = item;
        node.append(menuItem);
      });
    }, MenuItemTagName);

    await expect(menuItems).toHaveCount(3);

    for (const item of await menuItems.all()) {
      await expect(item).toHaveAttribute('data-indent', '1');
    }
  });

  test('should set the data-indent attribute correctly when menu items are appended via a DocumentFragment', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate({ innerHTML: '' });

    await element.evaluate((node, MenuItemTagName) => {
      const fragment = document.createDocumentFragment();
      const items = ['item 1', 'item 2', 'item 3'];

      items.forEach(item => {
        const menuItem = document.createElement(MenuItemTagName);
        menuItem.role = 'menuitemradio';
        menuItem.textContent = item;
        fragment.append(menuItem);
      });

      node.append(fragment);
    }, MenuItemTagName);

    await expect(menuItems).toHaveCount(3);

    for (const item of await menuItems.all()) {
      await expect(item).toHaveAttribute('data-indent', '1');
    }
  });

  test('should update data-indent on existing items when a menuitemradio is appended and removed', async ({
    fastPage,
  }) => {
    const { element } = fastPage;
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate();

    await test.step('all plain menuitems should start with data-indent 0', async () => {
      for (const item of await menuItems.all()) {
        await expect(item).toHaveAttribute('data-indent', '0');
      }
    });

    await test.step('appending a menuitemradio should update all items to data-indent 1', async () => {
      await element.evaluate((node, MenuItemTagName) => {
        const menuItem = document.createElement(MenuItemTagName);
        menuItem.role = 'menuitemradio';
        menuItem.textContent = 'Radio item';
        node.append(menuItem);
      }, MenuItemTagName);

      await expect(menuItems).toHaveCount(5);

      for (const item of await menuItems.all()) {
        await expect(item).toHaveAttribute('data-indent', '1');
      }
    });

    await test.step('removing the menuitemradio should revert all items to data-indent 0', async () => {
      await menuItems.last().evaluate(node => node.remove());

      await expect(menuItems).toHaveCount(4);

      for (const item of await menuItems.all()) {
        await expect(item).toHaveAttribute('data-indent', '0');
      }
    });
  });

  test.describe('`change` event', () => {
    test('should emit `change` event when `checked` property changed', async ({ fastPage }) => {
      const { element } = fastPage;
      const menuItems = element.locator(MenuItemTagName);

      await fastPage.setTemplate({
        innerHTML: /* html */ `
          <${MenuItemTagName} role="menuitemradio">Menu Item 1</${MenuItemTagName}>
          <${MenuItemTagName}>Menu item 2</${MenuItemTagName}>
          <${MenuItemTagName}>Menu item 3</${MenuItemTagName}>
          <${MenuItemTagName}>Menu item 4</${MenuItemTagName}>
        `,
      });

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
      const menuItems = element.locator(MenuItemTagName);

      await fastPage.setTemplate({
        innerHTML: /* html */ `
          <${tagName}>
            <${MenuItemTagName} role="menuitemradio">Menu Item 1</${MenuItemTagName}>
            <${MenuItemTagName} checked role="menuitemradio">Menu item 2</${MenuItemTagName}>
            <${MenuItemTagName} role="menuitemradio">Menu item 3</${MenuItemTagName}>
            <${MenuItemTagName} role="menuitemradio">Menu item 4</${MenuItemTagName}>
          </${tagName}>
        `,
      });

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
