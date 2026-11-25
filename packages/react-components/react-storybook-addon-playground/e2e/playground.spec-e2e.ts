import { expect, test, type Frame, type Page } from '@playwright/test';

import { createPlaygroundHash, decodePlaygroundStateFromHash } from '../src/url';
import type { PlaygroundRuntimeManifest } from '../src/setup';

const PLAYGROUND_URL = '/playground/app/playground.html';
const PRIVATE_BUILD_ROOT = '/authenticated/nested/storybook/';
const PRIVATE_PLAYGROUND_URL = `${PRIVATE_BUILD_ROOT}playground/app/playground.html`;
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

test.describe('authenticated deployment', () => {
  test('protects runtime, CSS and real font assets with the shell session cookie and same-origin CORP', async ({
    page,
  }) => {
    const manifestPath = `${PRIVATE_BUILD_ROOT}playground/runtime/manifest.json`;
    expect((await page.request.get(manifestPath)).status()).toBe(401);
    await page.request.get(PRIVATE_PLAYGROUND_URL);
    const manifest: PlaygroundRuntimeManifest = await (await page.request.get(manifestPath)).json();
    const stylesheetPath = `${PRIVATE_BUILD_ROOT}${
      manifest.inlineStyles!.find(style => style.cssText.includes('data:font/ttf;base64,'))!.href
    }`;
    const stylesheet = await page.request.get(stylesheetPath);
    const fontReference = (await stylesheet.text()).match(/url\(([^)]+\.ttf)\)/)?.[1];
    expect(fontReference).toBeDefined();
    const fontPath = new URL(fontReference!, stylesheet.url()).pathname;
    const font = await page.request.get(fontPath);
    expect(font.status()).toBe(200);
    expect(font.headers()['content-type']).toBe('font/ttf');
    expect((await font.body()).length).toBeGreaterThan(0);

    await page.context().clearCookies();
    for (const asset of [manifestPath, `${PRIVATE_BUILD_ROOT}${manifest.scripts[0]}`, stylesheetPath, fontPath]) {
      const response = await page.request.get(asset);
      expect(response.status()).toBe(401);
      expect(response.headers()['cross-origin-resource-policy']).toBe('same-origin');
    }
  });

  for (const coep of [false, true]) {
    test(`loads protected eager/shared/lazy scripts and inlined CSS/fonts ${coep ? 'with' : 'without'} COEP`, async ({
      page,
    }) => {
      const { pageErrors, previewButton, previewFrame, replaceActiveFile } = setupPage(page);
      const requests: Array<Promise<{ path: string; fromShell: boolean; type: string; cookie: string | null }>> = [];
      const previewAssetRequests: string[] = [];
      page.on('request', request => {
        const { pathname, protocol } = new URL(request.url());
        if (
          pathname.startsWith(PRIVATE_BUILD_ROOT) &&
          !pathname.includes('/playground/app/') &&
          pathname.endsWith('.js')
        ) {
          requests.push(
            request.headerValue('cookie').then(cookie => ({
              path: pathname,
              fromShell: request.frame() === page.mainFrame(),
              type: request.resourceType(),
              cookie,
            })),
          );
        }
        if (
          protocol === 'http:' &&
          request.frame() !== page.mainFrame() &&
          ['stylesheet', 'font'].includes(request.resourceType())
        ) {
          previewAssetRequests.push(request.url());
        }
      });
      await page.goto(
        `${PRIVATE_PLAYGROUND_URL}${coep ? '?coep=require-corp' : ''}${createPlaygroundHash({
          code: `${IMPORTS}export default () => <><span id="font-probe" className="playground-private-eager">&#xea60;</span><Button>Private eager</Button></>;`,
        })}`,
      );
      await expect(previewButton('Private eager')).toBeVisible();
      expect(await page.evaluate(() => globalThis.crossOriginIsolated)).toBe(coep);
      expect(await page.evaluate(() => document.cookie)).not.toContain('playground-auth');
      expect(await page.context().cookies()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'playground-auth',
            httpOnly: true,
            sameSite: 'Lax',
            path: PRIVATE_BUILD_ROOT,
          }),
        ]),
      );
      const manifest: PlaygroundRuntimeManifest = await (
        await page.request.get(`${PRIVATE_BUILD_ROOT}playground/runtime/manifest.json`)
      ).json();
      expect(manifest.styles).toEqual([]);
      expect(manifest.inlineStyles!.length).toBeGreaterThan(1);
      expect(manifest.inlineStyles!.some(style => style.cssText.includes('data:font/ttf;base64,'))).toBe(true);
      expect(
        await previewFrame().evaluate(() =>
          Array.from(document.querySelectorAll('style[data-href]'), style => style.getAttribute('data-href')),
        ),
      ).toEqual(manifest.inlineStyles!.map(style => style.href));
      expect(manifest.scripts.some(script => script.startsWith('runtime~playground-runtime.'))).toBe(true);
      expect((await Promise.all(requests)).some(request => /playground-module-[23]\./.test(request.path))).toBe(false);
      await expect
        .poll(() =>
          previewFrame().evaluate(async () => {
            const fonts = await document.fonts.load('16px "Playground Fixture"', '\uea60');
            return fonts.length > 0 && fonts.every(font => font.status === 'loaded');
          }),
        )
        .toBe(true);
      expect(
        await previewFrame().evaluate(() => getComputedStyle(document.getElementById('font-probe')!).fontFamily),
      ).toContain('Playground Fixture');

      await replaceActiveFile(
        `${IMPORTS}import { compressToBase64 } from 'lz-string';\n` +
          `import { className } from 'playground-private-assets';\n` +
          `export default () => <><span id="lazy-probe" className={className}>Lazy CSS</span><Button data-value={compressToBase64('private')}>Private lazy</Button></>;`,
      );
      await expect(previewButton('Private lazy')).toHaveAttribute('data-value', /\S+/);
      expect(
        await previewFrame().evaluate(
          () => getComputedStyle(document.getElementById('lazy-probe')!).textDecorationLine,
        ),
      ).toBe('underline');
      const loaded = await Promise.all(requests);
      expect(loaded.some(request => /playground-module-2\./.test(request.path))).toBe(true);
      expect(loaded.some(request => /playground-module-3\./.test(request.path))).toBe(true);
      expect(
        manifest.scripts.every(script => loaded.some(request => request.path === `${PRIVATE_BUILD_ROOT}${script}`)),
      ).toBe(true);
      expect(
        loaded.every(
          request =>
            request.fromShell && request.type === 'fetch' && request.cookie?.includes('playground-auth=fixture'),
        ),
      ).toBe(true);
      expect(previewAssetRequests).toEqual([]);
      expect(await previewFrame().evaluate(() => globalThis.origin)).toBe('null');
      await expect(previewFrame().evaluate(() => globalThis.parent.document.body.innerHTML)).rejects.toThrow(
        /Blocked a frame|SecurityError/,
      );
      await expect(page.locator('iframe')).toHaveAttribute('sandbox', 'allow-scripts');
      expect(pageErrors).toEqual([]);
    });
  }

  for (const [failure, message] of [
    ['unauthorized', '401 Unauthorized'],
    ['redirect', 'Failed to fetch'],
    ['html', 'instead of JavaScript'],
    ['json', 'instead of JavaScript'],
    ['plain', 'instead of JavaScript'],
    ['missing', 'instead of JavaScript'],
  ]) {
    test(`reports ${failure} as an initialization error without navigating to sign-in`, async ({ page }) => {
      const { previewButton, previewFrame, errorAlert } = setupPage(page);
      const loginRequests: string[] = [];
      page.on('request', request => {
        if (new URL(request.url()).pathname === `${PRIVATE_BUILD_ROOT}login`) {
          loginRequests.push(request.url());
        }
      });
      await page.goto(
        `${PRIVATE_PLAYGROUND_URL}?coep=require-corp&runtimeFailure=${failure}${createPlaygroundHash({
          code: `${IMPORTS}export default () => <Button>Should not initialize</Button>;`,
        })}`,
      );
      await expect(errorAlert('Playground runtime failed to load')).toContainText(message);
      await expect(previewButton('Should not initialize')).toHaveCount(0);
      expect(previewFrame().url()).toBe('about:srcdoc');
      expect(new URL(page.url()).pathname).toBe(PRIVATE_PLAYGROUND_URL);
      expect(loginRequests).toEqual([]);
      await expect(page.locator('iframe')).toHaveAttribute('sandbox', 'allow-scripts');
    });
  }

  test('preserves native Storybook CSS and lazy script loading in the private build', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    await page.goto(`${PRIVATE_BUILD_ROOT}storybook-fixture.html?coep=require-corp`);
    await expect(page.locator('link[rel="stylesheet"]')).not.toHaveCount(0);
    await expect(page.locator('style[data-href]')).toHaveCount(0);
    const button = page.getByRole('button', { name: /^React / });
    await expect(button).toBeVisible();
    await button.click();
    await expect(page.getByRole('button', { name: 'Native runtime ready' })).toHaveAttribute('data-value', /\S+/);
    expect(pageErrors).toEqual([]);
  });

  test('lets a standalone shell explicitly select an authenticated nested build', async ({ page }) => {
    const { previewButton } = setupPage(page);
    await page.request.get(PRIVATE_PLAYGROUND_URL);
    const manifest = `${PRIVATE_BUILD_ROOT}playground/runtime/manifest.json`;
    await page.goto(
      `/standalone/playground.html?manifest=${encodeURIComponent(manifest)}${createPlaygroundHash({
        code: `${IMPORTS}export default () => <Button>Standalone private build</Button>;`,
      })}`,
    );
    await expect(previewButton('Standalone private build')).toBeVisible();
    await expect(page.locator('iframe')).toHaveAttribute('sandbox', 'allow-scripts');
  });

  test('does not fetch out-of-build resources authorized by a modified manifest', async ({ page }) => {
    const privateReads: string[] = [];
    page.on('request', request => {
      if (new URL(request.url()).pathname === '/private/secret.js') {
        privateReads.push(request.url());
      }
    });
    await page.route(`**${PRIVATE_BUILD_ROOT}playground/runtime/manifest.json`, async route => {
      const response = await route.fetch();
      const manifest: PlaygroundRuntimeManifest = await response.json();
      manifest.scripts[0] = '/private/secret.js';
      manifest.allowedScriptFiles!.push('/private/secret.js');
      await route.fulfill({ response, json: manifest });
    });
    await page.goto(PRIVATE_PLAYGROUND_URL);
    await expect(page.locator('body')).toContainText('outside the selected build');
    await expect(page.locator('iframe')).toHaveCount(0);
    expect(privateReads).toEqual([]);
  });
});

test.describe('playground', () => {
  test('loads eager and lazy runtime chunks when deployment requires cross-origin resource permission', async ({
    page,
  }) => {
    const { pageErrors, previewButton, replaceActiveFile } = setupPage(page);
    const manifest: { scripts: string[]; allowedScriptFiles: string[] } = await (
      await page.request.get('/playground/runtime/manifest.json')
    ).json();
    const scriptPaths = new Set(manifest.allowedScriptFiles.map(file => `/${file}`));
    expect(manifest.scripts.some(file => file.startsWith('runtime~playground-runtime.'))).toBe(true);
    expect(manifest.scripts.length).toBeGreaterThan(1);
    expect(manifest.allowedScriptFiles.some(file => file.startsWith('storybook.'))).toBe(false);
    const requests: Array<{ path: string; fromShell: boolean; type: string }> = [];
    page.on('request', request => {
      const { pathname } = new URL(request.url());
      if (scriptPaths.has(pathname)) {
        requests.push({
          path: pathname,
          fromShell: request.frame() === page.mainFrame(),
          type: request.resourceType(),
        });
      }
    });

    await page.goto(
      `${PLAYGROUND_URL}?coep=require-corp${createPlaygroundHash({
        code: `${IMPORTS}export default () => <Button>Initial</Button>;`,
      })}`,
    );
    await expect(previewButton('Initial')).toBeVisible();
    expect(await page.evaluate(() => globalThis.crossOriginIsolated)).toBe(true);
    expect(requests.some(request => /playground-module-2\./.test(request.path))).toBe(false);

    await replaceActiveFile(
      `${IMPORTS}import { compressToBase64 } from 'lz-string';\n` +
        `export default () => <Button data-value={compressToBase64('isolated')}>Lazy isolated</Button>;`,
    );
    await expect(previewButton('Lazy isolated')).toHaveAttribute('data-value', /\S+/);
    expect(requests.some(request => /playground-module-2\./.test(request.path))).toBe(true);
    expect(requests.length).toBeGreaterThan(1);
    expect(requests.every(request => request.fromShell && request.type === 'fetch')).toBe(true);
    await expect(page.locator('iframe')).toHaveAttribute('sandbox', 'allow-scripts');
    expect(pageErrors).toEqual([]);
  });

  test('preserves native loading for Storybook entries sharing the runtime and vendor chunks', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    const manifest: { scripts: string[] } = await (await page.request.get('/playground/runtime/manifest.json')).json();
    const sharedRuntime = manifest.scripts.find(file => file.startsWith('runtime~playground-runtime.'));
    expect(sharedRuntime).toBeDefined();
    await page.goto('/storybook-fixture.html?coep=require-corp');

    await expect(page.locator(`script[src="${sharedRuntime}"]`)).toHaveCount(1);
    const button = page.getByRole('button', { name: /^React / });
    await expect(button).toBeVisible();
    await button.click();
    await expect(page.getByRole('button', { name: 'Native runtime ready' })).toHaveAttribute('data-value', /\S+/);
    expect(pageErrors).toEqual([]);
  });

  test('reports failed runtime fetches and recovers after restarting the isolated preview', async ({ page }) => {
    const { previewButton, errorAlert } = setupPage(page);
    const manifest: { scripts: string[] } = await (await page.request.get('/playground/runtime/manifest.json')).json();
    let fail = true;
    await page.route(`**/${manifest.scripts[0]}`, async route => {
      if (fail) {
        await route.fulfill({ status: 503, contentType: 'text/plain', body: 'Runtime temporarily unavailable' });
      } else {
        await route.continue();
      }
    });

    await page.goto(
      `${PLAYGROUND_URL}?coep=require-corp${createPlaygroundHash({
        code: `${IMPORTS}export default () => <Button>Recovered runtime</Button>;`,
      })}`,
    );
    await expect(errorAlert('503')).toBeVisible();
    await expect(previewButton('Recovered runtime')).toHaveCount(0);

    fail = false;
    await page.getByRole('button', { name: 'Restart preview' }).click();
    await expect(previewButton('Recovered runtime')).toBeVisible();
    await expect(errorAlert('503')).toHaveCount(0);
    await expect(page.locator('iframe')).toHaveAttribute('sandbox', 'allow-scripts');
  });

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
      `${PLAYGROUND_URL}${createPlaygroundHash({
        // `satisfies` needs TypeScript 4.9+, so this also guards the TypeScript version bundled with Monaco
        code: `${IMPORTS}export default () => <Button>{'Start' satisfies string}</Button>;`,
      })}`,
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
    const manifest: { typings: string; moduleTypings: Record<string, string[]> } = await (
      await page.request.get('/playground/runtime/manifest.json')
    ).json();
    const requestedTypings = new Set<string>();
    page.on('request', request => {
      const { pathname } = new URL(request.url());
      if (pathname.includes('/typings.')) {
        requestedTypings.add(pathname.slice(1));
      }
    });
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
    // Declarations are split per configured module and fetched once the code imports that module.
    await expect(page.getByText('Ready', { exact: true })).toBeVisible();
    expect(Array.from(requestedTypings).sort()).toEqual(
      [manifest.typings, ...manifest.moduleTypings['@fluentui/react-components']].sort(),
    );

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
    expect(manifest.moduleTypings['lz-string'].every(url => requestedTypings.has(url))).toBe(true);
    expect(requestedTypings.has(manifest.moduleTypings['@fluentui/react-icons'].at(-1)!)).toBe(false);

    expect(pageErrors).toEqual([]);
  });

  test('forwards console output and blocks network access from the sandbox', async ({ page }) => {
    const { pageErrors, previewButton, replaceActiveFile } = setupPage(page);
    const externalRequests: string[] = [];
    page.on('request', request => {
      if (new URL(request.url()).hostname === 'example.org') {
        externalRequests.push(request.url());
      }
    });

    await page.goto(
      `${PLAYGROUND_URL}${createPlaygroundHash({
        code: `${IMPORTS}console.log('hello', { answer: 42 });
fetch('https://example.org/collect').then(
  () => console.log('network allowed'),
  error => console.error('network blocked', error.name),
);
export default () => <Button>Logged</Button>;`,
      })}`,
    );
    await expect(previewButton('Logged')).toBeVisible();

    const consoleToggle = page.getByRole('button', { name: /^Console/ });
    await expect(consoleToggle).toContainText('1 error');
    await consoleToggle.click();
    const output = page.getByRole('log', { name: 'Console output' });
    await expect(output).toContainText('hello { answer: 42 }');
    await expect(output).toContainText('network blocked TypeError');
    await expect(output).not.toContainText('network allowed');
    expect(externalRequests).toEqual([]);

    // A remount starts a fresh log.
    await replaceActiveFile(`${IMPORTS}console.info('second version');\nexport default () => <Button>Second</Button>;`);
    await expect(previewButton('Second')).toBeVisible();
    await expect(output).toContainText('second version');
    await expect(output).not.toContainText('hello');

    expect(pageErrors).toEqual([]);
  });

  test('reports type errors without blocking, manages CSS modules and emulates viewports', async ({ page }) => {
    const { pageErrors, previewButton, previewFrame, replaceActiveFile, errorAlert } = setupPage(page);

    await page.goto(
      `${PLAYGROUND_URL}${createPlaygroundHash({ code: `${IMPORTS}export default () => <Button>Start</Button>;` })}`,
    );
    await expect(previewButton('Start')).toBeVisible();

    await replaceActiveFile(`${IMPORTS}const label: number = 'Typed';\nexport default () => <Button>{label}</Button>;`);
    await expect(previewButton('Typed')).toBeVisible();
    await expect(page.getByRole('button', { name: '1 type error' })).toBeVisible();

    await page.getByRole('button', { name: 'Add CSS module' }).click();
    const nameInput = page.getByRole('textbox', { name: 'CSS module name' });
    await expect(nameInput).toHaveValue('styles.module.css');
    await nameInput.fill('card');
    await expect(page.getByText("import styles from './card.module.css'")).toBeVisible();
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.getByRole('tab', { name: 'card.module.css', selected: true })).toBeVisible();
    await replaceActiveFile('.root { border-radius: 7px; }');

    await page.getByRole('tab', { name: 'example.tsx', exact: true }).click();
    await replaceActiveFile(
      `${IMPORTS}import styles from './card.module.css';\nexport default () => <Button className={styles.root}>Styled</Button>;`,
    );
    await expect(previewButton('Styled')).toBeVisible();
    await expect(page.getByRole('button', { name: /type error/ })).toHaveCount(0);
    await expect
      .poll(() => previewFrame().evaluate(() => getComputedStyle(document.querySelector('button')!).borderRadius))
      .toBe('7px');

    await page.getByRole('tab', { name: 'card.module.css', exact: true }).click();
    await page.getByRole('button', { name: 'Remove card.module.css' }).click();
    await expect(page.getByRole('tab', { name: 'card.module.css' })).toHaveCount(0);
    await expect(errorAlert('card.module.css')).toBeVisible();
    await page.getByRole('button', { name: 'Undo' }).click();
    await expect(page.getByRole('tab', { name: 'card.module.css', selected: true })).toBeVisible();
    await expect(previewButton('Styled')).toBeVisible();
    await expect(errorAlert('card.module.css')).toHaveCount(0);

    await page.getByRole('combobox', { name: 'Preview width' }).click();
    await page.getByRole('option', { name: 'Mobile · 375' }).click();
    await expect.poll(() => previewFrame().evaluate(() => window.innerWidth)).toBe(375);
    await expect(previewButton('Styled')).toBeVisible();

    expect(pageErrors).toEqual([]);
  });

  test('names the example, jumps to compile errors, saves with Ctrl+S and maximizes panes', async ({ page }) => {
    const { pageErrors, previewButton, replaceActiveFile, errorAlert } = setupPage(page);

    await page.goto(
      `${PLAYGROUND_URL}${createPlaygroundHash({
        code: `${IMPORTS}export default () => <Button>Titled</Button>;`,
        title: 'Button: Default',
      })}`,
    );
    await expect(previewButton('Titled')).toBeVisible();
    await expect(page.getByRole('banner').getByText('Button: Default')).toBeVisible();
    await expect(page).toHaveTitle(/^Button: Default · /);

    await replaceActiveFile(`${IMPORTS}\nexport default () => <Button>{</Button>;`);
    await expect(errorAlert('Compilation error')).toBeVisible();
    const location = errorAlert('Compilation error').getByRole('button', { name: /^example\.tsx:4:\d+$/ });
    await expect(location).toBeVisible();
    await page.keyboard.press('Control+Home');
    await location.click();
    await expect(page.locator('.monaco-editor .current-line').first()).toBeVisible();
    await expect
      .poll(() => page.locator('.monaco-editor .line-numbers.active-line-number').first().textContent())
      .toBe('4');

    await replaceActiveFile(`${IMPORTS}export default () => <Button   >Saved</Button>;`);
    await expect(previewButton('Saved')).toBeVisible();
    await page.keyboard.press('Control+S');
    // The toaster also mirrors the text into a live region, so match the toast itself.
    await expect(page.locator('.fui-ToastTitle', { hasText: 'Saved to the link' })).toHaveCount(1);
    await expect
      .poll(async () => decodePlaygroundStateFromHash(new URL(page.url()).hash))
      .toEqual({
        code: `${IMPORTS}export default () => <Button>Saved</Button>;\n`,
        cssModules: [],
        title: 'Button: Default',
      });

    await page.getByRole('button', { name: 'Maximize editor' }).click();
    await expect(page.getByRole('region', { name: 'Preview' })).toBeHidden();
    await page.getByRole('button', { name: 'Show preview' }).click();
    await page.getByRole('button', { name: 'Maximize preview' }).click();
    await expect(page.getByRole('region', { name: 'Code editor' })).toBeHidden();
    await expect(previewButton('Saved')).toBeVisible();
    await page.getByRole('button', { name: 'Show editor' }).click();
    await expect(page.getByRole('region', { name: 'Code editor' })).toBeVisible();

    expect(pageErrors).toEqual([]);
  });
});
