import {
  LEGACY_STYLE_ID as STYLE_ID,
  LEGACY_VERTICAL_SLIDER_RULE,
  ensureLegacyVerticalSliderInput,
  installLegacyVerticalSliderRule,
  supportsVerticalRangeInput,
} from './legacyVerticalSliderAppearance';

function mockProbeRect(
  size: { height: number; width: number },
  elementPrototype: HTMLElement = HTMLElement.prototype,
): jest.SpyInstance {
  jest.spyOn(elementPrototype, 'offsetWidth', 'get').mockReturnValue(size.width);
  return jest.spyOn(elementPrototype, 'offsetHeight', 'get').mockReturnValue(size.height);
}

function createDocument(): Document {
  return document.implementation.createHTMLDocument('probe');
}

function createInput(targetDocument: Document, parent: ParentNode = targetDocument.body): HTMLInputElement {
  const input = targetDocument.createElement('input');
  input.className = 'fui-Slider__input';
  input.setAttribute('orient', 'vertical');
  parent.append(input);
  return input;
}

describe('legacyVerticalSliderAppearance', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('does nothing without an input, so server rendering is unaffected', () => {
    expect(ensureLegacyVerticalSliderInput(undefined)).toBeUndefined();
    expect(ensureLegacyVerticalSliderInput(null)).toBeUndefined();
  });

  it('reads vertical range support from the probe layout', () => {
    mockProbeRect({ height: 129, width: 16 });
    expect(supportsVerticalRangeInput(createDocument())).toBe(true);

    mockProbeRect({ height: 16, width: 129 });
    expect(supportsVerticalRangeInput(createDocument())).toBe(false);
  });

  it('does not add the legacy value when the engine orients range inputs', () => {
    const targetDocument = createDocument();
    mockProbeRect({ height: 129, width: 16 });

    ensureLegacyVerticalSliderInput(createInput(targetDocument));

    expect(targetDocument.getElementById(STYLE_ID)).toBeNull();
  });

  it('adds the legacy value once per document when the engine cannot orient range inputs', () => {
    const targetDocument = createDocument();
    const spy = mockProbeRect({ height: 16, width: 129 });

    ensureLegacyVerticalSliderInput(createInput(targetDocument));
    ensureLegacyVerticalSliderInput(createInput(targetDocument));

    const styles = targetDocument.querySelectorAll(`#${STYLE_ID}`);
    expect(styles).toHaveLength(1);
    expect(styles[0].textContent).toBe(LEGACY_VERTICAL_SLIDER_RULE);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('only targets vertical inputs, because the legacy value also turns a horizontal input vertical', () => {
    const targetDocument = createDocument();
    const vertical = createInput(targetDocument);
    const horizontal = targetDocument.createElement('input');
    horizontal.className = 'fui-Slider__input';
    targetDocument.body.append(horizontal);

    const selector = LEGACY_VERTICAL_SLIDER_RULE.slice(0, LEGACY_VERTICAL_SLIDER_RULE.indexOf('{'));
    expect(vertical.matches(selector)).toBe(true);
    expect(horizontal.matches(selector)).toBe(false);
  });

  it('applies the style element attributes, so a CSP nonce reaches the injected style', () => {
    const targetDocument = createDocument();
    mockProbeRect({ height: 16, width: 129 });

    ensureLegacyVerticalSliderInput(createInput(targetDocument), { nonce: 'abc123', 'data-test': 'x' });

    const style = targetDocument.getElementById(STYLE_ID);
    expect(style?.getAttribute('nonce')).toBe('abc123');
    expect(style?.getAttribute('data-test')).toBe('x');
  });

  it('measures the probe inside its own shadow root, out of reach of application selectors', () => {
    const targetDocument = createDocument();
    const appended = jest.spyOn(targetDocument.body, 'append');
    const setAttribute = jest.spyOn(Element.prototype, 'setAttribute');
    mockProbeRect({ height: 129, width: 16 });

    supportsVerticalRangeInput(targetDocument);

    const host = appended.mock.calls[0][0] as HTMLElement;
    const probe = host.shadowRoot?.querySelector('input');
    expect(probe).toBeTruthy();
    expect(probe?.style.getPropertyValue('all')).toBe('initial');
    expect(host.style.getPropertyValue('all')).toBe('initial');
    expect(host.style.getPropertyPriority('all')).toBe('important');
    // Styles go through CSSOM, never the `style` attribute, which a nonce-only `style-src` CSP blocks.
    expect(setAttribute.mock.calls.filter(([name]) => name === 'style')).toHaveLength(0);
    expect(targetDocument.body.contains(host)).toBe(false);
  });

  describe('styling root', () => {
    it('adds the rule to the shadow root a Slider renders in, not to the document head', () => {
      const targetDocument = createDocument();
      const root = targetDocument.body.appendChild(targetDocument.createElement('div')).attachShadow({ mode: 'open' });
      mockProbeRect({ height: 16, width: 129 });

      ensureLegacyVerticalSliderInput(createInput(targetDocument, root));

      expect(targetDocument.getElementById(STYLE_ID)).toBeNull();
      const inRoot = (root.adoptedStyleSheets?.length ?? 0) > 0 || root.getElementById(STYLE_ID) !== null;
      expect(inRoot).toBe(true);
    });

    it('installs once per root, separately for the document and each shadow root', () => {
      const targetDocument = createDocument();
      const first = targetDocument.body.appendChild(targetDocument.createElement('div')).attachShadow({ mode: 'open' });
      const second = targetDocument.body
        .appendChild(targetDocument.createElement('div'))
        .attachShadow({ mode: 'open' });
      const countIn = (root: ShadowRoot) =>
        (root.adoptedStyleSheets?.length ?? 0) + root.querySelectorAll(`#${STYLE_ID}`).length;

      installLegacyVerticalSliderRule(createInput(targetDocument, first));
      installLegacyVerticalSliderRule(createInput(targetDocument, first));
      installLegacyVerticalSliderRule(createInput(targetDocument, second));
      installLegacyVerticalSliderRule(createInput(targetDocument));
      installLegacyVerticalSliderRule(createInput(targetDocument));

      expect(countIn(first)).toBe(1);
      expect(countIn(second)).toBe(1);
      expect(targetDocument.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(1);
    });

    it('restores the rule after the style element is removed from the document', () => {
      const targetDocument = createDocument();
      const input = createInput(targetDocument);

      installLegacyVerticalSliderRule(input);
      targetDocument.getElementById(STYLE_ID)?.remove();
      installLegacyVerticalSliderRule(input);

      expect(targetDocument.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(1);
    });

    it('does not add the rule again when another copy of this module already installed it', () => {
      const targetDocument = createDocument();
      jest.isolateModules(() => {
        const otherCopy =
          require('./legacyVerticalSliderAppearance') as typeof import('./legacyVerticalSliderAppearance');
        otherCopy.installLegacyVerticalSliderRule(createInput(targetDocument));
      });

      installLegacyVerticalSliderRule(createInput(targetDocument));

      expect(targetDocument.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(1);
    });

    it('does not add a second style element to a shadow root that already carries one', () => {
      const targetDocument = createDocument();
      const root = targetDocument.body.appendChild(targetDocument.createElement('div')).attachShadow({ mode: 'open' });
      const existing = targetDocument.createElement('style');
      existing.id = STYLE_ID;
      root.append(existing);

      installLegacyVerticalSliderRule(createInput(targetDocument, root));

      expect(root.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(1);
      expect(root.adoptedStyleSheets?.length ?? 0).toBe(0);
    });

    it('skips a document without a head and still installs once it has one', () => {
      const targetDocument = createDocument();
      const head = targetDocument.head;
      head.remove();
      const input = createInput(targetDocument);

      expect(() => installLegacyVerticalSliderRule(input)).not.toThrow();
      expect(targetDocument.getElementById(STYLE_ID)).toBeNull();

      targetDocument.documentElement.prepend(head);
      installLegacyVerticalSliderRule(input);
      expect(targetDocument.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(1);
    });

    it('falls back to the document when the rendered input is not available', () => {
      const targetDocument = createDocument();
      mockProbeRect({ height: 16, width: 129 });

      ensureLegacyVerticalSliderInput(targetDocument);

      expect(targetDocument.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(1);
    });

    it.each([
      [true, 1],
      [false, 0],
    ])('installs only where the engine parses the legacy value (parses: %s)', (parses, expected) => {
      // A Document needs a window for `CSS.supports`, so this case uses an iframe document.
      const frame = document.createElement('iframe');
      document.body.append(frame);
      try {
        const supports = jest.fn(() => parses);
        Object.defineProperty(frame.contentWindow!, 'CSS', { configurable: true, value: { supports } });
        const frameDocument = frame.contentDocument!;

        installLegacyVerticalSliderRule(createInput(frameDocument));
        installLegacyVerticalSliderRule(createInput(frameDocument));
        installLegacyVerticalSliderRule(createInput(frameDocument));

        // Chromium logs the deprecation for this query too, so it is asked once per window, not once per mount.
        expect(supports).toHaveBeenCalledTimes(1);
        expect(supports).toHaveBeenCalledWith('-webkit-appearance', 'slider-vertical');
        expect(frameDocument.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(expected);
      } finally {
        frame.remove();
      }
    });
  });

  describe('inconclusive probe', () => {
    type Callback = () => void;
    let observers: { callback: Callback; disconnect: jest.Mock; target?: Element }[];
    let frame: HTMLIFrameElement;

    // Each case gets its own document, because the probe result is cached per document.
    function createFrameDocument(): Document {
      frame = document.createElement('iframe');
      document.body.append(frame);
      const view = frame.contentWindow!;
      Object.defineProperty(view, 'ResizeObserver', {
        configurable: true,
        writable: true,
        value: class {
          private entry: (typeof observers)[number];
          constructor(callback: Callback) {
            this.entry = { callback, disconnect: jest.fn() };
            observers.push(this.entry);
          }
          public observe(target: Element) {
            this.entry.target = target;
          }
          public disconnect() {
            this.entry.disconnect();
          }
        },
      });
      return frame.contentDocument!;
    }

    beforeEach(() => {
      observers = [];
    });

    afterEach(() => {
      frame.remove();
    });

    it('installs nothing on a guess and retries once the input is laid out', () => {
      const frameDocument = createFrameDocument();
      const input = createInput(frameDocument);
      const framePrototype = (frame.contentWindow as Window & typeof globalThis).HTMLElement.prototype;
      mockProbeRect({ height: 0, width: 0 }, framePrototype);

      const cleanup = ensureLegacyVerticalSliderInput(input);

      expect(frameDocument.getElementById(STYLE_ID)).toBeNull();
      expect(observers).toHaveLength(1);
      expect(observers[0].target).toBe(input);
      expect(typeof cleanup).toBe('function');

      mockProbeRect({ height: 16, width: 129 }, framePrototype);
      observers[0].callback();

      expect(frameDocument.getElementById(STYLE_ID)).not.toBeNull();
      expect(observers[0].disconnect).toHaveBeenCalled();
    });

    it('stops watching when the Slider unmounts before it is laid out', () => {
      const input = createInput(createFrameDocument());
      mockProbeRect({ height: 0, width: 0 }, (frame.contentWindow as Window & typeof globalThis).HTMLElement.prototype);

      const cleanup = ensureLegacyVerticalSliderInput(input);
      cleanup?.();

      expect(observers).toHaveLength(1);
      expect(observers[0].disconnect).toHaveBeenCalled();
    });
  });
});
