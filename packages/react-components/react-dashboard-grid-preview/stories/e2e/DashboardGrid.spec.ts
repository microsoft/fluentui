import { expect, test } from '@playwright/test';

const storyUrl = (story: string): string =>
  `/iframe.html?id=components-dashboard-grid-preview--${story}&viewMode=story`;

test.describe('DashboardGrid Storybook browser validation', () => {
  test('runs the parity playground smoke path @smoke', async ({ page }) => {
    await page.goto(storyUrl('parity-playground'));

    const playground = page.getByTestId('dashboard-parity-playground');
    const primaryGrid = page.getByTestId('dashboard-grid-primary');

    await expect(playground).toBeVisible();
    await expect(primaryGrid).toBeVisible();
    await expect(page.getByTestId('dashboard-tile-stateful')).toBeVisible();
    const nestedGrid = page.getByTestId('dashboard-grid-nested');
    await expect(nestedGrid).toBeVisible();
    await expect(
      nestedGrid.locator('.fui-DashboardGrid__surface'),
    ).toHaveCSS('--dashboard-grid-columns', '6');
    await expect(page.getByTestId('dashboard-grid-parking')).toBeVisible();
    await expect(page.locator('[data-dashboard-grid-item]')).toHaveCount(9);

    await page.getByTestId('dashboard-counter-stateful').click();
    await expect(page.getByTestId('dashboard-counter-value-stateful')).toHaveText(
      '1',
    );

    await page.getByTestId('dashboard-input-interactive').fill('Browser smoke');
    await page.getByTestId('dashboard-descendant-action-interactive').click();
    await expect(
      page.getByTestId('dashboard-descendant-status-interactive'),
    ).toHaveText('Descendant button activated.');

    await page.getByTestId('dashboard-width-medium').click();
    await expect(page.getByTestId('dashboard-active-columns')).toHaveText('6');
    await page.getByTestId('dashboard-width-narrow').click();
    await expect(page.getByTestId('dashboard-active-columns')).toHaveText('1');
    await page.getByTestId('dashboard-width-wide').click();
    await expect(page.getByTestId('dashboard-active-columns')).toHaveText('12');
    await expect(page.getByTestId('dashboard-counter-value-stateful')).toHaveText(
      '1',
    );

    const statefulItem = page
      .locator('[data-dashboard-grid-item]')
      .filter({ has: page.getByTestId('dashboard-tile-stateful') });
    await expect(statefulItem).toHaveAttribute('aria-label', 'Stateful tile');
    await statefulItem.press('F2');
    await expect(page.getByTestId('dashboard-arrange-diagnostics')).toContainText(
      'F2',
    );
    await statefulItem.press('Escape');
    await expect(page.getByTestId('dashboard-arrange-diagnostics')).toContainText(
      'Escape',
    );

    const removableItem = page.getByTestId('dashboard-tile-removable');
    await page.getByTestId('dashboard-remove-item').click();
    await expect(removableItem).toBeHidden();
    await page.getByTestId('dashboard-reset-layout').click();
    await expect(removableItem).toBeVisible();

    await page.getByTestId('dashboard-add-item').click();
    const firstDynamicItem = page.getByTestId('dashboard-tile-dynamic-1');
    await expect(firstDynamicItem).toBeVisible();
    await page.getByTestId('dashboard-save-layout').click();
    await page.getByTestId('dashboard-add-item').click();
    const secondDynamicItem = page.getByTestId('dashboard-tile-dynamic-2');
    await expect(secondDynamicItem).toBeVisible();
    await page.getByTestId('dashboard-restore-layout').click();
    await expect(firstDynamicItem).toBeVisible();
    await expect(secondDynamicItem).toBeHidden();
    await page.getByTestId('dashboard-reset-layout').click();
    await expect(firstDynamicItem).toBeHidden();

    await expect(page.getByTestId('dashboard-layout-json')).toContainText(
      'stateful',
    );
    await expect(page.getByTestId('dashboard-event-log')).toContainText(
      'dashboard-primary-grid',
    );
  });

  test('mounts and operates inside an open Shadow DOM @shadow', async ({
    page,
  }) => {
    await page.goto(storyUrl('shadow-dom'));

    const host = page.getByTestId('dashboard-shadow-host');
    const shadowGrid = page.getByTestId('dashboard-grid-shadow');

    await expect(host).toBeVisible();
    await expect(shadowGrid).toBeVisible();
    await expect(page.getByTestId('dashboard-tile-shadow-stateful')).toBeVisible();
    expect(
      await shadowGrid.evaluate(
        element => element.getRootNode() instanceof ShadowRoot,
      ),
    ).toBe(true);

    await page.getByTestId('dashboard-counter-shadow-stateful').click();
    await expect(
      page.getByTestId('dashboard-counter-value-shadow-stateful'),
    ).toHaveText('1');

    await page
      .getByTestId('dashboard-input-shadow-interactive')
      .fill('Shadow root input');
    await expect(
      page.getByTestId('dashboard-input-shadow-interactive'),
    ).toHaveValue('Shadow root input');
  });

  test('captures print-media rendering @print', async ({ page }, testInfo) => {
    await page.goto(storyUrl('print'));
    await expect(page.getByTestId('dashboard-grid-print')).toBeVisible();
    await expect(page.getByTestId('dashboard-print-mode')).toHaveText('exact');

    await page.emulateMedia({ media: 'print' });

    await expect(page.getByTestId('dashboard-print-controls')).toBeHidden();
    await expect(page.getByTestId('dashboard-tile-print-hidden')).toBeHidden();
    await expect(page.getByTestId('dashboard-tile-print-summary')).toBeVisible();
    const detailItem = page.locator(
      '[data-dashboard-grid-item="print-detail"]',
    );
    await expect(detailItem).toBeVisible();
    expect(
      await detailItem.evaluate(
        element => getComputedStyle(element).breakBefore,
      ),
    ).toMatch(/page|always/);

    const screenshot = await page.screenshot({ fullPage: true });
    expect(screenshot.byteLength).toBeGreaterThan(1_000);
    await testInfo.attach('dashboard-grid-print-media', {
      body: screenshot,
      contentType: 'image/png',
    });
  });

  test('emits a Chromium PDF @print', async (
    { page, browserName },
    testInfo,
  ) => {
    test.skip(browserName !== 'chromium', 'page.pdf is Chromium-only');

    await page.goto(storyUrl('print'));
    await page.emulateMedia({ media: 'print' });

    const pdf = await page.pdf({
      format: 'A4',
      preferCSSPageSize: true,
      printBackground: true,
    });

    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
    expect(pdf.byteLength).toBeGreaterThan(1_000);
    await testInfo.attach('dashboard-grid.pdf', {
      body: pdf,
      contentType: 'application/pdf',
    });
  });
});
