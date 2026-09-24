import { expect, test, type Frame, type Page } from '@playwright/test';

import { createPlaygroundHash, decodePlaygroundStateFromHash } from '../src/url';

const PLAYGROUND_URL = '/playground/app/playground.html';
const IMPORTS = `import * as React from 'react';
import { Button } from '@fluentui/react-components';
`;
const COUNTER = `${IMPORTS}import styles from './style.module.css';

export default function Demo() {
  const [count, setCount] = React.useState(0);
  return <Button className={styles.root} onClick={() => setCount(value => value + 1)}>Count {count}</Button>;
}
`;

function setupPage(page: Page) {
  const pageErrors: string[] = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  const preview = page.frameLocator('iframe[title="Playground preview"]');
  const previewButton = (name: string) => preview.getByRole('button', { name, exact: true });
  const previewFrame = (): Frame => {
    const frame = page.frames().find(candidate => candidate.parentFrame() === page.mainFrame());
    if (!frame) {
      throw new Error('Preview iframe is not attached');
    }
    return frame;
  };
  const replaceActiveFile = async (source: string) => {
    const input = page.locator('.monaco-editor textarea').first();
    await input.focus();
    // `Desktop Chrome` emulates a Windows user agent, so Monaco binds "Select All" to Ctrl on every host OS.
    await input.press('Control+A');
    await page.keyboard.insertText(source);
  };
  const errorAlert = (text: string) => page.getByRole('alert').filter({ hasText: text });

  return { pageErrors, previewButton, previewFrame, replaceActiveFile, errorAlert };
}

