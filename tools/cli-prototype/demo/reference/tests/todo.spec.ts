import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.on('pageerror', error => {
    throw error;
  });
  page.on('console', message => {
    if (message.type() === 'error') {
      throw new Error(message.text());
    }
  });
  await page.goto('/');
});

test('adds, completes, filters, deletes, and announces tasks', async ({ page }) => {
  await expect(page.getByRole('heading', { name: "Today's tasks" })).toBeVisible();
  await expect(page.getByText('2 tasks left', { exact: true })).toBeVisible();
  const input = page.getByRole('textbox', { name: 'New task' });
  await input.fill('   ');
  await page.getByRole('button', { name: 'Add task', exact: true }).click();
  await expect(page.getByText('Enter a task before adding it.')).toBeVisible();
  await expect(input).toBeFocused();
  await input.fill('  Prepare the demo  ');
  await input.press('Enter');
  const checkbox = page.getByRole('checkbox', { name: 'Prepare the demo', exact: true });
  await expect(checkbox).not.toBeChecked();
  await expect(page.getByText('Added Prepare the demo.', { exact: true })).toBeVisible();
  await expect(page.getByText('3 tasks left', { exact: true })).toBeVisible();
  await checkbox.check();
  await expect(checkbox).toBeChecked();
  await page.getByRole('tab', { name: 'Active', exact: true }).click();
  await expect(checkbox).toHaveCount(0);
  await page.getByRole('tab', { name: 'Completed', exact: true }).click();
  await expect(checkbox).toBeChecked();
  await page.getByRole('button', { name: 'Delete Prepare the demo', exact: true }).click();
  await expect(page.getByText('Deleted Prepare the demo.', { exact: true })).toBeVisible();
  await expect(input).toBeFocused();
  await page.getByRole('tab', { name: 'All', exact: true }).click();
  await expect(page.getByRole('checkbox')).toHaveCount(3);
  await expect(page.getByRole('tab', { name: 'All', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.reload();
  await expect(page.getByRole('checkbox')).toHaveCount(3);
  await page.screenshot({ path: 'test-results/todo-desktop.png', fullPage: true, animations: 'disabled' });
});

test('supports keyboard completion and all empty states without persistence', async ({ page }) => {
  const firstActive = page.getByRole('checkbox', { name: 'Build a focused interface' });
  await firstActive.focus();
  await page.keyboard.press('Space');
  await expect(firstActive).toBeChecked();
  const row = firstActive.locator('..');
  const indicator = row.locator('[class*="indicator"]');
  await expect(indicator).toHaveCSS('outline-style', 'solid');
  await page.getByRole('checkbox', { name: 'Try the headless checkbox' }).check();
  await page.getByRole('tab', { name: 'Active', exact: true }).click();
  await expect(page.getByText('All caught up.')).toBeVisible();
  await page.getByRole('tab', { name: 'Completed', exact: true }).click();
  while (await page.getByRole('button', { name: /^Delete / }).count()) {
    await page
      .getByRole('button', { name: /^Delete / })
      .first()
      .click();
  }
  await expect(page.getByText('No completed tasks yet.')).toBeVisible();
  await page.getByRole('tab', { name: 'All', exact: true }).click();
  await expect(page.getByText('Your list is clear. Add a task to get started.')).toBeVisible();
  await page.reload();
  await expect(page.getByRole('checkbox')).toHaveCount(3);
});

test('keeps labels, indicators, and actions usable on mobile and in forced colors', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole('textbox', { name: 'New task' }).fill('A long task '.repeat(12));
  await page.getByRole('button', { name: 'Add task', exact: true }).click();
  const overflowing = await page.locator('body').evaluate(body => body.scrollWidth > body.clientWidth);
  expect(overflowing).toBe(false);
  const checkbox = page.getByRole('checkbox', { name: 'Try the headless checkbox' });
  await page.getByText('Try the headless checkbox', { exact: true }).click();
  await expect(checkbox).toBeChecked();
  await page.screenshot({ path: 'test-results/todo-mobile.png', fullPage: true, animations: 'disabled' });
  await page.emulateMedia({ forcedColors: 'active' });
  await checkbox.focus();
  await page.keyboard.press('Space');
  await expect(checkbox).not.toBeChecked();
  await expect(checkbox.locator('..').locator('[class*="indicator"]')).toBeVisible();
  await page.screenshot({ path: 'test-results/todo-forced-colors.png', fullPage: true, animations: 'disabled' });
});
