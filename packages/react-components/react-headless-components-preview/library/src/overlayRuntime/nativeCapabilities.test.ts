import {
  setOverlayRuntimeOverrideForTests,
  supportsNativeOverlayRuntime,
} from './nativeCapabilities';

const createTargetDocument = (unsupportedFeature?: string): Document => {
  class HTMLElementMock {
    public popover = '';

    public showPopover() {
      return;
    }

    public hidePopover() {
      return;
    }

    public setAttribute(name: string, value: string) {
      if (name === 'popover') {
        this.popover = value;
      }
    }
  }

  class HTMLDialogElementMock extends HTMLElementMock {
    public showModal() {
      return;
    }
  }

  const css = {
    supports: (property: string, value?: string) => {
      const feature = value === undefined ? property : `${property}: ${value}`;
      return feature !== unsupportedFeature;
    },
  };

  const targetWindow = {
    CSS: css,
    HTMLElement: HTMLElementMock,
    HTMLDialogElement: HTMLDialogElementMock,
  };

  return {
    defaultView: targetWindow,
    createElement: () => new HTMLElementMock(),
  } as unknown as Document;
};

describe('supportsNativeOverlayRuntime', () => {
  afterEach(() => {
    setOverlayRuntimeOverrideForTests(document, 'auto');
  });

  it('supports an internal native override', () => {
    setOverlayRuntimeOverrideForTests(document, 'native');

    expect(supportsNativeOverlayRuntime(document)).toBe(true);
  });

  it('supports an internal fallback override', () => {
    setOverlayRuntimeOverrideForTests(document, 'fallback');

    expect(supportsNativeOverlayRuntime(document)).toBe(false);
  });

  it('accepts the complete native contract', () => {
    expect(supportsNativeOverlayRuntime(createTargetDocument())).toBe(true);
  });

  it('rejects partial support', () => {
    expect(
      supportsNativeOverlayRuntime(
        createTargetDocument('position-try-fallbacks: flip-block'),
      ),
    ).toBe(false);
  });
});
