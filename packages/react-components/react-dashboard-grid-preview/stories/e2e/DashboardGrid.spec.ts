import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

type PointerType = 'pen' | 'touch';
type ResizeDirection = 'n' | 'e' | 's' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const storyUrl = (story: string): string =>
  `/iframe.html?id=components-dashboard-grid-preview--${story}&viewMode=story`;

const dragTo = async (page: Page, source: Locator, target: { x: number; y: number }): Promise<void> => {
  await source.scrollIntoViewIfNeeded();
  const sourceBox = await source.boundingBox();
  expect(sourceBox).not.toBeNull();
  await page.mouse.move(sourceBox!.x + sourceBox!.width / 2, sourceBox!.y + sourceBox!.height / 2);
  await page.mouse.down();
  await page.mouse.move(target.x, target.y, { steps: 8 });
  await page.mouse.up();
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => resolve())));
};

const dispatchPointerDrag = async (
  page: Page,
  source: Locator,
  target: { x: number; y: number },
  pointerType: PointerType,
  pointerId: number,
): Promise<void> => {
  const sourceBox = await source.boundingBox();
  expect(sourceBox).not.toBeNull();
  const start = {
    x: sourceBox!.x + sourceBox!.width / 2,
    y: sourceBox!.y + sourceBox!.height / 2,
  };

  await source.dispatchEvent('pointerdown', {
    bubbles: true,
    cancelable: true,
    composed: true,
    pointerId,
    pointerType,
    isPrimary: true,
    button: 0,
    buttons: 1,
    clientX: start.x,
    clientY: start.y,
  });
  await page.evaluate(
    ({ x, y, id, type }) => {
      document.dispatchEvent(
        new PointerEvent('pointermove', {
          bubbles: true,
          cancelable: true,
          composed: true,
          pointerId: id,
          pointerType: type,
          isPrimary: true,
          button: 0,
          buttons: 1,
          clientX: x,
          clientY: y,
        }),
      );
    },
    { ...target, id: pointerId, type: pointerType },
  );
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => resolve())));
  await page.evaluate(
    ({ x, y, id, type }) => {
      document.dispatchEvent(
        new PointerEvent('pointerup', {
          bubbles: true,
          cancelable: true,
          composed: true,
          pointerId: id,
          pointerType: type,
          isPrimary: true,
          button: 0,
          buttons: 0,
          clientX: x,
          clientY: y,
        }),
      );
    },
    { ...target, id: pointerId, type: pointerType },
  );
};

const startMouseDrag = async (page: Page, source: Locator, delta: { x: number; y: number }): Promise<void> => {
  await source.scrollIntoViewIfNeeded();
  const sourceBox = await source.boundingBox();
  expect(sourceBox).not.toBeNull();
  const start = {
    x: sourceBox!.x + sourceBox!.width / 2,
    y: sourceBox!.y + sourceBox!.height / 2,
  };
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x + delta.x, start.y + delta.y, { steps: 8 });
};

const readGridRect = async (item: Locator) =>
  item.evaluate(element => ({
    column: Number(element.style.getPropertyValue('--dashboard-grid-column')),
    row: Number(element.style.getPropertyValue('--dashboard-grid-row')),
    columnSpan: Number(element.style.getPropertyValue('--dashboard-grid-column-span')),
    rowSpan: Number(element.style.getPropertyValue('--dashboard-grid-row-span')),
  }));

