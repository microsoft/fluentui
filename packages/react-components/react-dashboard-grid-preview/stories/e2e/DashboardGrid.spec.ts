import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

const storyUrl = (story: string): string =>
  `/iframe.html?id=components-dashboard-grid-preview--${story}&viewMode=story`;

const dragTo = async (
  page: Page,
  source: Locator,
  target: { x: number; y: number },
): Promise<void> => {
  const sourceBox = await source.boundingBox();
  expect(sourceBox).not.toBeNull();
  await page.mouse.move(
    sourceBox!.x + sourceBox!.width / 2,
    sourceBox!.y + sourceBox!.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(target.x, target.y, { steps: 8 });
  await page.mouse.up();
};

test.describe('DashboardGrid Storybook browser validation', () => {
  test('supports pointer drag, resize handles, and transformed geometry', async ({ page }) => {
    await page.goto(storyUrl('browser-interactions'));

    const pointerItem = page.locator('[data-dashboard-grid-item="pointer"]');
    await expect(pointerItem).toBeVisible();
    const sourceGrid = page.getByTestId('dashboard-browser-source-grid');
    const sourceBox = await sourceGrid.boundingBox();
    expect(sourceBox).not.toBeNull();

    await dragTo(page, pointerItem, {
      x: sourceBox!.x + sourceBox!.width * 0.4,
      y: sourceBox!.y + 40,
    });
    await expect
      .poll(() => pointerItem.evaluate(element => element.style.insetInlineStart))
      .toBe('25%');

    const resizeHandle = pointerItem.locator(
      '[data-dashboard-grid-resize-handle="se"]',
    );
    const widthBefore = (await pointerItem.boundingBox())!.width;
    const handleBox = await resizeHandle.boundingBox();
    expect(handleBox).not.toBeNull();
    await page.mouse.move(
      handleBox!.x + handleBox!.width / 2,
      handleBox!.y + handleBox!.height / 2,
    );
    await page.mouse.down();
    await page.mouse.move(
      handleBox!.x + handleBox!.width / 2 + 100,
      handleBox!.y + handleBox!.height / 2 + 40,
      { steps: 8 },
    );
    await page.mouse.up();
    await expect
      .poll(async () => (await pointerItem.boundingBox())!.width)
      .toBeGreaterThan(widthBefore);

    const transformedItem = page.locator('[data-dashboard-grid-item="transformed"]');
    const transformedGrid = page.getByTestId('dashboard-browser-transformed-grid');
    const transformedBox = await transformedGrid.boundingBox();
    expect(transformedBox).not.toBeNull();
    await dragTo(page, transformedItem, {
      x: transformedBox!.x + transformedBox!.width * 0.4,
      y: transformedBox!.y + 32,
    });
    await expect
      .poll(() =>
        transformedItem.evaluate(element => element.style.insetInlineStart),
      )
      .toBe('25%');
  });

  test('supports external and cross-grid transfer plus trash removal', async ({ page }) => {
    await page.goto(storyUrl('browser-interactions'));

    const targetGrid = page.getByTestId('dashboard-browser-target-grid');
    const targetBox = await targetGrid.boundingBox();
    expect(targetBox).not.toBeNull();

    await dragTo(page, page.getByRole('button', { name: 'Add external tile' }), {
      x: targetBox!.x + targetBox!.width / 2,
      y: targetBox!.y + 40,
    });
    await expect(targetGrid.locator('[data-dashboard-grid-item="external"]')).toBeVisible();

    const crossItem = page.locator('[data-dashboard-grid-item="cross"]');
    await dragTo(page, crossItem, {
      x: targetBox!.x + targetBox!.width * 0.25,
      y: targetBox!.y + 120,
    });
    await expect(targetGrid.locator('[data-dashboard-grid-item="cross"]')).toBeVisible();

    const trashItem = page.locator('[data-dashboard-grid-item="trash"]');
    const trashBox = await page.getByTestId('dashboard-browser-trash').boundingBox();
    expect(trashBox).not.toBeNull();
    await dragTo(page, trashItem, {
      x: trashBox!.x + trashBox!.width / 2,
      y: trashBox!.y + trashBox!.height / 2,
    });
    await expect(trashItem).toHaveCount(0);
  });

  test('autoscrolls a real overflow ancestor during pointer drag', async ({ page }) => {
    await page.goto(storyUrl('browser-interactions'));

    const viewport = page.getByTestId('dashboard-browser-scroll-viewport');
    const viewportBox = await viewport.boundingBox();
    expect(viewportBox).not.toBeNull();
    expect(await viewport.evaluate(element => element.scrollHeight)).toBeGreaterThan(
      await viewport.evaluate(element => element.clientHeight),
    );

    const item = page.locator('[data-dashboard-grid-item="scroll"]');
    const itemBox = await item.boundingBox();
    expect(itemBox).not.toBeNull();
    await page.mouse.move(
      itemBox!.x + itemBox!.width / 2,
      itemBox!.y + itemBox!.height / 2,
    );
    await page.mouse.down();
    await page.mouse.move(
      viewportBox!.x + viewportBox!.width / 2,
      viewportBox!.y + viewportBox!.height - 2,
      { steps: 8 },
    );
    await expect
      .poll(() => viewport.evaluate(element => element.scrollTop))
      .toBeGreaterThan(0);
    await page.mouse.up();
  });

  test('supports pen pointer input and RTL logical movement', async ({ page }) => {
    await page.goto(storyUrl('browser-interactions'));

    const penItem = page.locator('[data-dashboard-grid-item="pen"]');
    const penBox = await penItem.boundingBox();
    expect(penBox).not.toBeNull();
    await penItem.dispatchEvent('pointerdown', {
      pointerId: 41,
      pointerType: 'pen',
      isPrimary: true,
      button: 0,
      clientX: penBox!.x + penBox!.width / 2,
      clientY: penBox!.y + penBox!.height / 2,
    });
    await page.evaluate(
      ({ x, y }) => {
        document.dispatchEvent(
          new PointerEvent('pointermove', {
            bubbles: true,
            cancelable: true,
            pointerId: 41,
            pointerType: 'pen',
            isPrimary: true,
            button: 0,
            clientX: x,
            clientY: y,
          }),
        );
      },
      { x: penBox!.x - penBox!.width / 2, y: penBox!.y + penBox!.height / 2 },
    );
    await page.evaluate(
      () =>
        new Promise<void>(resolve => {
          requestAnimationFrame(() => resolve());
        }),
    );
    await page.evaluate(
      ({ x, y }) => {
        document.dispatchEvent(
          new PointerEvent('pointerup', {
            bubbles: true,
            cancelable: true,
            pointerId: 41,
            pointerType: 'pen',
            isPrimary: true,
            button: 0,
            clientX: x,
            clientY: y,
          }),
        );
      },
      { x: penBox!.x - penBox!.width / 2, y: penBox!.y + penBox!.height / 2 },
    );
    await expect
      .poll(() => penItem.evaluate(element => element.style.insetInlineStart))
      .toBe('25%');

    const rtlItem = page.locator('[data-dashboard-grid-item="rtl"]');
    const rtlBox = await rtlItem.boundingBox();
    expect(rtlBox).not.toBeNull();
    await dragTo(page, rtlItem, {
      x: rtlBox!.x - rtlBox!.width,
      y: rtlBox!.y + rtlBox!.height / 2,
    });
    await expect
      .poll(() => rtlItem.evaluate(element => element.style.insetInlineStart))
      .toBe('25%');
  });

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
