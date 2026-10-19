import { createRuntimeScriptLoader, loadRuntimeManifest, resolveManifestPath } from './runtime';
import type { ResolvedPlaygroundRuntimeManifest } from './runtime';
import type { PlaygroundRuntimeManifest } from '../setup';

const PAGE = 'https://example.com/storybook/playground/app/playground.html?manifest=x#code=abc';
const FALLBACK = '../runtime/manifest.json';
const rawManifest: PlaygroundRuntimeManifest = {
  allowedModules: ['react'],
  buildId: 'test',
  scripts: ['runtime.js'],
  allowedScriptFiles: ['runtime.js', 'chunks/lazy.mjs'],
  styles: ['runtime.css'],
  typings: 'playground/runtime/typings.json',
  moduleTypings: { react: ['playground/runtime/typings.react.json'] },
};
const manifestResponse = {
  ok: true,
  status: 200,
  statusText: 'OK',
  headers: { get: () => 'application/json; charset=utf-8' },
  json: async () => rawManifest,
};

describe('resolveManifestPath', () => {
  it('uses the fallback without an override', () => {
    expect(resolveManifestPath(null, PAGE, FALLBACK)).toBe(FALLBACK);
    expect(resolveManifestPath('', PAGE, FALLBACK)).toBe(FALLBACK);
  });

  it('accepts only the selected build manifest when the shell is mounted alongside the runtime', () => {
    expect(resolveManifestPath('/storybook/playground/runtime/manifest.json', PAGE, FALLBACK)).toBe(
      'https://example.com/storybook/playground/runtime/manifest.json',
    );
    expect(resolveManifestPath(FALLBACK, PAGE, FALLBACK)).toBe(
      'https://example.com/storybook/playground/runtime/manifest.json',
    );
  });

  it('lets a standalone shell explicitly select a same-origin build at the standard manifest location', () => {
    expect(
      resolveManifestPath(
        '/deployments/private/playground/runtime/manifest.json',
        'https://example.com/standalone/playground.html',
        FALLBACK,
      ),
    ).toBe('https://example.com/deployments/private/playground/runtime/manifest.json');
  });

  it.each([
    '/other/playground/runtime/manifest.json',
    '/storybook/private.json',
    '../../next/manifest.json',
    '/storybook/playground/app/../runtime/manifest.json',
    '/storybook/playground/%2e%2e/playground/runtime/manifest.json',
    '/storybook%2fplayground/runtime/manifest.json',
    '/storybook/%252e%252e/playground/runtime/manifest.json',
    'https://attacker.example/playground/runtime/manifest.json',
    '//attacker.example/playground/runtime/manifest.json',
    'https://user:password@example.com/storybook/playground/runtime/manifest.json',
    'data:application/json,{}',
    '/storybook/playground/runtime/manifest.json?private=1',
    '/storybook/playground/runtime/manifest.json#private',
    '/storybook\\playground\\runtime\\manifest.json',
  ])('reports invalid overrides instead of silently selecting another build: %s', override => {
    expect(() => resolveManifestPath(override, PAGE, FALLBACK)).toThrow();
  });
});

