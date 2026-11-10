import { expect, test, type Page } from '@playwright/test';

const buttonRoute = '/#/controls/ios/button';
const navigationName = 'Controls section navigation';

async function openNavigation(page: Page) {
  const toggle = page.getByRole('button', { name: 'Section navigation', exact: true });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  return page.getByRole('navigation', { name: navigationName });
}

async function useCategories(page: Page) {
  await page.getByTitle('Sort list', { exact: true }).click();
  await page.getByRole('menuitem', { name: 'Categories', exact: true }).click();
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 768 });
  await page.goto(buttonRoute);
  await expect(page.getByRole('heading', { name: 'Button iOS', exact: true, level: 1 })).toBeVisible();
});

for (const key of ['Enter', 'Space']) {
  test(`mobile disclosure supports ${key}, normal tabbing and Escape`, async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Section navigation', exact: true });
    const navigation = page.getByRole('navigation', { name: navigationName });
    const controlledId = await toggle.getAttribute('aria-controls');
    expect(controlledId).toBeTruthy();
    const controlled = page.locator(`[id="${controlledId}"]`);

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(controlled).toBeHidden();
    await toggle.focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-app-content-div] :focus')).toHaveCount(1);
    await page.keyboard.press('Shift+Tab');
    await expect(toggle).toBeFocused();

    await page.keyboard.press(key);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(controlled).toBeVisible();
    await expect(navigation).toBeVisible();
    await page.getByTitle('Sort list', { exact: true }).click();
    await page.getByRole('menuitem', { name: 'Alphabetical', exact: true }).click();
    await navigation.getByRole('link', { name: 'Avatar', exact: true }).focus();
    await page.keyboard.press('Tab');
    await expect(navigation.getByRole('link', { name: 'Button', exact: true })).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(navigation.getByRole('link', { name: 'Avatar', exact: true })).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(controlled).toBeHidden();
    await expect(toggle).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-app-content-div] :focus')).toHaveCount(1);
  });
}

test('activating a link loads the destination and hands focus to its content', async ({ page }) => {
  const navigation = await openNavigation(page);
  await useCategories(page);
  await navigation.getByRole('button', { name: 'Items & Lists', exact: true }).click();
  await navigation.getByRole('link', { name: 'Avatar', exact: true }).focus();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/#\/controls\/ios\/avatar$/);
  await expect(page.getByRole('heading', { name: 'Avatar iOS', exact: true, level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Button iOS', exact: true, level: 1 })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Section navigation', exact: true })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  await expect(navigation).toBeHidden();
  await expect(page.locator('[data-app-content-div]')).toBeFocused();
});

for (const startsOnMobile of [true, false]) {
  test(`categories and link focus survive breakpoint changes starting on mobile=${startsOnMobile}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: startsOnMobile ? 767 : 769, height: 768 });
    const navigation = startsOnMobile
      ? await openNavigation(page)
      : page.getByRole('navigation', { name: navigationName });
    await useCategories(page);
    const basic = navigation.getByRole('button', { name: 'Basic Inputs', exact: true });
    const items = navigation.getByRole('button', { name: 'Items & Lists', exact: true });
    await expect(basic).toHaveAttribute('aria-expanded', 'true');
    await expect(items).toHaveAttribute('aria-expanded', 'false');
    await basic.click();
    await items.click();
    const avatar = navigation.getByRole('link', { name: 'Avatar', exact: true });
    await avatar.focus();

    for (const width of startsOnMobile ? [768, 769, 768, 767] : [768, 767, 768, 769]) {
      await page.setViewportSize({ width, height: 768 });
      const toggle = page.getByRole('button', { name: 'Section navigation', exact: true });
      if (width < 768) {
        await expect(toggle).toBeVisible();
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      } else {
        await expect(toggle).toBeHidden();
      }
      await expect(navigation).toBeVisible();
      await expect(basic).toHaveAttribute('aria-expanded', 'false');
      await expect(items).toHaveAttribute('aria-expanded', 'true');
      await expect(avatar).toBeFocused();
    }
  });
}

test('focus moves from the disappearing trigger into the desktop sidebar', async ({ page }) => {
  await page.setViewportSize({ width: 767, height: 768 });
  const toggle = page.getByRole('button', { name: 'Section navigation', exact: true });
  const controlledId = await toggle.getAttribute('aria-controls');
  const platformLink = page.locator(`[id="${controlledId}"]`).getByRole('link', { name: 'React', exact: true });
  await toggle.focus();
  for (const width of [768, 769, 767]) {
    await page.setViewportSize({ width, height: 768 });
    const navigation = page.getByRole('navigation', { name: navigationName });
    await expect(navigation).toBeVisible();
    await expect(platformLink).toBeFocused();
    if (width < 768) {
      await expect(toggle).toBeVisible();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    } else {
      await expect(toggle).toBeHidden();
    }
  }
});

for (const height of [768, 256]) {
  test(`navigation reflows without horizontal scrolling at 320 x ${height}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height });
    const toggle = page.getByRole('button', { name: 'Section navigation', exact: true });
    await expect(toggle).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth))
      .toBeLessThanOrEqual(0);
    const navigation = await openNavigation(page);
    await useCategories(page);
    await navigation.getByRole('button', { name: 'Items & Lists', exact: true }).click();
    await expect(navigation.getByRole('link', { name: 'Avatar', exact: true })).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth))
      .toBeLessThanOrEqual(0);
    await expect
      .poll(() => navigation.evaluate(element => element.scrollWidth - element.clientWidth))
      .toBeLessThanOrEqual(0);
  });
}
