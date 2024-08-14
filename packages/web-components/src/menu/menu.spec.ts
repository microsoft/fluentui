import { expect, test } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';
import type { Menu } from './menu.js';

test.describe('Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fixtureURL('components-menu--default'));

    await page.waitForFunction(() =>
      Promise.all([
        customElements.whenDefined('fluent-menu'),
        customElements.whenDefined('fluent-menu-list'),
        customElements.whenDefined('fluent-menu-item'),
        customElements.whenDefined('fluent-menu-button'),
      ]),
    );
  });

  test('should have menu-list be initially hidden', async ({ page }) => {
    const element = page.locator('fluent-menu');
    const menuList = element.locator('fluent-menu-list');

    page.setContent(/* html */ `
      <fluent-menu>
        <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
        <fluent-menu-list>
          <fluent-menu-item>Menu item 1</fluent-menu-item>
          <fluent-menu-item>Menu item 2</fluent-menu-item>
          <fluent-menu-item>Menu item 3</fluent-menu-item>
          <fluent-menu-item>Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu>
    `);

    await expect(menuList).toBeHidden();
  });

  test('should be visible when the button is clicked', async ({ page }) => {
    const element = page.locator('fluent-menu');
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    page.setContent(/* html */ `
      <fluent-menu>
        <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
        <fluent-menu-list>
          <fluent-menu-item>Menu item 1</fluent-menu-item>
          <fluent-menu-item>Menu item 2</fluent-menu-item>
          <fluent-menu-item>Menu item 3</fluent-menu-item>
          <fluent-menu-item>Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu>
    `);

    await menuButton.click();

    await expect(menuList).toBeVisible();
  });

  test('should be hidden when the button is clicked again', async ({ page }) => {
    const element = page.locator('fluent-menu');
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    page.setContent(/* html */ `
      <fluent-menu>
        <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
        <fluent-menu-list>
          <fluent-menu-item>Menu item 1</fluent-menu-item>
          <fluent-menu-item>Menu item 2</fluent-menu-item>
          <fluent-menu-item>Menu item 3</fluent-menu-item>
          <fluent-menu-item>Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu>
    `);

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await menuButton.click();

    await expect(menuList).toBeHidden();
  });

  test('should be hidden when an item is clicked', async ({ page }) => {
    const element = page.locator('fluent-menu');
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');
    const menuItems = menuList.locator('fluent-menu-item');

    page.setContent(/* html */ `
      <fluent-menu>
        <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
        <fluent-menu-list>
          <fluent-menu-item>Menu item 1</fluent-menu-item>
          <fluent-menu-item>Menu item 2</fluent-menu-item>
          <fluent-menu-item>Menu item 3</fluent-menu-item>
          <fluent-menu-item>Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu>
    `);

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await menuItems.first().click();

    await expect(menuList).toBeHidden();
  });

  test('should close when an item is keyboard clicked', async ({ page }) => {
    const element = page.locator('fluent-menu');
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');
    const menuItems = menuList.locator('fluent-menu-item');

    page.setContent(/* html */ `
      <fluent-menu>
        <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
        <fluent-menu-list>
          <fluent-menu-item>Menu item 1</fluent-menu-item>
          <fluent-menu-item>Menu item 2</fluent-menu-item>
          <fluent-menu-item>Menu item 3</fluent-menu-item>
          <fluent-menu-item>Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu>
    `);

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await menuItems.first().focus();

    await page.keyboard.press('Enter');

    await expect(menuList).toBeHidden();
  });

  test('should be hidden when clicked outside', async ({ page }) => {
    const element = page.locator('fluent-menu');
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    page.setContent(/* html */ `
        <fluent-menu>
        <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
        <fluent-menu-list>
          <fluent-menu-item>Menu item 1</fluent-menu-item>
          <fluent-menu-item>Menu item 2</fluent-menu-item>
          <fluent-menu-item>Menu item 3</fluent-menu-item>
          <fluent-menu-item>Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu>
    `);

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await page.mouse.click(0, 0);

    await expect(menuList).toBeHidden();
  });

  test('should be hidden when the escape key is pressed', async ({ page }) => {
    const element = page.locator('fluent-menu');
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    page.setContent(/* html */ `
        <fluent-menu>
        <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
        <fluent-menu-list>
          <fluent-menu-item>Menu item 1</fluent-menu-item>
          <fluent-menu-item>Menu item 2</fluent-menu-item>
          <fluent-menu-item>Menu item 3</fluent-menu-item>
          <fluent-menu-item>Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu>
    `);

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(menuList).toBeHidden();
  });

  test('should be hidden when the escape key is pressed on an item', async ({ page }) => {
    const element = page.locator('fluent-menu');
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');
    const menuItems = menuList.locator('fluent-menu-item');

    page.setContent(/* html */ `
        <fluent-menu>
        <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
        <fluent-menu-list>
          <fluent-menu-item>Menu item 1</fluent-menu-item>
          <fluent-menu-item>Menu item 2</fluent-menu-item>
          <fluent-menu-item>Menu item 3</fluent-menu-item>
          <fluent-menu-item>Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu>
    `);

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await menuItems.first().focus();

    await page.keyboard.press('Escape');

    await expect(menuList).toBeHidden();
  });

  test('should open on hover when openOnHover is true', async ({ page }) => {
    const element = page.locator('fluent-menu');
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    page.setContent(/* html */ `
        <fluent-menu>
        <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
        <fluent-menu-list>
          <fluent-menu-item>Menu item 1</fluent-menu-item>
          <fluent-menu-item>Menu item 2</fluent-menu-item>
          <fluent-menu-item>Menu item 3</fluent-menu-item>
          <fluent-menu-item>Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu>
    `);

    await expect(menuList).toBeHidden();

    await menuButton.hover();

    await expect(menuList).toBeHidden();

    await page.mouse.move(0, 0);

    await element.evaluate((x: Menu) => {
      x.openOnHover = true;
    });

    await expect(menuList).toBeHidden();

    await menuButton.hover();

    await expect(menuList).toBeVisible();
  });

  test('should open on context when openOnContext is true', async ({ page }) => {
    const element = page.locator('fluent-menu');
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    page.setContent(/* html */ `
        <fluent-menu>
        <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
        <fluent-menu-list>
          <fluent-menu-item>Menu item 1</fluent-menu-item>
          <fluent-menu-item>Menu item 2</fluent-menu-item>
          <fluent-menu-item>Menu item 3</fluent-menu-item>
          <fluent-menu-item>Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu>
    `);

    await expect(menuList).toBeHidden();

    await menuButton.click({ button: 'right' });
    await expect(menuList).toBeHidden();

    await element.evaluate((x: Menu) => {
      x.openOnContext = true;
    });

    await expect(menuList).toBeHidden();

    await menuButton.dispatchEvent('contextmenu');

    await expect(menuList).toBeVisible();
  });

  test('should focus first item after closing a submenu', async ({ page }) => {
    const element = page.locator('fluent-menu');
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');
    const menuItems = menuList.locator('fluent-menu-item');

    page.setContent(/* html */ `
      <fluent-menu>
        <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
        <fluent-menu-list>
          <fluent-menu-item>
            Item 1
            <fluent-menu-list slot="submenu">
              <fluent-menu-item> Subitem 1 </fluent-menu-item>
              <fluent-menu-item> Subitem 2 </fluent-menu-item>
            </fluent-menu-list>
          </fluent-menu-item>

          <fluent-menu-item role="menuitemcheckbox"> Item 2 </fluent-menu-item>
          <fluent-menu-item role="menuitemcheckbox"> Item 3 </fluent-menu-item>

          <fluent-divider role="separator" aria-orientation="horizontal" orientation="horizontal"></fluent-divider>

          <fluent-menu-item>Menu item 4</fluent-menu-item>
          <fluent-menu-item>Menu item 5</fluent-menu-item>
          <fluent-menu-item>Menu item 6</fluent-menu-item>

          <fluent-menu-item>Menu item 7</fluent-menu-item>
          <fluent-menu-item>Menu item 8</fluent-menu-item>
        </fluent-menu-list>
      </fluent-menu>
    `);

    await menuButton.click();

    await expect(menuList.first()).toBeVisible();

    await expect(menuList.last()).toBeHidden();

    await menuItems.first().focus();

    await page.keyboard.press('ArrowRight');

    await expect(menuList.last()).toBeVisible();

    await page.keyboard.press('ArrowLeft');

    await expect(menuList.last()).toBeHidden();

    await expect(menuList.first()).toBeVisible();

    await expect(menuItems.first()).toBeFocused();
  });
});