describe('loadRuntimeManifest', () => {
  it('resolves all assets within a valid nested deployment and prevents manifest redirects', async () => {
    const fetch = jest.fn().mockResolvedValue({
      ...manifestResponse,
      json: async () => ({
        ...rawManifest,
        inlineStyles: [{ href: 'chunks/private.css', cssText: '@font-face { src: url(data:font/woff2;base64,AA==) }' }],
      }),
    });
    const page = 'https://example.com/deployments/nested/storybook/playground/app/playground.html';
    const result = await loadRuntimeManifest({ fetch, location: { href: page } }, FALLBACK);

    expect(result.baseUrl).toBe('https://example.com/deployments/nested/storybook/');
    expect(result.scripts).toEqual([`${result.baseUrl}runtime.js`]);
    expect(result.allowedScriptFiles).toEqual([`${result.baseUrl}runtime.js`, `${result.baseUrl}chunks/lazy.mjs`]);
    expect(result.styles).toEqual([`${result.baseUrl}runtime.css`]);
    expect(result.inlineStyles?.[0].href).toBe(`${result.baseUrl}chunks/private.css`);
    expect(result.typings).toBe(`${result.baseUrl}playground/runtime/typings.json`);
    expect(result.moduleTypings?.react).toEqual([`${result.baseUrl}playground/runtime/typings.react.json`]);
    expect(fetch).toHaveBeenCalledWith(new URL(`${result.baseUrl}playground/runtime/manifest.json`), {
      mode: 'same-origin',
      credentials: 'same-origin',
      redirect: 'error',
    });
  });

  it('keeps legacy manifests without allowedScriptFiles, moduleTypings or inlineStyles valid', async () => {
    const fetch = jest.fn().mockResolvedValue({
      ...manifestResponse,
      json: async () => ({
        ...rawManifest,
        allowedScriptFiles: undefined,
        moduleTypings: undefined,
      }),
    });
    const result = await loadRuntimeManifest({ fetch, location: { href: PAGE } }, FALLBACK);

    expect(result.allowedScriptFiles).toBeUndefined();
    expect(result.moduleTypings).toBeUndefined();
    expect(result.inlineStyles).toBeUndefined();
    expect(result.scripts).toEqual(['https://example.com/storybook/runtime.js']);
  });

  it('validates the location even when called without resolveManifestPath', async () => {
    const fetch = jest.fn();
    await expect(
      loadRuntimeManifest({ fetch, location: { href: PAGE } }, '/other/playground/runtime/manifest.json'),
    ).rejects.toThrow('selected build');
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([
    null,
    [],
    'manifest',
    {},
    { ...rawManifest, scripts: [] },
    { ...rawManifest, scripts: 'runtime.js' },
    { ...rawManifest, scripts: [123] },
    { ...rawManifest, allowedScriptFiles: [] },
    { ...rawManifest, allowedScriptFiles: {} },
    { ...rawManifest, styles: null },
    { ...rawManifest, typings: null },
    { ...rawManifest, buildId: '' },
    { ...rawManifest, allowedModules: [null] },
    { ...rawManifest, moduleTypings: { react: 'typings.json' } },
    { ...rawManifest, moduleTypings: [] },
    { ...rawManifest, inlineStyles: [{ href: 'runtime.css', cssText: 123 }] },
    { ...rawManifest, inlineStyles: {} },
  ])('rejects malformed manifest data: %p', invalidManifest => {
    const fetch = jest.fn().mockResolvedValue({ ...manifestResponse, json: async () => invalidManifest });
    return expect(loadRuntimeManifest({ fetch, location: { href: PAGE } }, FALLBACK)).rejects.toThrow('invalid shape');
  });

  it.each([
    '../private.js',
    '/other/runtime.js',
    '/storybook-other/runtime.js',
    'https://example.com/private.js',
    'https://cdn.example.net/runtime.js',
    'chunks/../../private.js',
    'chunks/../runtime.js',
    '%2e%2e/private.js',
    '..%2fprivate.js',
    '%252e%252e/private.js',
    'runtime%2ejs',
    '%72untime.js',
    'runtime.js?private=1',
    'runtime.js#private',
    'runtime.js%3fprivate=1',
    '..\\private.js',
    'runtime.json',
    'data:text/javascript,alert(1)',
  ])('rejects out-of-build or noncanonical script paths even when manifest-listed: %s', script => {
    const fetch = jest.fn().mockResolvedValue({
      ...manifestResponse,
      json: async () => ({ ...rawManifest, scripts: [script], allowedScriptFiles: [script] }),
    });
    return expect(loadRuntimeManifest({ fetch, location: { href: PAGE } }, FALLBACK)).rejects.toThrow();
  });

  it.each([
    { ...rawManifest, styles: ['/private.css'] },
    { ...rawManifest, allowedScriptFiles: [...rawManifest.scripts, '../lazy.js'] },
    { ...rawManifest, typings: '../private.json' },
    { ...rawManifest, typings: 'private.json' },
    { ...rawManifest, moduleTypings: { react: ['/other/typings.json'] } },
    { ...rawManifest, inlineStyles: [{ href: '../private.css', cssText: '' }] },
  ])('also constrains lazy scripts, styles and declarations to the build: %p', invalidManifest => {
    const fetch = jest.fn().mockResolvedValue({ ...manifestResponse, json: async () => invalidManifest });
    return expect(loadRuntimeManifest({ fetch, location: { href: PAGE } }, FALLBACK)).rejects.toThrow();
  });

  it('reports HTTP, content-type and JSON parse failures', async () => {
    const fetch = jest
      .fn()
      .mockResolvedValueOnce({ ...manifestResponse, ok: false, status: 401, statusText: 'Unauthorized' })
      .mockResolvedValueOnce({ ...manifestResponse, headers: { get: () => 'text/html' } })
      .mockResolvedValueOnce({
        ...manifestResponse,
        json: async () => {
          throw new SyntaxError('Invalid JSON');
        },
      });
    const targetWindow = { fetch, location: { href: PAGE } };
    await expect(loadRuntimeManifest(targetWindow, FALLBACK)).rejects.toThrow('401 Unauthorized');
    await expect(loadRuntimeManifest(targetWindow, FALLBACK)).rejects.toThrow('application/json');
    await expect(loadRuntimeManifest(targetWindow, FALLBACK)).rejects.toThrow('Invalid JSON');
  });
});

describe('runtime script loading', () => {
  const runtimeUrl = 'https://example.com/storybook/runtime.js';
  const lazyUrl = 'https://example.com/storybook/lazy.js';
  const manifest: ResolvedPlaygroundRuntimeManifest = {
    allowedModules: [],
    baseUrl: 'https://example.com/storybook/',
    buildId: 'test',
    scripts: [runtimeUrl],
    allowedScriptFiles: [runtimeUrl, lazyUrl],
    styles: [],
    typings: 'https://example.com/storybook/playground/runtime/typings.json',
  };
  const scriptSource = 'throw new Error("This must not execute in the shell");';
  const response = {
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: { get: () => 'text/javascript' },
    text: async () => scriptSource,
  };

  it('fetches and caches approved script text without evaluating it or following redirects', async () => {
    const fetch = jest.fn().mockResolvedValue(response);
    const controller = new AbortController();
    const loadScript = createRuntimeScriptLoader(
      { fetch, location: { origin: 'https://example.com' } },
      manifest,
      controller.signal,
    );

    await expect(Promise.all([loadScript(runtimeUrl), loadScript(runtimeUrl)])).resolves.toEqual([
      scriptSource,
      scriptSource,
    ]);
    await expect(loadScript(lazyUrl)).resolves.toBe(scriptSource);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(runtimeUrl, {
      mode: 'same-origin',
      credentials: 'same-origin',
      redirect: 'error',
      signal: controller.signal,
    });
  });

  it.each([
    'https://example.com/private',
    `${lazyUrl}?private=1`,
    'https://cdn.example.net/runtime.js',
    'data:text/javascript,alert(1)',
    '../runtime.js',
  ])('rejects non-manifest and cross-origin requests without fetching: %s', async url => {
    const fetch = jest.fn();
    const loadScript = createRuntimeScriptLoader({ fetch, location: { origin: 'https://example.com' } }, manifest);

    await expect(loadScript(url)).rejects.toThrow('not an allowed build asset');
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([
    'https://example.com/private.js',
    'https://example.com/storybook-other/private.js',
    'https://example.com/storybook/../private.js',
    'https://example.com/storybook/%2e%2e/private.js',
    'https://example.com/storybook/%252e%252e/private.js',
    'https://example.com/storybook/chunks%2fprivate.js',
    'https://example.com/storybook/%72untime.js',
    'https://example.com/storybook/private.json',
    'https://example.com/storybook/runtime.js?private=1',
    'https://cdn.example.net/runtime.js',
  ])('does not let a modified allowlist authorize a non-build request: %s', url => {
    const fetch = jest.fn();
    const loadScript = createRuntimeScriptLoader(
      { fetch, location: { origin: 'https://example.com' } },
      { ...manifest, allowedScriptFiles: [...manifest.allowedScriptFiles!, url] },
    );
    return expect(loadScript(url))
      .rejects.toThrow()
      .then(() => expect(fetch).not.toHaveBeenCalled());
  });

  it('reports HTTP failures and permits retrying a failed request', async () => {
    const fetch = jest
      .fn()
      .mockResolvedValueOnce({ ...response, ok: false, status: 503, statusText: 'Service Unavailable' })
      .mockResolvedValueOnce(response);
    const loadScript = createRuntimeScriptLoader({ fetch, location: { origin: 'https://example.com' } }, manifest);

    await expect(loadScript(runtimeUrl)).rejects.toThrow('503 Service Unavailable');
    await expect(loadScript(runtimeUrl)).resolves.toBe(scriptSource);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it.each([
    'text/javascript',
    'text/javascript; charset=utf-8',
    'Application/JavaScript; charset=UTF-8',
    'application/x-javascript',
    'text/ecmascript',
    'application/ecmascript',
  ])('accepts supported JavaScript MIME types and charset parameters: %s', contentType => {
    const fetch = jest.fn().mockResolvedValue({ ...response, headers: { get: () => contentType } });
    const loadScript = createRuntimeScriptLoader({ fetch, location: { origin: 'https://example.com' } }, manifest);
    return expect(loadScript(runtimeUrl)).resolves.toBe(scriptSource);
  });

  it.each(['text/html; charset=utf-8', 'application/json', 'text/plain', 'application/octet-stream', '', null])(
    'rejects non-JavaScript and missing MIME types: %s',
    contentType => {
      const fetch = jest.fn().mockResolvedValue({ ...response, headers: { get: () => contentType } });
      const loadScript = createRuntimeScriptLoader({ fetch, location: { origin: 'https://example.com' } }, manifest);
      return expect(loadScript(runtimeUrl)).rejects.toThrow('instead of JavaScript');
    },
  );

  it('surfaces a redirect refusal through the same error flow', async () => {
    const fetch = jest.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    const loadScript = createRuntimeScriptLoader({ fetch, location: { origin: 'https://example.com' } }, manifest);
    await expect(loadScript(runtimeUrl)).rejects.toThrow('Failed to fetch');
    expect(fetch).toHaveBeenCalledWith(runtimeUrl, expect.objectContaining({ redirect: 'error' }));
  });
});
