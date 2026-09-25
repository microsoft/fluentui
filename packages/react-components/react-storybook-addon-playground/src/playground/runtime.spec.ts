import { resolveManifestPath } from './runtime';

const PAGE = 'https://example.com/storybook/playground/app/playground.html?manifest=x#code=abc';
const FALLBACK = '../runtime/manifest.json';

describe('resolveManifestPath', () => {
  it('uses the fallback without an override', () => {
    expect(resolveManifestPath(null, PAGE, FALLBACK)).toBe(FALLBACK);
    expect(resolveManifestPath('', PAGE, FALLBACK)).toBe(FALLBACK);
  });

  it('accepts same-origin overrides', () => {
    expect(resolveManifestPath('/other/runtime/manifest.json', PAGE, FALLBACK)).toBe(
      'https://example.com/other/runtime/manifest.json',
    );
    expect(resolveManifestPath('../../next/manifest.json', PAGE, FALLBACK)).toBe(
      'https://example.com/storybook/next/manifest.json',
    );
  });

  it('rejects cross-origin and non-http overrides', () => {
    expect(resolveManifestPath('https://attacker.example/manifest.json', PAGE, FALLBACK)).toBe(FALLBACK);
    expect(resolveManifestPath('//attacker.example/manifest.json', PAGE, FALLBACK)).toBe(FALLBACK);
    expect(resolveManifestPath('data:application/json,{}', PAGE, FALLBACK)).toBe(FALLBACK);
  });
});
