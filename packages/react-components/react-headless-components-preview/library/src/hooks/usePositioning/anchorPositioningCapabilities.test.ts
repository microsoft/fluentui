import {
  setPositioningRuntimeOverrideForTests,
  supportsNativeAnchorPositioning,
} from './anchorPositioningCapabilities';

const createTargetDocument = (unsupportedFeature?: string): Document => {
  const css = {
    supports: (property: string, value: string) => `${property}: ${value}` !== unsupportedFeature,
  };
  const targetWindow = { CSS: css };

  return {
    defaultView: targetWindow,
  } as unknown as Document;
};

describe('supportsNativeAnchorPositioning', () => {
  afterEach(() => {
    setPositioningRuntimeOverrideForTests(document, 'auto');
  });

  it('supports internal native and fallback overrides', () => {
    setPositioningRuntimeOverrideForTests(document, 'native');
    expect(supportsNativeAnchorPositioning(document)).toBe(true);

    setPositioningRuntimeOverrideForTests(document, 'fallback');
    expect(supportsNativeAnchorPositioning(document)).toBe(false);
  });

  it('accepts the complete native contract', () => {
    expect(supportsNativeAnchorPositioning(createTargetDocument())).toBe(true);
  });

  it.each([
    ['anchor-name', '--fui-positioning-anchor'],
    ['position-anchor', '--fui-positioning-anchor'],
    ['position-area', 'block-end'],
    ['position-try-fallbacks', 'flip-block'],
    ['width', 'anchor-size(width)'],
  ])('rejects partial support without %s', (property, value) => {
    expect(supportsNativeAnchorPositioning(createTargetDocument(`${property}: ${value}`))).toBe(false);
  });
});