test.describe('playground', () => {
  test('renders the default setup with a sandboxed preview, typings and live theme updates', async ({ page }) => {
    const { pageErrors, previewButton, previewFrame, replaceActiveFile } = setupPage(page);

    await page.goto(PLAYGROUND_URL);
    await previewButton('Clicked 0 times').click();
    await expect(previewButton('Clicked 1 times')).toBeVisible();

    const iframe = page.locator('iframe');
    await expect(iframe).toHaveCount(1);
    await expect(iframe).toHaveAttribute('sandbox', 'allow-scripts');

    const frame = previewFrame();
    await page.getByRole('combobox', { name: 'Theme' }).click();
    await page.getByRole('option', { name: 'Web Dark' }).click();
    await expect(page.getByText('Ready', { exact: true })).toBeVisible();
    await expect(previewButton('Clicked 1 times')).toBeVisible();
    expect(previewFrame()).toBe(frame);

    // Semantic diagnostics only appear once the collected declarations are registered with Monaco.
    await replaceActiveFile(
      `${IMPORTS}const typeCheck: number = 'text';\nexport default () => <Button>{typeCheck}</Button>;`,
    );
    await expect(page.locator('.monaco-editor .squiggly-error').first()).toBeVisible();
    await replaceActiveFile(`${IMPORTS}export default () => <Button appearance="primary">Typed</Button>;`);
    await expect(previewButton('Typed')).toBeVisible();
    await expect(page.locator('.monaco-editor .squiggly-error')).toHaveCount(0);

    expect(pageErrors).toEqual([]);
  });

  test('opens shared links, applies CSS edits without remounting and syncs the URL', async ({ page }) => {
    const { pageErrors, previewButton, previewFrame, replaceActiveFile } = setupPage(page);
    const cssModules = [{ name: 'style.module.css', source: '.root { border-radius: 2px; }' }];

    await page.goto(`${PLAYGROUND_URL}${createPlaygroundHash({ code: COUNTER, cssModules })}`);
    await previewButton('Count 0').click();
    await expect(previewButton('Count 1')).toBeVisible();
    const frame = previewFrame();

    await page.getByRole('tab', { name: 'style.module.css', exact: true }).click();
    await replaceActiveFile('.root { border-radius: 9px; }');
    await expect
      .poll(() => frame.evaluate(() => getComputedStyle(document.querySelector('button')!).borderRadius))
      .toBe('9px');
    await expect(previewButton('Count 1')).toBeVisible();

    await page.getByRole('tab', { name: 'example.tsx', exact: true }).click();
    await replaceActiveFile(COUNTER.replace('Count {count}', 'Changed {count}'));
    await expect(previewButton('Changed 0')).toBeVisible();
    expect(previewFrame()).toBe(frame);

    await expect.poll(() => decodePlaygroundStateFromHash(new URL(page.url()).hash)?.code).toContain('Changed {count}');
    expect(decodePlaygroundStateFromHash(new URL(page.url()).hash)?.cssModules).toEqual([
      { name: 'style.module.css', source: '.root { border-radius: 9px; }' },
    ]);

    expect(pageErrors).toEqual([]);
  });

  test('keeps the last good preview on errors and restarts a clean sandbox', async ({ page }) => {
    const { pageErrors, previewButton, previewFrame, replaceActiveFile, errorAlert } = setupPage(page);

    await page.goto(
      `${PLAYGROUND_URL}${createPlaygroundHash({ code: `${IMPORTS}export default () => <Button>Start</Button>;` })}`,
    );
    await expect(previewButton('Start')).toBeVisible();

    await replaceActiveFile(
      `${IMPORTS}const probe = globalThis as { runs?: number };\nprobe.runs = (probe.runs ?? 0) + 1;\nexport default () => <Button>Runs {probe.runs}</Button>;`,
    );
    await expect(previewButton('Runs 1')).toBeVisible();
    const frame = previewFrame();
    await page.getByRole('button', { name: 'Run', exact: true }).click();
    await expect(previewButton('Runs 2')).toBeVisible();
    expect(previewFrame()).toBe(frame);

    await page.getByRole('button', { name: 'Restart preview' }).click();
    await expect(previewButton('Runs 1')).toBeVisible();
    expect(frame.isDetached()).toBe(true);
    await expect(page.locator('iframe')).toHaveCount(1);

    await replaceActiveFile(`${IMPORTS}export default () => <Button`);
    await expect(errorAlert('Compilation error')).toBeVisible();
    await expect(previewButton('Runs 1')).toBeVisible();

    await replaceActiveFile(`${IMPORTS}export default () => { throw new Error('Render failed'); };`);
    await expect(errorAlert('Render failed')).toBeVisible();

    await replaceActiveFile(`${IMPORTS}export default () => <Button>Recovered</Button>;`);
    await expect(previewButton('Recovered')).toBeVisible();
    await expect(errorAlert('Render failed')).toHaveCount(0);

    expect(pageErrors).toEqual([]);
  });

  test('loads configured modules lazily and ignores stale results', async ({ page }) => {
    const { pageErrors, previewButton, replaceActiveFile } = setupPage(page);
    const withLazyModule = (label: string) =>
      `${IMPORTS}import { compressToBase64 } from 'lz-string';\nexport default () => <Button data-value={compressToBase64('x')}>${label}</Button>;`;
    let release!: () => void;
    const gate = new Promise<void>(resolve => {
      release = resolve;
    });
    let requested!: () => void;
    const lazyChunkRequested = new Promise<void>(resolve => {
      requested = resolve;
    });

    // `lz-string` is the third configured module, see `e2e/server.cjs`.
    await page.route('**/playground-module-2.*.js', async route => {
      requested();
      await gate;
      await route.continue();
    });

    await page.goto(
      `${PLAYGROUND_URL}${createPlaygroundHash({ code: `${IMPORTS}export default () => <Button>Start</Button>;` })}`,
    );
    await expect(previewButton('Start')).toBeVisible();

    await replaceActiveFile(withLazyModule('Stale import'));
    await lazyChunkRequested;
    await replaceActiveFile(`${IMPORTS}export default () => <Button>Latest code</Button>;`);
    await expect(previewButton('Latest code')).toBeVisible();

    release();
    await page.waitForTimeout(500);
    await expect(previewButton('Latest code')).toBeVisible();
    await expect(previewButton('Stale import')).toHaveCount(0);

    await replaceActiveFile(withLazyModule('Lazy ready'));
    await expect(previewButton('Lazy ready')).toBeVisible();

    expect(pageErrors).toEqual([]);
  });
});