test.describe('DashboardGrid Storybook browser validation', () => {
  test('supports pointer drag, resize handles, and transformed geometry', async ({ page }) => {
    await page.goto(storyUrl('browser-interactions'));

    const pointerItem = page.locator('[data-dashboard-grid-item="pointer"]');
    await expect(pointerItem).toBeVisible();
    await pointerItem.scrollIntoViewIfNeeded();
    const sourceGrid = page.getByTestId('dashboard-browser-source-grid');
    const sourceBox = await sourceGrid.boundingBox();
    expect(sourceBox).not.toBeNull();

    await dragTo(page, pointerItem, {
      x: sourceBox!.x + sourceBox!.width * 0.4,
      y: sourceBox!.y + 40,
    });
    await expect
      .poll(() => readGridRect(pointerItem))
      .toEqual({
        column: 1,
        row: 0,
        columnSpan: 1,
        rowSpan: 1,
      });
    await expect.poll(() => pointerItem.evaluate(element => element.style.insetInlineStart)).toMatch(/px$/);

    const resizeHandle = pointerItem.locator('[data-dashboard-grid-resize-handle="s"]');
    const heightBefore = (await pointerItem.boundingBox())!.height;
    const handleBox = await resizeHandle.boundingBox();
    expect(handleBox).not.toBeNull();
    await page.mouse.move(handleBox!.x + handleBox!.width / 2, handleBox!.y + handleBox!.height / 2);
    await page.mouse.down();
    await page.mouse.move(handleBox!.x + handleBox!.width / 2, handleBox!.y + handleBox!.height / 2 + 100, {
      steps: 8,
    });
    await page.mouse.up();
    await expect.poll(async () => (await pointerItem.boundingBox())!.height).toBeGreaterThan(heightBefore);

    const transformedItem = page.locator('[data-dashboard-grid-item="transformed"]');
    const transformedGrid = page.getByTestId('dashboard-browser-transformed-grid');
    await transformedItem.scrollIntoViewIfNeeded();
    const transformedBox = await transformedGrid.boundingBox();
    expect(transformedBox).not.toBeNull();
    await dragTo(page, transformedItem, {
      x: transformedBox!.x + transformedBox!.width * 0.4,
      y: transformedBox!.y + 32,
    });
    await expect
      .poll(() => readGridRect(transformedItem))
      .toEqual({
        column: 1,
        row: 0,
        columnSpan: 1,
        rowSpan: 1,
      });
  });

  const resizeExpectations: ReadonlyArray<{
    direction: ResizeDirection;
    delta: { x: number; y: number };
    expected: {
      column: number;
      row: number;
      columnSpan: number;
      rowSpan: number;
    };
  }> = [
    {
      direction: 'n',
      delta: { x: 0, y: -80 },
      expected: { column: 2, row: 1, columnSpan: 2, rowSpan: 3 },
    },
    {
      direction: 'e',
      delta: { x: 80, y: 0 },
      expected: { column: 2, row: 2, columnSpan: 3, rowSpan: 2 },
    },
    {
      direction: 's',
      delta: { x: 0, y: 80 },
      expected: { column: 2, row: 2, columnSpan: 2, rowSpan: 3 },
    },
    {
      direction: 'w',
      delta: { x: -80, y: 0 },
      expected: { column: 1, row: 2, columnSpan: 3, rowSpan: 2 },
    },
    {
      direction: 'ne',
      delta: { x: 80, y: -80 },
      expected: { column: 2, row: 1, columnSpan: 3, rowSpan: 3 },
    },
    {
      direction: 'nw',
      delta: { x: -80, y: -80 },
      expected: { column: 1, row: 1, columnSpan: 3, rowSpan: 3 },
    },
    {
      direction: 'se',
      delta: { x: 80, y: 80 },
      expected: { column: 2, row: 2, columnSpan: 3, rowSpan: 3 },
    },
    {
      direction: 'sw',
      delta: { x: -80, y: 80 },
      expected: { column: 1, row: 2, columnSpan: 3, rowSpan: 3 },
    },
  ];

  for (const { direction, delta, expected } of resizeExpectations) {
    test(`resizes from the ${direction} handle`, async ({ page }) => {
      await page.goto(storyUrl('browser-interactions'));

      const resizeItem = page.locator('[data-dashboard-grid-item="resize"]');
      const resizeHandle = resizeItem.locator(`[data-dashboard-grid-resize-handle="${direction}"]`);
      await expect(resizeHandle).toBeVisible();
      const resizeBox = await resizeItem.boundingBox();
      expect(resizeBox).not.toBeNull();
      await startMouseDrag(page, resizeHandle, {
        x: delta.x * (resizeBox!.width / 160),
        y: delta.y * (resizeBox!.height / 160),
      });
      await page.mouse.up();

      await expect.poll(() => readGridRect(resizeItem)).toEqual(expected);
    });
  }

  test('supports external and cross-grid transfer plus trash removal', async ({ page, isMobile }) => {
    test.skip(isMobile, 'The side-by-side cross-grid fixture is covered by desktop browser projects.');
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
    await viewport.scrollIntoViewIfNeeded();
    const viewportBox = await viewport.boundingBox();
    expect(viewportBox).not.toBeNull();
    expect(await viewport.evaluate(element => element.scrollHeight)).toBeGreaterThan(
      await viewport.evaluate(element => element.clientHeight),
    );

    const item = page.locator('[data-dashboard-grid-item="scroll"]');
    const itemBox = await item.boundingBox();
    expect(itemBox).not.toBeNull();
    const start = {
      x: itemBox!.x + itemBox!.width / 2,
      y: itemBox!.y + itemBox!.height / 2,
    };
    const end = {
      x: viewportBox!.x + viewportBox!.width / 2,
      y: viewportBox!.y + viewportBox!.height - 2,
    };
    const pointerId = 91;
    await item.dispatchEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      composed: true,
      pointerId,
      pointerType: 'mouse',
      isPrimary: true,
      button: 0,
      buttons: 1,
      clientX: start.x,
      clientY: start.y,
    });
    await page.evaluate(
      ({ x, y, id }) => {
        document.dispatchEvent(
          new PointerEvent('pointermove', {
            bubbles: true,
            cancelable: true,
            composed: true,
            pointerId: id,
            pointerType: 'mouse',
            isPrimary: true,
            button: 0,
            buttons: 1,
            clientX: x,
            clientY: y,
          }),
        );
      },
      { x: start.x, y: start.y + 12, id: pointerId },
    );
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => resolve())));
    await page.evaluate(
      ({ x, y, id }) => {
        document.dispatchEvent(
          new PointerEvent('pointermove', {
            bubbles: true,
            cancelable: true,
            composed: true,
            pointerId: id,
            pointerType: 'mouse',
            isPrimary: true,
            button: 0,
            buttons: 1,
            clientX: x,
            clientY: y,
          }),
        );
      },
      { ...end, id: pointerId },
    );
    const scrollTop = await page.evaluate(
      ({ x, y, id }) => {
        const viewportElement = document.querySelector<HTMLElement>(
          '[data-testid="dashboard-browser-scroll-viewport"]',
        )!;

        return new Promise<number>(resolve => {
          const finishAfterScroll = () => {
            if (viewportElement.scrollTop <= 0) {
              requestAnimationFrame(finishAfterScroll);
              return;
            }

            document.dispatchEvent(
              new PointerEvent('pointerup', {
                bubbles: true,
                cancelable: true,
                composed: true,
                pointerId: id,
                pointerType: 'mouse',
                isPrimary: true,
                button: 0,
                buttons: 0,
                clientX: x,
                clientY: y,
              }),
            );
            resolve(viewportElement.scrollTop);
          };

          requestAnimationFrame(finishAfterScroll);
        });
      },
      { ...end, id: pointerId },
    );
    expect(scrollTop).toBeGreaterThan(0);
  });

  for (const [index, pointerType] of (['touch', 'pen'] as const).entries()) {
    test(`supports ${pointerType} pointer input`, async ({ page }) => {
      await page.goto(storyUrl('browser-interactions'));

      const pointerItem = page.locator('[data-dashboard-grid-item="pen"]');
      await pointerItem.scrollIntoViewIfNeeded();
      const pointerBox = await pointerItem.boundingBox();
      expect(pointerBox).not.toBeNull();
      await dispatchPointerDrag(
        page,
        pointerItem,
        {
          x: pointerBox!.x - pointerBox!.width / 2,
          y: pointerBox!.y + pointerBox!.height / 2,
        },
        pointerType,
        41 + index,
      );
      await expect
        .poll(() => readGridRect(pointerItem))
        .toEqual({
          column: 1,
          row: 0,
          columnSpan: 1,
          rowSpan: 1,
        });
    });
  }

  test('supports RTL logical movement', async ({ page }) => {
    await page.goto(storyUrl('browser-interactions'));

    const rtlItem = page.locator('[data-dashboard-grid-item="rtl"]');
    await rtlItem.scrollIntoViewIfNeeded();
    const rtlBox = await rtlItem.boundingBox();
    expect(rtlBox).not.toBeNull();
    await dragTo(page, rtlItem, {
      x: rtlBox!.x - rtlBox!.width,
      y: rtlBox!.y + rtlBox!.height / 2,
    });
    await expect
      .poll(() => readGridRect(rtlItem))
      .toEqual({
        column: 1,
        row: 0,
        columnSpan: 1,
        rowSpan: 1,
      });
  });

  test('places and cleans up original, clone, and custom drag previews', async ({ page }) => {
    await page.goto(storyUrl('drag-previews'));

    const originalItem = page.locator('[data-dashboard-grid-item="preview-original"]');
    await startMouseDrag(page, originalItem, { x: 80, y: 0 });
    await expect.poll(() => originalItem.evaluate(element => element.style.transform)).not.toBe('');
    await expect(page.locator('[data-dashboard-grid-preview]')).toHaveCount(0);
    await page.mouse.up();
    await expect(originalItem).toHaveCSS('transform', 'none');

    const cloneItem = page.locator('[data-dashboard-grid-item="preview-clone"]');
    await startMouseDrag(page, cloneItem, { x: 80, y: 0 });
    const clonePreview = page.locator('[data-dashboard-grid-preview]');
    await expect(clonePreview).toHaveCount(1);
    await expect(clonePreview.getByTestId('dashboard-preview-tile-preview-clone')).toBeVisible();
    expect(
      await clonePreview.evaluate(
        element => element.parentElement?.closest('[data-testid="dashboard-preview-clone-grid"]') !== null,
      ),
    ).toBe(true);
    await page.mouse.up();
    await expect(clonePreview).toHaveCount(0);

    const customItem = page.locator('[data-dashboard-grid-item="preview-custom"]');
    const customPortal = page.getByTestId('dashboard-preview-custom-portal');
    await startMouseDrag(page, customItem, { x: 80, y: 0 });
    const customPreview = customPortal.locator('[data-dashboard-grid-preview]');
    await expect(customPreview).toHaveCount(1);
    await expect(customPreview.getByTestId('dashboard-custom-drag-preview')).toHaveText(
      'Custom preview for preview-custom',
    );
    await page.mouse.up();
    await expect(customPreview).toHaveCount(0);
  });

  test('runs the parity playground smoke path @smoke', async ({ page }) => {
    await page.goto(storyUrl('parity-playground'));

    const playground = page.getByTestId('dashboard-parity-playground');
    const primaryGrid = page.getByTestId('dashboard-grid-primary');

    await expect(playground).toBeVisible();
    await expect(primaryGrid).toBeVisible();
    await expect(page.getByTestId('dashboard-tile-stateful')).toBeVisible();
    const nestedGrid = page.getByTestId('dashboard-grid-nested');
    const nestedItem = page.locator('[data-dashboard-grid-item="nested"]');
    const nestedItemRect = await readGridRect(nestedItem);
    await expect(nestedGrid).toBeVisible();
    await expect(nestedGrid.locator('.fui-DashboardGrid__surface')).toHaveCSS(
      '--dashboard-grid-columns',
      String(nestedItemRect.columnSpan),
    );
    await expect(page.getByTestId('dashboard-grid-parking')).toBeVisible();
    await expect(page.locator('[data-dashboard-grid-item]')).toHaveCount(9);

    await page.getByTestId('dashboard-counter-stateful').click();
    await expect(page.getByTestId('dashboard-counter-value-stateful')).toHaveText('1');

    await page.getByTestId('dashboard-input-interactive').fill('Browser smoke');
    await page.getByTestId('dashboard-descendant-action-interactive').click();
    await expect(page.getByTestId('dashboard-descendant-status-interactive')).toHaveText(
      'Descendant button activated.',
    );

    await page.getByTestId('dashboard-width-medium').click();
    await expect(page.getByTestId('dashboard-active-columns')).toHaveText('6');
    await page.getByTestId('dashboard-width-narrow').click();
    await expect(page.getByTestId('dashboard-active-columns')).toHaveText('1');
    await page.getByTestId('dashboard-width-wide').click();
    await expect(page.getByTestId('dashboard-active-columns')).toHaveText('12');
    await expect(page.getByTestId('dashboard-counter-value-stateful')).toHaveText('1');

    const statefulItem = page
      .locator('[data-dashboard-grid-item]')
      .filter({ has: page.getByTestId('dashboard-tile-stateful') });
    await expect(statefulItem).toHaveAttribute('aria-label', 'Stateful tile');
    await statefulItem.press('F2');
    await expect(page.getByTestId('dashboard-arrange-diagnostics')).toContainText('F2');
    await statefulItem.press('Escape');
    await expect(page.getByTestId('dashboard-arrange-diagnostics')).toContainText('Escape');

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

    await expect(page.getByTestId('dashboard-layout-json')).toContainText('stateful');
    await expect(page.getByTestId('dashboard-event-log')).toContainText('dashboard-primary-grid');
  });

  test('mounts and operates inside an open Shadow DOM @shadow', async ({ page }) => {
    await page.goto(storyUrl('shadow-dom'));

    const host = page.getByTestId('dashboard-shadow-host');
    const shadowGrid = page.getByTestId('dashboard-grid-shadow');

    await expect(host).toBeVisible();
    await expect(shadowGrid).toBeVisible();
    await expect(page.getByTestId('dashboard-tile-shadow-stateful')).toBeVisible();
    expect(await shadowGrid.evaluate(element => element.getRootNode() instanceof ShadowRoot)).toBe(true);

    const shadowItem = page.locator('[data-dashboard-grid-item="shadow-stateful"]');
    await shadowItem.scrollIntoViewIfNeeded();
    expect(await shadowItem.evaluate(element => element.getRootNode() instanceof ShadowRoot)).toBe(true);
    const shadowItemBox = await shadowItem.boundingBox();
    expect(shadowItemBox).not.toBeNull();
    await dragTo(page, shadowItem, {
      x: shadowItemBox!.x + shadowItemBox!.width / 2,
      y: shadowItemBox!.y + shadowItemBox!.height / 2 + 280,
    });
    await expect
      .poll(() => readGridRect(shadowItem))
      .toEqual({
        column: 0,
        row: 4,
        columnSpan: 6,
        rowSpan: 2,
      });

    await page.getByTestId('dashboard-counter-shadow-stateful').click();
    await expect(page.getByTestId('dashboard-counter-value-shadow-stateful')).toHaveText('1');

    await page.getByTestId('dashboard-input-shadow-interactive').fill('Shadow root input');
    await expect(page.getByTestId('dashboard-input-shadow-interactive')).toHaveValue('Shadow root input');
  });

  test('captures print-media rendering @print', async ({ page }, testInfo) => {
    await page.goto(storyUrl('print'));
    await expect(page.getByTestId('dashboard-grid-print')).toBeVisible();
    await expect(page.getByTestId('dashboard-print-mode')).toHaveText('exact');

    await page.emulateMedia({ media: 'print' });

    await expect(page.getByTestId('dashboard-print-controls')).toBeHidden();
    await expect(page.getByTestId('dashboard-tile-print-hidden')).toBeHidden();
    await expect(page.getByTestId('dashboard-tile-print-summary')).toBeVisible();
    const detailItem = page.locator('[data-dashboard-grid-item="print-detail"]');
    await expect(detailItem).toBeVisible();
    expect(await detailItem.evaluate(element => getComputedStyle(element).breakBefore)).toMatch(/page|always/);

    const screenshot = await page.screenshot({ fullPage: true });
    expect(screenshot.byteLength).toBeGreaterThan(1_000);
    await testInfo.attach('dashboard-grid-print-media', {
      body: screenshot,
      contentType: 'image/png',
    });
  });

  test('emits a Chromium PDF @print', async ({ page, browserName }, testInfo) => {
    test.skip(browserName !== 'chromium', 'page.pdf is Chromium-only');

    await page.goto(storyUrl('print'));
    await expect(page.getByTestId('dashboard-grid-print')).toBeVisible();
    await expect(page.getByTestId('dashboard-print-mode')).toHaveText('exact');
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    });

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
