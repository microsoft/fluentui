import { expect, test } from '../../test/playwright/index.js';

test.describe('Menu', () => {
  test.use({
    innerHTML: /* html */ `
      <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
      <fluent-menu-list>
        <fluent-menu-item>Menu item 1</fluent-menu-item>
        <fluent-menu-item>Menu item 2</fluent-menu-item>
        <fluent-menu-item>Menu item 3</fluent-menu-item>
        <fluent-menu-item>Menu item 4</fluent-menu-item>
      </fluent-menu-list>
    `,
    tagName: 'fluent-menu',
    waitFor: ['fluent-menu-list', 'fluent-menu-item', 'fluent-menu-button'],
  });

  test('should create with document.createElement()', async ({ page, fastPage }) => {
    await fastPage.setTemplate();

    let hasError = false;

    page.on('pageerror', () => {
      hasError = true;
    });

    await page.evaluate(() => {
      document.createElement('fluent-menu');
    });

    expect(hasError).toBe(false);
  });

  test('should have menu-list be initially hidden', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuList = element.locator('fluent-menu-list');

    await expect(menuList).toBeHidden();
  });

  test('should be visible when the button is clicked', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    await menuButton.click();

    await expect(menuList).toBeVisible();
  });

  test('should be hidden when the button is clicked again', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await menuButton.click();

    await expect(menuList).toBeHidden();
  });

  test('should be hidden when an item is clicked', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');
    const menuItems = menuList.locator('fluent-menu-item');

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await menuItems.first().click();

    await expect(menuList).toBeHidden();
  });

  test('should close when an item is focused and the enter key is pressed', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');
    const menuItems = menuList.locator('fluent-menu-item');

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await menuItems.first().focus();

    await page.keyboard.press('Enter');

    await expect(menuList).toBeHidden();
  });

  test('should close when an item is focused and the escape key is pressed', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');
    const menuItems = menuList.locator('fluent-menu-item');

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await menuItems.first().focus();

    await page.keyboard.press('Escape');

    await expect(menuList).toBeHidden();
  });

  test('should close when the mouse is clicked outside the menu', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await page.mouse.click(0, 0);

    await expect(menuList).toBeHidden();
  });

  test('should close when the escape key is pressed', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(menuList).toBeHidden();
  });

  test('should NOT open on hover when the `openOnHover` property is false', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    await expect(menuList).toBeHidden();

    await menuButton.hover();

    await expect(menuList).toBeHidden();
  });

  test('should open on hover when the `openOnHover` property is true', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    await fastPage.setTemplate({ attributes: { 'open-on-hover': true } });

    await expect(menuList).toBeHidden();

    await menuButton.hover();

    await expect(menuList).toBeVisible();
  });

  test('should NOT open on context when the `openOnContext` property is false', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    await expect(menuList).toBeHidden();

    await menuButton.click({ button: 'right' });
    await expect(menuList).toBeHidden();
  });

  test('should open on context when the `openOnContext` property is true', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');

    await fastPage.setTemplate({ attributes: { 'open-on-context': true } });

    await expect(menuList).toBeHidden();

    await menuButton.click({ button: 'right' });

    await expect(menuList).toBeVisible();
  });

  test('should set popover attribute on slotted submenu', async ({ fastPage }) => {
    const { element } = fastPage;

    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list:not([slot])');
    const menuItems = menuList.locator('fluent-menu-item');

    const submenuList = element.locator('fluent-menu-list[slot="submenu"]');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
        <fluent-menu-list>
          <fluent-menu-item>
            Menu item 1
            <fluent-menu-list slot="submenu">
              <fluent-menu-item> Subitem 1 </fluent-menu-item>
              <fluent-menu-item> Subitem 2 </fluent-menu-item>
              <fluent-menu-item> Subitem 3 </fluent-menu-item>
            </fluent-menu-list>
          </fluent-menu-item>
          <fluent-menu-item>Menu item 2</fluent-menu-item>
          <fluent-menu-item>Menu item 3</fluent-menu-item>
          <fluent-menu-item>Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      `,
    });

    await menuButton.click();

    await menuItems.first().focus();

    await element.press('ArrowRight');

    await expect(submenuList).toBeVisible();
    await expect(submenuList).toHaveAttribute('popover');
  });

  test('should focus the first item when a submenu is closed', async ({ fastPage }) => {
    const { element } = fastPage;

    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list:not([slot])');
    const menuItems = menuList.locator('fluent-menu-item');

    const submenuList = element.locator('fluent-menu-list[slot="submenu"]');

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <fluent-menu-button appearance="primary" slot="trigger">Toggle Menu</fluent-menu-button>
        <fluent-menu-list>
          <fluent-menu-item>
            Menu item 1
            <fluent-menu-list slot="submenu">
              <fluent-menu-item> Subitem 1 </fluent-menu-item>
              <fluent-menu-item> Subitem 2 </fluent-menu-item>
              <fluent-menu-item> Subitem 3 </fluent-menu-item>
            </fluent-menu-list>
          </fluent-menu-item>
          <fluent-menu-item>Menu item 2</fluent-menu-item>
          <fluent-menu-item>Menu item 3</fluent-menu-item>
          <fluent-menu-item>Menu item 4</fluent-menu-item>
        </fluent-menu-list>
      `,
    });

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await expect(submenuList).toBeHidden();

    await menuItems.first().focus();

    await element.press('ArrowRight');

    await expect(submenuList).toBeVisible();

    await element.press('ArrowLeft');

    await expect(submenuList).toBeHidden();

    await expect(menuList).toBeVisible();

    await expect(menuItems.first()).toBeFocused();
  });

  test('should focus trigger after menu is closed', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const menuButton = element.locator('fluent-menu-button');

    await fastPage.setTemplate(/* html */ `
      <fluent-menu>
        <fluent-menu-button appearance="primary" slot="trigger" icon-only></fluent-menu-button>
        <fluent-button appearance="primary" slot="primary-action">Primary Action</fluent-menu-button>
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

    await page.keyboard.press('Escape');

    await expect(menuButton).toBeFocused();
  });
});
