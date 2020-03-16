import mergeProviderContexts, { mergePerformanceOptions, mergeRenderers } from 'src/utils/mergeProviderContexts';
import { felaRenderer } from 'src/utils/felaRenderer';

describe('mergeRenderers', () => {
  test(`always uses "next" renderer`, () => {
    const next = jest.fn();
    expect(mergeRenderers(felaRenderer, next as any)).toBe(next);
  });

  test(`always returns pre-created renderer for main document`, () => {
    expect(mergeRenderers(jest.fn() as any, null, document)).toBe(felaRenderer);
  });

  test(`creates a new renderer for a new document and keeps it`, () => {
    const target = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    const renderer = mergeRenderers(jest.fn() as any, null, target);

    expect(renderer).toHaveProperty('renderRule');
    expect(mergeRenderers(jest.fn() as any, null, target)).toBe(renderer);
  });
});

describe('mergePerformanceOptions', () => {
  test(`options from "sources" always override`, () => {
    expect(mergePerformanceOptions({ enableVariablesCaching: true }, {})).toMatchObject({
      enableVariablesCaching: true,
    });
    expect(mergePerformanceOptions({ enableVariablesCaching: true }, undefined)).toMatchObject({
      enableVariablesCaching: true,
    });

    expect(
      mergePerformanceOptions(
        { enableVariablesCaching: true, enableStylesCaching: true },
        { enableStylesCaching: false },
      ),
    ).toMatchObject({});
    expect(
      mergePerformanceOptions(
        { enableVariablesCaching: true, enableStylesCaching: true },
        { enableStylesCaching: undefined },
      ),
    ).toMatchObject({});
  });
});

describe('mergeContexts', () => {
  test(`always returns an object`, () => {
    expect(mergeProviderContexts({}, {})).toMatchObject({});
    expect(mergeProviderContexts(null, null)).toMatchObject({});
    expect(mergeProviderContexts(undefined, undefined)).toMatchObject({});

    expect(mergeProviderContexts(null, undefined)).toMatchObject({});
    expect(mergeProviderContexts(undefined, null)).toMatchObject({});

    expect(mergeProviderContexts({}, undefined)).toMatchObject({});
    expect(mergeProviderContexts(undefined, {})).toMatchObject({});

    expect(mergeProviderContexts({}, null)).toMatchObject({});
    expect(mergeProviderContexts(null, {})).toMatchObject({});
  });

  test('gracefully handles merging a theme in with undefined values', () => {
    const target = {
      theme: {
        siteVariables: { color: 'black' },
        componentVariables: { Button: { color: 'black' } },
        componentStyles: { Button: { root: { color: 'black' } } },
      },
      rtl: true,
      disableAnimations: false,
    };
    const source = {
      theme: undefined,
      rtl: undefined,
      disableAnimations: undefined,
    };
    expect(() => mergeProviderContexts(target, source)).not.toThrow();
  });

  test('gracefully handles merging onto a theme with undefined values', () => {
    const target = {
      theme: undefined,
      rtl: undefined,
      disableAnimations: undefined,
    };
    const source = {
      theme: {
        siteVariables: { color: 'black' },
        componentVariables: { Button: { color: 'black' } },
        componentStyles: { Button: { root: { color: 'black' } } },
      },
      rtl: true,
      disableAnimations: false,
    };
    expect(() => mergeProviderContexts(target, source)).not.toThrow();
  });
});
