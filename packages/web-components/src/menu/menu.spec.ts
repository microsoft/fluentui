import { expect, test } from '../../test/playwright/index.js';
import { tagName as ButtonTagName } from '../button/button.options.js';
import { tagName as DividerTagName } from '../divider/divider.options.js';
import { tagName as MenuButtonTagName } from '../menu-button/menu-button.options.js';
import { tagName as MenuItemTagName } from '../menu-item/menu-item.options.js';
import { tagName as MenuListTagName } from '../menu-list/menu-list.options.js';
import { tagName } from './menu.options.js';

test.describe('Menu', () => {
  test.use({
    innerHTML: /* html */ `
      <${MenuButtonTagName} appearance="primary" slot="trigger">Toggle Menu</${MenuButtonTagName}>
      <${MenuListTagName}>
        <${MenuItemTagName}>Menu item 1</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 2</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 3</${MenuItemTagName}>
        <${MenuItemTagName}>Menu item 4</${MenuItemTagName}>
      </${MenuListTagName}>
    `,
    tagName,
    waitFor: [MenuListTagName, MenuItemTagName, MenuButtonTagName, DividerTagName, ButtonTagName],
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

  test('should have menu-list be initially hidden', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuList = element.locator(MenuListTagName);

    await fastPage.setTemplate();

    await expect(menuList).toBeHidden();
  });

  test('should be visible when the button is clicked', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(MenuListTagName);

    await fastPage.setTemplate();

    await menuButton.click();

    await expect(menuList).toBeVisible();
  });

  test('should be hidden when the button is clicked again', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(MenuListTagName);

    await fastPage.setTemplate();

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await menuButton.click();

    await expect(menuList).toBeHidden();
  });

  test('should be hidden when an item is clicked', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(MenuListTagName);
    const menuItems = menuList.locator(MenuItemTagName);

    await fastPage.setTemplate();

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await expect(menuItems.first()).toBeFocused();

    await menuItems.first().click();

    await expect(menuList).toBeHidden();
  });

  test('should close when an item is focused and the enter key is pressed', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(MenuListTagName);
    const menuItems = menuList.locator(MenuItemTagName);

    await fastPage.setTemplate();

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await expect(menuItems.first()).toBeFocused();

    await page.keyboard.press('Enter');

    await expect(menuList).toBeHidden();
  });

  test('should close when an item is focused and the escape key is pressed', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(MenuListTagName);
    const menuItems = menuList.locator(MenuItemTagName);

    await fastPage.setTemplate();

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await expect(menuItems.first()).toBeFocused();

    await page.keyboard.press('Escape');

    await expect(menuList).toBeHidden();
  });

  test('should close when the mouse is clicked outside the menu', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(MenuListTagName);
    const menuItems = menuList.locator(MenuItemTagName);

    await fastPage.setTemplate();

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await expect(menuItems.first()).toBeFocused();

    await page.mouse.click(0, 0);

    await expect(menuList).toBeHidden();
  });

  test('should close when the escape key is pressed', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(MenuListTagName);
    const menuItems = menuList.locator(MenuItemTagName);

    await fastPage.setTemplate();

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await expect(menuItems.first()).toBeFocused();

    await page.keyboard.press('Escape');

    await expect(menuList).toBeHidden();
  });

  test('should close when the menu list loses keyboard focus', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(MenuListTagName);
    const menuItems = element.locator(MenuItemTagName);

    await fastPage.setTemplate();

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await expect(menuItems.nth(0)).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(menuList).toBeHidden();
  });

  test('should NOT open on hover when the `openOnHover` property is false', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(MenuListTagName);

    await fastPage.setTemplate();

    await expect(menuList).toBeHidden();

    await menuButton.hover();

    await expect(menuList).toBeHidden();
  });

  test('should open on hover when the `openOnHover` property is true', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(MenuListTagName);

    await fastPage.setTemplate({ attributes: { 'open-on-hover': true } });

    await expect(menuList).toBeHidden();

    await menuButton.hover();

    await expect(menuList).toBeVisible();
  });

  test('should NOT open on context when the `openOnContext` property is false', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(MenuListTagName);

    await fastPage.setTemplate();

    await expect(menuList).toBeHidden();

    await menuButton.click({ button: 'right' });

    await expect(menuList).toBeHidden();
  });

  test('should open on context when the `openOnContext` property is true', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(MenuListTagName);

    await fastPage.setTemplate({ attributes: { 'open-on-context': true } });

    await expect(menuList).toBeHidden();

    await menuButton.click({ button: 'right' });

    await expect(menuList).toBeVisible();
  });

  test('should try fallback positions to avoid ending up out of the viewport', async ({
    fastPage: { element },
    page,
  }) => {
    await element.locator('fluent-menu-button').evaluate(element => {
      element.style.position = 'absolute';
      element.style.right = '0px';
    });

    const [viewportHeight, viewportWidth] = await page.evaluate(() => [window.innerHeight, window.innerWidth]);

    const menuButton = element.locator('fluent-menu-button');
    const menuList = element.locator('fluent-menu-list');
    await menuButton.click();

    await expect(menuList).toBeVisible();
    const rect = await menuList.evaluate(element => element.getBoundingClientRect());

    expect(rect.top).toBeGreaterThanOrEqual(0);
    expect(rect.bottom).toBeLessThanOrEqual(viewportHeight);
    expect(rect.left).toBeGreaterThanOrEqual(0);
    expect(rect.right).toBeLessThanOrEqual(viewportWidth);
  });

  test('should set popover attribute on slotted submenu', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(`${MenuListTagName}:not([slot])`);
    const menuItems = menuList.locator(MenuItemTagName);
    const submenuList = element.locator(`${MenuListTagName}[slot="submenu"]`);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuButtonTagName} appearance="primary" slot="trigger">Toggle Menu</${MenuButtonTagName}>
        <${MenuListTagName}>
          <${MenuItemTagName}>
            Menu item 1
            <${MenuListTagName} slot="submenu">
              <${MenuItemTagName}> Subitem 1 </${MenuItemTagName}>
              <${MenuItemTagName}> Subitem 2 </${MenuItemTagName}>
              <${MenuItemTagName}> Subitem 3 </${MenuItemTagName}>
            </${MenuListTagName}>
          </${MenuItemTagName}>
          <${MenuItemTagName}>Menu item 2</${MenuItemTagName}>
          <${MenuItemTagName}>Menu item 3</${MenuItemTagName}>
          <${MenuItemTagName}>Menu item 4</${MenuItemTagName}>
        </${MenuListTagName}>
      `,
    });

    await menuButton.click();

    await expect(menuItems.first()).toBeFocused();

    await element.press('ArrowRight');

    await expect(submenuList).toBeVisible();

    await expect(submenuList).toHaveAttribute('popover');
  });

  test('should focus the first item when a submenu is closed', async ({ fastPage }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(`${MenuListTagName}:not([slot])`);
    const menuItems = menuList.locator(MenuItemTagName);
    const submenuList = element.locator(`${MenuListTagName}[slot="submenu"]`);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuButtonTagName} appearance="primary" slot="trigger">Toggle Menu</${MenuButtonTagName}>
        <${MenuListTagName}>
          <${MenuItemTagName}>
            Menu item 1
            <${MenuListTagName} slot="submenu">
              <${MenuItemTagName}> Subitem 1 </${MenuItemTagName}>
              <${MenuItemTagName}> Subitem 2 </${MenuItemTagName}>
              <${MenuItemTagName}> Subitem 3 </${MenuItemTagName}>
            </${MenuListTagName}>
          </${MenuItemTagName}>
          <${MenuItemTagName}>Menu item 2</${MenuItemTagName}>
          <${MenuItemTagName}>Menu item 3</${MenuItemTagName}>
          <${MenuItemTagName}>Menu item 4</${MenuItemTagName}>
        </${MenuListTagName}>
      `,
    });

    await menuButton.click();

    await expect(menuList).toBeVisible();

    await expect(submenuList).toBeHidden();

    await expect(menuItems.first()).toBeFocused();

    await element.press('ArrowRight');

    await expect(submenuList).toBeVisible();

    await element.press('ArrowLeft');

    await expect(submenuList).toBeHidden();

    await expect(menuList).toBeVisible();

    await expect(menuItems.first()).toBeFocused();
  });

  test('should focus trigger after menu is closed', async ({ fastPage, page }) => {
    const { element } = fastPage;
    const menuButton = element.locator(MenuButtonTagName);
    const menuList = element.locator(MenuListTagName);
    const menuItems = menuList.locator(MenuItemTagName);

    await fastPage.setTemplate({
      innerHTML: /* html */ `
        <${MenuButtonTagName} appearance="primary" slot="trigger" icon-only></${MenuButtonTagName}>
        <${ButtonTagName} appearance="primary" slot="primary-action">Primary Action</${ButtonTagName}>
        <${MenuListTagName}>
          <${MenuItemTagName}>
            Item 1
            <${MenuListTagName} slot="submenu">
              <${MenuItemTagName}> Subitem 1 </${MenuItemTagName}>
              <${MenuItemTagName}> Subitem 2 </${MenuItemTagName}>
            </${MenuListTagName}>
          </${MenuItemTagName}>

          <${MenuItemTagName} role="menuitemcheckbox"> Item 2 </${MenuItemTagName}>
          <${MenuItemTagName} role="menuitemcheckbox"> Item 3 </${MenuItemTagName}>

          <${DividerTagName} role="separator" aria-orientation="horizontal" orientation="horizontal"></${DividerTagName}>

          <${MenuItemTagName}>Menu item 4</${MenuItemTagName}>
          <${MenuItemTagName}>Menu item 5</${MenuItemTagName}>
          <${MenuItemTagName}>Menu item 6</${MenuItemTagName}>

          <${MenuItemTagName}>Menu item 7</${MenuItemTagName}>
          <${MenuItemTagName}>Menu item 8</${MenuItemTagName}>
        </${MenuListTagName}>
      `,
    });

    await menuButton.click();

    await expect(menuItems.nth(0)).toBeFocused();

    await page.keyboard.press('Escape');

    await expect(menuButton).toBeFocused();
  });
});
