import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { MenuList } from './menu-list.js';

test.describe('Menu', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;
  let menuItems: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-menu-list');

    root = page.locator('#root');

    menuItems = element.locator('fluent-menu-item');

    await page.goto(fixtureURL('components-menulist--menu-list'));
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should have a role of `menu`', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item>Menu item</fluent-menu-item>
                </fluent-menu-list>
            `;
    });

    await expect(element).toHaveAttribute('role', 'menu');
  });

  test('should set `tabindex` of the first focusable menu item to 0', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item>Menu item</fluent-menu-item>
                    <fluent-menu-item>Menu item</fluent-menu-item>
                </fluent-menu-list>
            `;
    });

    await expect(menuItems.first()).toHaveAttribute('tabindex', '0');
  });

  test('should NOT set any `tabindex` on non-menu-item elements', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item>Menu item</fluent-menu-item>
                    <div class="divider">Not a menu item</div>
                </fluent-menu-list>
            `;
    });

    const divider = element.locator('div.divider');

    expect(await divider.getAttribute('tabindex')).toBeNull();
  });

  test('should focus on first menu item when focus is called', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item>Menu item</fluent-menu-item>
                    <fluent-menu-item>Menu item</fluent-menu-item>
                </fluent-menu-list>
            `;
    });

    await element.waitFor({ state: 'attached' });

    await expect(menuItems.first()).toHaveAttribute('tabindex', '0');

    await root.evaluate(node => {
      document.querySelector<MenuList>('fluent-menu-list')?.focus();
    });

    expect(
      await menuItems.first().evaluate(node => {
        return node.isSameNode(document.activeElement);
      }),
    ).toBeTruthy();
  });

  test('should not throw when focus is called with no items', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list></fluent-menu-list>
            `;
    });

    await root.evaluate(node => {
      document.querySelector<MenuList>('fluent-menu-list')?.focus();
    });

    expect(await page.evaluate(() => document.activeElement?.id)).toBe('');
  });

  test('should not throw when focus is called before initialization is complete', async () => {
    await root.evaluate(node => {
      node.innerHTML = '';

      const menu = document.createElement('fluent-menu-list');

      menu.focus();

      node.append(menu);
    });

    expect(await page.evaluate(() => document.activeElement?.id)).toBe('');
  });

  test('should focus disabled items', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item disabled>Menu item</fluent-menu-item>
                    <fluent-menu-item>Menu item</fluent-menu-item>
                </fluent-menu-list>
            `;
    });

    const firstMenuItem = menuItems.first();

    await expect(firstMenuItem).toBeDisabled();

    await expect(firstMenuItem).toHaveAttribute('tabindex', '0');

    await firstMenuItem.focus();

    await expect(firstMenuItem).toBeFocused();
  });

  ['menuitem', 'menuitemcheckbox', 'menuitemradio'].forEach(role => {
    test(`should accept elements as focusable child with "${role}" role`, async () => {
      await root.evaluate(
        (node, { role }) => {
          node.innerHTML = /* html */ `
                    <fluent-menu-list>
                        <div role="${role}">Menu item</div>
                    </fluent-menu-list>
                `;
        },
        { role },
      );

      await expect(page.locator(`fluent-menu-list [role="${role}"]`).first()).toHaveAttribute('tabindex', '0');
    });
  });

  test('should not navigate to hidden items when changed after connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item>Menu item 1</fluent-menu-item>
                    <fluent-menu-item>Menu item 2</fluent-menu-item>
                    <fluent-menu-item>Menu item 3</fluent-menu-item>
                    <fluent-menu-item>Menu item 4</fluent-menu-item>
                </fluent-menu-list>
            `;
    });

    await expect.soft(menuItems).toHaveCount(4);

    await menuItems.nth(2).evaluate(node => node.toggleAttribute('hidden'));

    await element.evaluate(node => {
      node.focus();
    });

    await (await element.elementHandle())?.waitForElementState('stable');

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

    await (await element.elementHandle())?.waitForElementState('stable');

    await element.press('ArrowDown');

    await expect(menuItems.nth(1)).toBeFocused();

    await element.press('ArrowDown');

    await expect(menuItems.nth(2)).toBeFocused();
  });

  test('should treat all checkbox menu items as individually selectable items', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item role="menuitemcheckbox">Menu item 1</fluent-menu-item>
                    <fluent-menu-item role="menuitemcheckbox">Menu item 2</fluent-menu-item>
                    <fluent-menu-item role="menuitemcheckbox">Menu item 3</fluent-menu-item>
                    <fluent-menu-item role="menuitemcheckbox">Menu item 4</fluent-menu-item>
                </fluent-menu-list>
            `;
    });

    const menuItemsCount = await menuItems.count();

    for (let i = 0; i < menuItemsCount; i++) {
      const item = menuItems.nth(i);

      await expect(item).toHaveAttribute('aria-checked', 'false');

      await item.click();

      await expect(item).toHaveAttribute('aria-checked', 'true');

      await item.click();

      await expect(item).toHaveAttribute('aria-checked', 'false');
    }
  });

  test(`should treat all radio menu items as a radiogroup and limit selection to one item within the group`, async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item role="menuitemradio">Menu item 1</fluent-menu-item>
                    <fluent-menu-item role="menuitemradio">Menu item 2</fluent-menu-item>
                    <fluent-menu-item role="menuitemradio">Menu item 3</fluent-menu-item>
                </fluent-menu-list>
            `;
    });

    await menuItems.first().click();

    await expect(menuItems.first()).toHaveAttribute('aria-checked', 'true');

    await expect(menuItems.nth(1)).toHaveAttribute('aria-checked', 'false');

    await expect(menuItems.nth(2)).toHaveAttribute('aria-checked', 'false');

    await menuItems.nth(1).click();

    await expect(menuItems.first()).toHaveAttribute('aria-checked', 'false');

    await expect(menuItems.nth(1)).toHaveAttribute('aria-checked', 'true');

    await expect(menuItems.nth(2)).toHaveAttribute('aria-checked', 'false');

    await menuItems.nth(2).click();

    await expect(menuItems.first()).toHaveAttribute('aria-checked', 'false');

    await expect(menuItems.nth(1)).toHaveAttribute('aria-checked', 'false');

    await expect(menuItems.nth(2)).toHaveAttribute('aria-checked', 'true');
  });

  test('should use elements with `[role="separator"]` to divide radio menu items into different radio groups', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item role="menuitemradio">Menu item 1</fluent-menu-item>
                    <fluent-menu-item role="menuitemradio">Menu item 2</fluent-menu-item>
                    <fluent-divider role="separator"></fluent-divider>
                    <fluent-menu-item role="menuitemradio">Menu item 3</fluent-menu-item>
                    <fluent-menu-item role="menuitemradio">Menu item 4</fluent-menu-item>
                </fluent-menu-list>
            `;
    });

    await menuItems.nth(0).click();

    await expect(menuItems.nth(0)).toHaveAttribute('aria-checked', 'true');
    await expect(menuItems.nth(1)).toHaveAttribute('aria-checked', 'false');
    await expect(menuItems.nth(2)).toHaveAttribute('aria-checked', 'false');
    await expect(menuItems.nth(3)).toHaveAttribute('aria-checked', 'false');

    await menuItems.nth(1).click();

    await expect(menuItems.nth(0)).toHaveAttribute('aria-checked', 'false');
    await expect(menuItems.nth(1)).toHaveAttribute('aria-checked', 'true');
    await expect(menuItems.nth(2)).toHaveAttribute('aria-checked', 'false');
    await expect(menuItems.nth(3)).toHaveAttribute('aria-checked', 'false');

    await menuItems.nth(2).click();

    await expect(menuItems.nth(0)).toHaveAttribute('aria-checked', 'false');
    await expect(menuItems.nth(1)).toHaveAttribute('aria-checked', 'true');
    await expect(menuItems.nth(2)).toHaveAttribute('aria-checked', 'true');
    await expect(menuItems.nth(3)).toHaveAttribute('aria-checked', 'false');

    await menuItems.nth(3).click();

    await expect(menuItems.nth(0)).toHaveAttribute('aria-checked', 'false');
    await expect(menuItems.nth(1)).toHaveAttribute('aria-checked', 'true');
    await expect(menuItems.nth(2)).toHaveAttribute('aria-checked', 'false');
    await expect(menuItems.nth(3)).toHaveAttribute('aria-checked', 'true');
  });

  test('should navigate the menu on arrow up/down keys', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item>Menu item 1</fluent-menu-item>
                    <fluent-menu-item>Menu item 2</fluent-menu-item>
                    <fluent-menu-item>Menu item 3</fluent-menu-item>
                    <fluent-menu-item>Menu item 4</fluent-menu-item>
                </fluent-menu-list>
            `;
    });

    await element.waitFor({ state: 'attached' });

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

  test('should navigate to submenu, close it with escape key, and return focus to the first menu item', async () => {
    test.slow();
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item>Menu item 1
                        <fluent-menu-list slot="submenu">
                            <fluent-menu-item>Menu item 1.1</fluent-menu-item>
                            <fluent-menu-item>Menu item 1.2</fluent-menu-item>
                            <fluent-menu-item>Menu item 1.3</fluent-menu-item>
                        </fluent-menu-list>
                    </fluent-menu-item>
                </fluent-menu-list>
            `;
    });

    await element.first().evaluate(node => {
      node.focus();
    });

    await element.first().press('ArrowRight');

    await (await element.first().elementHandle())?.waitForElementState('stable');

    await expect(menuItems.nth(1)).toBeFocused();

    await element.first().press('Escape');

    await (await element.first().elementHandle())?.waitForElementState('stable');

    await expect(menuItems.first()).toBeFocused();
  });

  test('should not navigate to hidden items when set before connection', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item>Menu item 1</fluent-menu-item>
                    <fluent-menu-item hidden="hidden">Menu item 2</fluent-menu-item>
                    <fluent-menu-item>Menu item 3</fluent-menu-item>
                    <fluent-menu-item>Menu item 4</fluent-menu-item>
                </fluent-menu-list>
            `;

      // reset the focus to the window to help with flakiness
      window.focus();
    });

    await (await element.elementHandle())?.waitForElementState('stable');

    await element.evaluate(node => {
      node.focus();
    });

    await expect(menuItems.nth(0)).toBeFocused({ timeout: 500 });

    await element.evaluate(node => {
      node.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
        }),
      );
    });

    await expect(menuItems.nth(2)).toBeFocused();

    await element.evaluate(node => {
      node.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
        }),
      );
    });

    await expect(menuItems.nth(3)).toBeFocused();

    await element.evaluate(node => {
      node.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowUp',
        }),
      );
    });

    await expect(menuItems.nth(2)).toBeFocused();

    await element.evaluate(node => {
      node.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowUp',
        }),
      );
    });

    await expect(menuItems.nth(0)).toBeFocused();
  });

  test('should set the data-indent attribute to 0 correctly on all MenuItem elements when role of menuitem and not content in start slot', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item>Menu Item 1</fluent-menu-item>
                    <fluent-menu-item>Menu item 2</fluent-menu-item>
                    <fluent-menu-item>Menu item 3</fluent-menu-item>
                    <fluent-menu-item>Menu item 4</fluent-menu-item>
                </fluent-menu-list>
            `;
    });
    await expect(menuItems.nth(0)).toHaveAttribute('data-indent', '0');
    await expect(menuItems.nth(1)).toHaveAttribute('data-indent', '0');
    await expect(menuItems.nth(2)).toHaveAttribute('data-indent', '0');
    await expect(menuItems.nth(3)).toHaveAttribute('data-indent', '0');
  });

  test('should set the data-indent attribute to 1 correctly on all MenuItem elements when a menuitem in the menu as a role of menuitemcheckbox', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item role="menuitemcheckbox"></fluent-menu-item>
                    <fluent-menu-item>Menu item 2</fluent-menu-item>
                    <fluent-menu-item>Menu item 3</fluent-menu-item>
                    <fluent-menu-item>Menu item 4</fluent-menu-item>
                </fluent-menu-list>
            `;
    });
    await expect(menuItems.nth(0)).toHaveAttribute('data-indent', '1');
    await expect(menuItems.nth(1)).toHaveAttribute('data-indent', '1');
    await expect(menuItems.nth(2)).toHaveAttribute('data-indent', '1');
    await expect(menuItems.nth(3)).toHaveAttribute('data-indent', '1');
  });

  test('should set the data-indent attribute to 1 correctly on all MenuItem elements when a menuitem in the menu as a role of menuitemradio', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item role="menuitemradio"></fluent-menu-item>
                    <fluent-menu-item>Menu item 2</fluent-menu-item>
                    <fluent-menu-item>Menu item 3</fluent-menu-item>
                    <fluent-menu-item>Menu item 4</fluent-menu-item>
                </fluent-menu-list>
            `;
    });
    await expect(menuItems.nth(0)).toHaveAttribute('data-indent', '1');
    await expect(menuItems.nth(1)).toHaveAttribute('data-indent', '1');
    await expect(menuItems.nth(2)).toHaveAttribute('data-indent', '1');
    await expect(menuItems.nth(3)).toHaveAttribute('data-indent', '1');
  });

  test('should set the data-indent attribute to 2 correctly on all MenuItem elements when a menuitem in the menu has a role of menuitemcheckbox and content in the start slot', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item role="menuitemcheckbox">
                         Item 1
                        <span slot="start" class="start">Icon</span>
                    </fluent-menu-item>
                    <fluent-menu-item>Menu item 2</fluent-menu-item>
                    <fluent-menu-item>Menu item 3</fluent-menu-item>
                    <fluent-menu-item>Menu item 4</fluent-menu-item>
                </fluent-menu-list>
            `;
    });
    await expect(menuItems.nth(0)).toHaveAttribute('data-indent', '2');
    await expect(menuItems.nth(1)).toHaveAttribute('data-indent', '2');
    await expect(menuItems.nth(2)).toHaveAttribute('data-indent', '2');
    await expect(menuItems.nth(3)).toHaveAttribute('data-indent', '2');
  });

  test('should set the data-indent attribute to 2 correctly on all MenuItem elements when a menuitem in the menu has a role of menuitemradio and content in the start slot', async () => {
    await root.evaluate(node => {
      node.innerHTML = /* html */ `
                <fluent-menu-list>
                    <fluent-menu-item role="menuitemradio">
                         Item 1
                        <span slot="start" class="start">Icon</span>
                    </fluent-menu-item>
                    <fluent-menu-item>Menu item 2</fluent-menu-item>
                    <fluent-menu-item>Menu item 3</fluent-menu-item>
                    <fluent-menu-item>Menu item 4</fluent-menu-item>
                </fluent-menu-list>
            `;
    });
    await expect(menuItems.nth(0)).toHaveAttribute('data-indent', '2');
    await expect(menuItems.nth(1)).toHaveAttribute('data-indent', '2');
    await expect(menuItems.nth(2)).toHaveAttribute('data-indent', '2');
    await expect(menuItems.nth(3)).toHaveAttribute('data-indent', '2');
  });
});
