import { ProviderContextInput } from '@fluentui/react-bindings';
import type { CreateRenderer } from '@fluentui/react-northstar-styles-renderer';
import { mergeProviderContexts, mergePerformanceOptions, getRenderer } from 'src/utils/mergeProviderContexts';

describe('getRenderer', () => {
  const createRenderer = (target => {
    return { target };
  }) as unknown as CreateRenderer;

  test(`without "target" defaults to a document`, () => {
    // will be "undefined" as we call createRenderer() with "undefined"
    expect(getRenderer(createRenderer)).toHaveProperty('target', undefined);
  });

  test(`with "target" equals a default document will use its renderer`, () => {
    // will be "undefined" as we call createRenderer() with "undefined"
    expect(getRenderer(createRenderer)).toHaveProperty('target', undefined);
  });

  test(`creates a new renderer for a new "target" and keeps it`, () => {
    const target = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);

    expect(getRenderer(createRenderer, target)).toHaveProperty('target', target);
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
  const createRenderer = jest.fn();

  test(`always returns an object`, () => {
    expect(mergeProviderContexts(createRenderer, {}, {})).toMatchObject({});
    expect(mergeProviderContexts(createRenderer, null, null)).toMatchObject({});
    expect(mergeProviderContexts(createRenderer, undefined, undefined)).toMatchObject({});

    expect(mergeProviderContexts(createRenderer, null, undefined)).toMatchObject({});
    expect(mergeProviderContexts(createRenderer, undefined, null)).toMatchObject({});

    expect(mergeProviderContexts(createRenderer, {}, undefined)).toMatchObject({});
    expect(mergeProviderContexts(createRenderer, undefined, {})).toMatchObject({});

    expect(mergeProviderContexts(createRenderer, {}, null)).toMatchObject({});
    expect(mergeProviderContexts(createRenderer, null, {})).toMatchObject({});
  });

  test('gracefully handles merging a theme in with undefined values', () => {
    const target: ProviderContextInput = {
      theme: {
        siteVariables: { color: 'black' },
        componentVariables: { Button: { color: 'black' } },
        componentStyles: { Button: { root: { color: 'black' } } },
      },
      rtl: true,
      disableAnimations: false,
    };
    const source: ProviderContextInput = {
      theme: undefined,
      rtl: undefined,
      disableAnimations: undefined,
    };
    expect(() => mergeProviderContexts(createRenderer, target, source)).not.toThrow();
  });

  test('gracefully handles merging onto a theme with undefined values', () => {
    const target: ProviderContextInput = {
      theme: undefined,
      rtl: undefined,
      disableAnimations: undefined,
    };
    const source: ProviderContextInput = {
      theme: {
        siteVariables: { color: 'black' },
        componentVariables: { Button: { color: 'black' } },
        componentStyles: { Button: { root: { color: 'black' } } },
      },
      rtl: true,
      disableAnimations: false,
    };
    expect(() => mergeProviderContexts(createRenderer, target, source)).not.toThrow();
  });
});
